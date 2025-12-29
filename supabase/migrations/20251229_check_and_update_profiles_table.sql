-- =====================================================
-- VÉRIFICATION ET MISE À JOUR DE LA TABLE PROFILES
-- =====================================================

-- 1. Vérifier la structure actuelle de la table
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Ajouter les colonnes manquantes si elles n'existent pas
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS blood_type VARCHAR(5);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medical_history TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notification_preference VARCHAR(20) DEFAULT 'email';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 3. Vérifier les données existantes pour un utilisateur
-- (Remplacez 'VOTRE_USER_ID' par votre véritable user ID si vous le connaissez)
SELECT
    id,
    first_name,
    last_name,
    phone,
    country,
    city,
    allergies,
    blood_type,
    medical_history,
    notification_preference,
    avatar_url,
    created_at,
    updated_at
FROM profiles
LIMIT 5;

-- 4. Mettre à jour les profils qui ont des données dans user_metadata mais pas dans la table
-- Cette requête remplit les champs manquants depuis auth.users.raw_user_meta_data
UPDATE profiles p
SET
    first_name = COALESCE(p.first_name, u.raw_user_meta_data->>'first_name', u.raw_user_meta_data->>'given_name'),
    last_name = COALESCE(p.last_name, u.raw_user_meta_data->>'last_name', u.raw_user_meta_data->>'family_name'),
    phone = COALESCE(p.phone, u.raw_user_meta_data->>'phone'),
    country = COALESCE(p.country, u.raw_user_meta_data->>'country', 'GA')
FROM auth.users u
WHERE p.id = u.id
AND (
    p.first_name IS NULL
    OR p.last_name IS NULL
    OR p.phone IS NULL
    OR p.country IS NULL
);

-- 5. Vérification finale - afficher les profils mis à jour
SELECT
    id,
    first_name,
    last_name,
    phone,
    country,
    CASE
        WHEN first_name IS NULL OR last_name IS NULL THEN '⚠️ Données manquantes'
        ELSE '✅ Complet'
    END as status
FROM profiles
LIMIT 10;

-- 6. Compter les profils avec données manquantes
SELECT
    COUNT(*) FILTER (WHERE first_name IS NULL OR last_name IS NULL) as profiles_incomplets,
    COUNT(*) as total_profiles
FROM profiles;
