-- ============================================================================
-- FIX CRITIQUE: app_metadata → raw_app_meta_data
-- ============================================================================
-- ERREUR: record "new" has no field "app_metadata"
-- CAUSE: Dans auth.users, la colonne s'appelle raw_app_meta_data (underscores)
-- FIX: Utiliser NEW.raw_app_meta_data au lieu de NEW.app_metadata
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
BEGIN
  RAISE NOTICE '[TRIGGER START] User: %', NEW.email;
  RAISE NOTICE '[TRIGGER] raw_app_meta_data: %', NEW.raw_app_meta_data::text;
  RAISE NOTICE '[TRIGGER] raw_user_meta_data: %', NEW.raw_user_meta_data::text;

  -- Normaliser téléphone
  normalized_phone := REGEXP_REPLACE(COALESCE(NEW.raw_user_meta_data->>'phone', ''), '[\s\.\-\(\)]', '', 'g');
  IF normalized_phone = '' THEN normalized_phone := NULL; END IF;

  -- Normaliser email
  normalized_email := LOWER(TRIM(NEW.email));

  -- CRITICAL FIX: Utiliser raw_app_meta_data (PAS app_metadata)
  IF NEW.raw_app_meta_data->>'provider' IS NOT NULL THEN
    detected_auth_method := NEW.raw_app_meta_data->>'provider';
  ELSE
    detected_auth_method := 'manual';
  END IF;
  RAISE NOTICE '[TRIGGER] auth_method détecté: %', detected_auth_method;

  -- Extraire prénom (Google = given_name, Manuel = first_name)
  extracted_first_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'given_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'first_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'firstName'), ''),
    ''
  );
  RAISE NOTICE '[TRIGGER] first_name extrait: "%"', extracted_first_name;

  -- Extraire nom (Google = family_name, Manuel = last_name)
  extracted_last_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'family_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'last_name'), ''),
    NULLIF(TRIM(NEW.raw_user_meta_data->>'lastName'), ''),
    ''
  );
  RAISE NOTICE '[TRIGGER] last_name extrait: "%"', extracted_last_name;

  -- Insérer le profil
  BEGIN
    RAISE NOTICE '[TRIGGER] Tentative INSERT...';

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
      RAISE NOTICE '[TRIGGER] ✗ Doublon: %', SQLERRM;
      RAISE WARNING 'Doublon email/phone: %', SQLERRM;

    WHEN check_violation THEN
      RAISE NOTICE '[TRIGGER] ✗ Violation contrainte CHECK: %', SQLERRM;
      RAISE WARNING 'Check violation: %', SQLERRM;

    WHEN OTHERS THEN
      RAISE NOTICE '[TRIGGER] ✗ Erreur: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
      RAISE WARNING 'Erreur profil: %', SQLERRM;
  END;

  RAISE NOTICE '[TRIGGER END] ✓ Retour NEW';
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION handle_new_user IS 'Trigger création profil. FIX: Utilise raw_app_meta_data (pas app_metadata). Ne bloque jamais.';

-- Rapport
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '✓ FIX CRITIQUE APPLIQUÉ';
  RAISE NOTICE '';
  RAISE NOTICE 'Changement:';
  RAISE NOTICE '  ✗ AVANT: NEW.app_metadata (colonne inexistante)';
  RAISE NOTICE '  ✓ APRÈS: NEW.raw_app_meta_data (colonne correcte)';
  RAISE NOTICE '';
  RAISE NOTICE 'Le trigger devrait maintenant fonctionner !';
  RAISE NOTICE '════════════════════════════════════════════════════════════════';
  RAISE NOTICE '';
END $$;
