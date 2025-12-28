-- Test si le trigger fonctionne pour inscription manuelle
-- Exécutez dans Supabase Dashboard → SQL Editor

-- 1. Vérifier que le trigger existe
SELECT
  tgname as trigger_name,
  tgenabled as enabled
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- 2. Voir la définition du trigger actuel
SELECT pg_get_functiondef(p.oid)
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'handle_new_user'
  AND n.nspname = 'public';

-- 3. Vérifier les profils orphelins (auth.users sans profil)
SELECT
  u.id,
  u.email,
  u.created_at,
  p.id as profile_id
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ORDER BY u.created_at DESC
LIMIT 5;
