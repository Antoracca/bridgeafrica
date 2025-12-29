-- =====================================================
-- POLITIQUES SÉCURISÉES : Chaque utilisateur gère UNIQUEMENT SA photo
-- =====================================================

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile pictures" ON storage.objects;

-- 1. LECTURE PUBLIQUE : Tout le monde peut voir toutes les photos
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- 2. UPLOAD : Uniquement SA PROPRE photo
-- Le fichier doit commencer par "avatars/{user_id}-"
CREATE POLICY "Users can upload their own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND name LIKE 'avatars/' || auth.uid()::text || '-%'
);

-- 3. MISE À JOUR : Uniquement SA PROPRE photo
CREATE POLICY "Users can update their own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND name LIKE 'avatars/' || auth.uid()::text || '-%'
)
WITH CHECK (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND name LIKE 'avatars/' || auth.uid()::text || '-%'
);

-- 4. SUPPRESSION : Uniquement SA PROPRE photo
CREATE POLICY "Users can delete their own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND name LIKE 'avatars/' || auth.uid()::text || '-%'
);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Afficher toutes les politiques du bucket
SELECT
  policyname,
  cmd as operation,
  CASE
    WHEN roles = '{public}' THEN 'Public'
    WHEN roles = '{authenticated}' THEN 'Authenticated'
    ELSE roles::text
  END as who_can_use,
  CASE
    WHEN qual IS NOT NULL AND with_check IS NOT NULL THEN 'USING + WITH CHECK'
    WHEN qual IS NOT NULL THEN 'USING only'
    WHEN with_check IS NOT NULL THEN 'WITH CHECK only'
    ELSE 'No restrictions'
  END as restriction_type
FROM pg_policies
WHERE tablename = 'objects'
AND policyname LIKE '%profile%'
ORDER BY cmd, policyname;

-- Test : Afficher la structure attendue des fichiers
SELECT
  'avatars/' || auth.uid()::text || '-TIMESTAMP.ext' as expected_file_pattern,
  auth.uid() as your_user_id;
