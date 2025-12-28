-- ============================================================================
-- FIX CRITIQUE: Mapper 'email' → 'manual' pour inscriptions manuelles
-- ============================================================================
-- Problème: Supabase met provider='email' pour inscription manuelle
-- La contrainte CHECK n'accepte que: 'manual', 'google', 'apple'
-- Solution: Mapper 'email' → 'manual' dans le trigger
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_phone text;
  normalized_email text;
  detected_auth_method text;
  extracted_first_name text;
  extracted_last_name text;
  full_name_parts text[];
BEGIN
  RAISE NOTICE '[TRIGGER START] User: % (ID: %)', NEW.email, NEW.id;

  -- Normaliser téléphone (peut être NULL pour inscription manuelle sans phone optionnel)
  BEGIN
    normalized_phone := REGEXP_REPLACE(COALESCE(NEW.raw_user_meta_data->>'phone', ''), '[\s\.\-\(\)]', '', 'g');
    IF normalized_phone = '' THEN normalized_phone := NULL; END IF;
  EXCEPTION WHEN OTHERS THEN
    normalized_phone := NULL;
    RAISE WARNING '[TRIGGER] Erreur normalisation téléphone: %', SQLERRM;
  END;

  -- Normaliser email
  BEGIN
    normalized_email := LOWER(TRIM(NEW.email));
  EXCEPTION WHEN OTHERS THEN
    normalized_email := NEW.email;
    RAISE WARNING '[TRIGGER] Erreur normalisation email: %', SQLERRM;
  END;

  -- Détecter OAuth vs Manual
  BEGIN
    IF NEW.raw_app_meta_data IS NOT NULL AND NEW.raw_app_meta_data->>'provider' IS NOT NULL THEN
      detected_auth_method := NEW.raw_app_meta_data->>'provider';

      -- CRITIQUE: Supabase utilise 'email' pour inscription manuelle
      -- Mapper 'email' → 'manual' pour respecter la contrainte CHECK
      IF detected_auth_method = 'email' THEN
        detected_auth_method := 'manual';
      END IF;
    ELSE
      detected_auth_method := 'manual';
    END IF;
  EXCEPTION WHEN OTHERS THEN
    detected_auth_method := 'manual';
    RAISE WARNING '[TRIGGER] Erreur détection auth_method: %', SQLERRM;
  END;

  RAISE NOTICE '[TRIGGER] auth_method: % (raw provider: %)', detected_auth_method, NEW.raw_app_meta_data->>'provider';

  -- Extraire prénom et nom (inscription manuelle = first_name/last_name)
  BEGIN
    -- Essayer d'abord given_name/family_name (OAuth)
    extracted_first_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'given_name'), '');
    extracted_last_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'family_name'), '');

    -- Fallback sur first_name/last_name (inscription manuelle)
    IF extracted_first_name IS NULL THEN
      extracted_first_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'first_name'), '');
    END IF;
    IF extracted_last_name IS NULL THEN
      extracted_last_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'last_name'), '');
    END IF;

    -- Fallback sur full_name (Google parfois)
    IF (extracted_first_name IS NULL OR extracted_last_name IS NULL) AND NEW.raw_user_meta_data->>'full_name' IS NOT NULL THEN
      full_name_parts := string_to_array(TRIM(NEW.raw_user_meta_data->>'full_name'), ' ');
      IF array_length(full_name_parts, 1) >= 2 THEN
        extracted_first_name := COALESCE(extracted_first_name, array_to_string(full_name_parts[1:array_length(full_name_parts, 1)-1], ' '));
        extracted_last_name := COALESCE(extracted_last_name, full_name_parts[array_length(full_name_parts, 1)]);
      ELSIF array_length(full_name_parts, 1) = 1 THEN
        extracted_first_name := COALESCE(extracted_first_name, full_name_parts[1]);
      END IF;
    END IF;

    -- Fallback sur name (Google)
    IF (extracted_first_name IS NULL OR extracted_last_name IS NULL) AND NEW.raw_user_meta_data->>'name' IS NOT NULL THEN
      full_name_parts := string_to_array(TRIM(NEW.raw_user_meta_data->>'name'), ' ');
      IF array_length(full_name_parts, 1) >= 2 THEN
        extracted_first_name := COALESCE(extracted_first_name, array_to_string(full_name_parts[1:array_length(full_name_parts, 1)-1], ' '));
        extracted_last_name := COALESCE(extracted_last_name, full_name_parts[array_length(full_name_parts, 1)]);
      ELSIF array_length(full_name_parts, 1) = 1 THEN
        extracted_first_name := COALESCE(extracted_first_name, full_name_parts[1]);
      END IF;
    END IF;

    -- Valeurs par défaut si toujours NULL
    extracted_first_name := COALESCE(extracted_first_name, '');
    extracted_last_name := COALESCE(extracted_last_name, '');

  EXCEPTION WHEN OTHERS THEN
    extracted_first_name := '';
    extracted_last_name := '';
    RAISE WARNING '[TRIGGER] Erreur extraction nom/prénom: %', SQLERRM;
  END;

  RAISE NOTICE '[TRIGGER] Extracted: first_name="%", last_name="%"', extracted_first_name, extracted_last_name;

  -- Insérer le profil (ne JAMAIS bloquer la transaction)
  BEGIN
    RAISE NOTICE '[TRIGGER] INSERT avec auth_method="%"...', detected_auth_method;

    INSERT INTO public.profiles (
      id,
      email,
      first_name,
      last_name,
      role,
      country,
      phone,
      auth_method,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      normalized_email,
      extracted_first_name,
      extracted_last_name,
      COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
      COALESCE(NEW.raw_user_meta_data->>'country', ''),
      normalized_phone,
      detected_auth_method,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      phone = EXCLUDED.phone,
      auth_method = EXCLUDED.auth_method,
      updated_at = NOW();

    RAISE NOTICE '[TRIGGER] ✓✓✓ INSERT RÉUSSI ✓✓✓';

  EXCEPTION
    WHEN unique_violation THEN
      RAISE WARNING '[TRIGGER] Doublon détecté: %', SQLERRM;
      -- Ne pas bloquer pour les doublons (peut arriver en race condition)

    WHEN check_violation THEN
      RAISE WARNING '[TRIGGER] Violation contrainte CHECK: %', SQLERRM;
      RAISE WARNING '[TRIGGER] Détails: phone=%, auth_method=%', normalized_phone, detected_auth_method;
      -- Ne pas bloquer, juste logger

    WHEN OTHERS THEN
      RAISE WARNING '[TRIGGER] Erreur inattendue INSERT: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
      -- Ne JAMAIS bloquer la transaction auth
  END;

  RAISE NOTICE '[TRIGGER END] Retour NEW';
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION handle_new_user IS 'Trigger création profil. Mappe email→manual. Ultra-robuste, ne bloque JAMAIS. Gère OAuth (Google/Apple) et inscription manuelle.';

-- Rapport
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '✓ FIX CRITIQUE APPLIQUÉ: email → manual';
  RAISE NOTICE '';
  RAISE NOTICE 'Changement clé:';
  RAISE NOTICE '  • Supabase utilise provider="email" pour inscription manuelle';
  RAISE NOTICE '  • Le trigger mappe maintenant "email" → "manual"';
  RAISE NOTICE '  • Respecte la contrainte CHECK (manual, google, apple)';
  RAISE NOTICE '';
  RAISE NOTICE 'Test de validation:';
  RAISE NOTICE '  1. Inscrivez-vous manuellement';
  RAISE NOTICE '  2. Vérifiez que auth_method="manual" dans profiles';
  RAISE NOTICE '  3. Vérifiez les logs: [TRIGGER] auth_method: manual (raw provider: email)';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '';
END $$;
