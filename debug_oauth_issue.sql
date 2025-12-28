-- ============================================================================
-- DEBUG: Vérifier pourquoi OAuth bloque
-- Exécutez ce script dans Supabase Dashboard → SQL Editor
-- ============================================================================

-- 1. Vérifier s'il y a des profils avec votre email Google
SELECT
  id,
  email,
  first_name,
  last_name,
  phone,
  auth_method,
  created_at
FROM public.profiles
WHERE email ILIKE '%votre-email-google%'  -- REMPLACEZ avec votre vrai email
ORDER BY created_at DESC;

-- 2. Vérifier s'il y a des users auth avec cet email
SELECT
  id,
  email,
  created_at,
  email_confirmed_at,
  app_metadata,
  raw_user_meta_data
FROM auth.users
WHERE email ILIKE '%votre-email-google%'  -- REMPLACEZ avec votre vrai email
ORDER BY created_at DESC;

-- 3. Vérifier la contrainte phone actuelle
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname LIKE '%phone%';

-- 4. Vérifier la contrainte auth_method
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname LIKE '%auth%';

-- 5. Test manuel du trigger avec des données Google simulées
DO $$
DECLARE
  test_user_id uuid := gen_random_uuid();
BEGIN
  -- Simuler l'insertion d'un user Google
  RAISE NOTICE '--- TEST TRIGGER ---';
  RAISE NOTICE 'Test user ID: %', test_user_id;

  -- Tenter de créer un profil comme le ferait le trigger
  BEGIN
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
    ) VALUES (
      test_user_id,
      'test-oauth@example.com',
      'Test',
      'User',
      'patient',
      '',
      NULL,  -- Pas de téléphone
      'google',
      NOW(),
      NOW()
    );

    RAISE NOTICE '✓ Test réussi : profil créé sans erreur';

    -- Nettoyer
    DELETE FROM public.profiles WHERE id = test_user_id;
    RAISE NOTICE '✓ Profil test supprimé';

  EXCEPTION
    WHEN OTHERS THEN
      RAISE NOTICE '✗ ERREUR lors du test : % (SQLSTATE: %)', SQLERRM, SQLSTATE;
  END;
END $$;
