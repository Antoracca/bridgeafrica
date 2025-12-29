-- =====================================================
-- TOUTES LES FONCTIONS RPC NÉCESSAIRES POUR L'AUTHENTIFICATION
-- =====================================================

-- =====================================================
-- 1. FONCTION : delete_user_identity_by_provider
-- Supprime une identité (provider) d'un utilisateur
-- =====================================================
DROP FUNCTION IF EXISTS delete_user_identity_by_provider(uuid, text);

CREATE OR REPLACE FUNCTION delete_user_identity_by_provider(
  user_id_param UUID,
  provider_param TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  DELETE FROM auth.identities
  WHERE user_id = user_id_param
  AND provider = provider_param;

  RAISE NOTICE 'Identité supprimée: user_id=%, provider=%', user_id_param, provider_param;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_user_identity_by_provider(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_user_identity_by_provider(UUID, TEXT) TO anon;

-- =====================================================
-- 2. FONCTION : check_email_exists
-- Vérifie si un email existe dans auth.users
-- =====================================================
DROP FUNCTION IF EXISTS check_email_exists(text);

CREATE OR REPLACE FUNCTION check_email_exists(
  email_to_check TEXT
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE email = LOWER(TRIM(email_to_check))
  );
END;
$$;

GRANT EXECUTE ON FUNCTION check_email_exists(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION check_email_exists(TEXT) TO authenticated;

-- =====================================================
-- 3. FONCTION : check_phone_exists
-- Vérifie si un téléphone existe dans profiles
-- =====================================================
DROP FUNCTION IF EXISTS check_phone_exists(text);

CREATE OR REPLACE FUNCTION check_phone_exists(
  phone_to_check TEXT
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE phone = phone_to_check
  );
END;
$$;

GRANT EXECUTE ON FUNCTION check_phone_exists(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION check_phone_exists(TEXT) TO authenticated;

-- =====================================================
-- 4. FONCTION : check_phone_exists_excluding_user
-- Vérifie si un téléphone existe en excluant un utilisateur spécifique
-- =====================================================
DROP FUNCTION IF EXISTS check_phone_exists_excluding_user(text, uuid);

CREATE OR REPLACE FUNCTION check_phone_exists_excluding_user(
  phone_to_check TEXT,
  user_id_to_exclude UUID
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE phone = phone_to_check
    AND id != user_id_to_exclude
  );
END;
$$;

GRANT EXECUTE ON FUNCTION check_phone_exists_excluding_user(TEXT, UUID) TO authenticated;

-- =====================================================
-- 5. FONCTION : check_name_exists
-- Vérifie si un nom complet existe dans profiles
-- =====================================================
DROP FUNCTION IF EXISTS check_name_exists(text, text);

CREATE OR REPLACE FUNCTION check_name_exists(
  first_name_to_check TEXT,
  last_name_to_check TEXT
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE LOWER(TRIM(first_name)) = LOWER(TRIM(first_name_to_check))
    AND LOWER(TRIM(last_name)) = LOWER(TRIM(last_name_to_check))
  );
END;
$$;

GRANT EXECUTE ON FUNCTION check_name_exists(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION check_name_exists(TEXT, TEXT) TO authenticated;

-- =====================================================
-- VÉRIFICATION FINALE
-- =====================================================

-- Afficher toutes les fonctions créées
SELECT
  routine_name,
  routine_type,
  specific_name,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'delete_user_identity_by_provider',
  'check_email_exists',
  'check_phone_exists',
  'check_phone_exists_excluding_user',
  'check_name_exists'
)
ORDER BY routine_name;

-- Vérifier les permissions
SELECT
  routine_name,
  grantee,
  privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
AND routine_name IN (
  'delete_user_identity_by_provider',
  'check_email_exists',
  'check_phone_exists',
  'check_phone_exists_excluding_user',
  'check_name_exists'
)
ORDER BY routine_name, grantee;
