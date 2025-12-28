-- ============================================================================
-- FIX: Parser full_name quand given_name/family_name absents
-- ============================================================================
-- Problème: Google fournit "name" ou "full_name" mais PAS "given_name"/"family_name"
-- Solution: Parser full_name pour extraire prénom et nom
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
  RAISE NOTICE '[TRIGGER START] User: %', NEW.email;
  RAISE NOTICE '[TRIGGER] raw_app_meta_data: %', NEW.raw_app_meta_data::text;
  RAISE NOTICE '[TRIGGER] raw_user_meta_data: %', NEW.raw_user_meta_data::text;

  -- Normaliser téléphone
  normalized_phone := REGEXP_REPLACE(COALESCE(NEW.raw_user_meta_data->>'phone', ''), '[\s\.\-\(\)]', '', 'g');
  IF normalized_phone = '' THEN normalized_phone := NULL; END IF;

  -- Normaliser email
  normalized_email := LOWER(TRIM(NEW.email));

  -- Détecter OAuth vs Manual
  IF NEW.raw_app_meta_data->>'provider' IS NOT NULL THEN
    detected_auth_method := NEW.raw_app_meta_data->>'provider';
  ELSE
    detected_auth_method := 'manual';
  END IF;
  RAISE NOTICE '[TRIGGER] auth_method: %', detected_auth_method;

  -- CRITICAL: Extraire prénom et nom
  -- Essayer d'abord given_name/family_name (format standard)
  extracted_first_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'given_name'), '');
  extracted_last_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'family_name'), '');

  -- Si vides, essayer first_name/last_name (inscription manuelle)
  IF extracted_first_name IS NULL THEN
    extracted_first_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'first_name'), '');
  END IF;
  IF extracted_last_name IS NULL THEN
    extracted_last_name := NULLIF(TRIM(NEW.raw_user_meta_data->>'last_name'), '');
  END IF;

  -- Si toujours vides, parser "full_name" ou "name" (Google parfois)
  IF (extracted_first_name IS NULL OR extracted_last_name IS NULL) THEN
    -- Essayer full_name
    IF NEW.raw_user_meta_data->>'full_name' IS NOT NULL THEN
      full_name_parts := string_to_array(TRIM(NEW.raw_user_meta_data->>'full_name'), ' ');
      IF array_length(full_name_parts, 1) >= 2 THEN
        -- DERNIER mot = nom, RESTE = prénom
        extracted_first_name := COALESCE(extracted_first_name, array_to_string(full_name_parts[1:array_length(full_name_parts, 1)-1], ' '));
        extracted_last_name := COALESCE(extracted_last_name, full_name_parts[array_length(full_name_parts, 1)]);
      ELSIF array_length(full_name_parts, 1) = 1 THEN
        extracted_first_name := COALESCE(extracted_first_name, full_name_parts[1]);
      END IF;
    -- Sinon essayer "name"
    ELSIF NEW.raw_user_meta_data->>'name' IS NOT NULL THEN
      full_name_parts := string_to_array(TRIM(NEW.raw_user_meta_data->>'name'), ' ');
      IF array_length(full_name_parts, 1) >= 2 THEN
        -- DERNIER mot = nom, RESTE = prénom
        extracted_first_name := COALESCE(extracted_first_name, array_to_string(full_name_parts[1:array_length(full_name_parts, 1)-1], ' '));
        extracted_last_name := COALESCE(extracted_last_name, full_name_parts[array_length(full_name_parts, 1)]);
      ELSIF array_length(full_name_parts, 1) = 1 THEN
        extracted_first_name := COALESCE(extracted_first_name, full_name_parts[1]);
      END IF;
    END IF;
  END IF;

  -- Valeurs par défaut si toujours NULL
  extracted_first_name := COALESCE(extracted_first_name, '');
  extracted_last_name := COALESCE(extracted_last_name, '');

  RAISE NOTICE '[TRIGGER] Extracted: first_name="%" last_name="%"', extracted_first_name, extracted_last_name;

  -- Insérer le profil
  BEGIN
    RAISE NOTICE '[TRIGGER] INSERT...';

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

    RAISE NOTICE '[TRIGGER] ✓ INSERT RÉUSSI';

  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING '[TRIGGER] Erreur: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION handle_new_user IS 'Trigger création profil. Parse full_name si given_name/family_name absents.';

-- Rapport
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '✓ FIX: Parser full_name/name';
  RAISE NOTICE '';
  RAISE NOTICE 'Le trigger essaie maintenant:';
  RAISE NOTICE '  1. given_name/family_name (standard OAuth)';
  RAISE NOTICE '  2. first_name/last_name (inscription manuelle)';
  RAISE NOTICE '  3. Parser full_name ou name (Google parfois)';
  RAISE NOTICE '';
  RAISE NOTICE 'Exemple: "Antoni Lucien KOUENI" → first="Antoni Lucien" last="KOUENI"';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '';
END $$;
