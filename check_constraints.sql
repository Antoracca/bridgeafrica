-- ============================================================================
-- Vérifier TOUTES les contraintes sur profiles
-- ============================================================================

-- 1. Voir toutes les contraintes
SELECT
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
ORDER BY contype, conname;

-- 2. Voir la structure complète de la table
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. Vérifier le trigger actuel
SELECT
  tgname as trigger_name,
  tgenabled as enabled,
  pg_get_triggerdef(oid) as definition
FROM pg_trigger
WHERE tgrelid = 'public.profiles'::regclass
  OR tgrelid = 'auth.users'::regclass;
