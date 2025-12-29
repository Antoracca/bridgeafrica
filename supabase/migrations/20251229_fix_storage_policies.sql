-- =====================================================
-- FIX DES POLITIQUES STORAGE POUR PHOTOS DE PROFIL
-- =====================================================

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Les photos de profil sont publiques" ON storage.objects;
DROP POLICY IF EXISTS "Les utilisateurs peuvent uploader leur photo de profil" ON storage.objects;
DROP POLICY IF EXISTS "Les utilisateurs peuvent mettre à jour leur photo de profil" ON storage.objects;
DROP POLICY IF EXISTS "Les utilisateurs peuvent supprimer leur photo de profil" ON storage.objects;

-- Politique simplifiée : Tout le monde peut LIRE les photos (public)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Politique simplifiée : Les utilisateurs authentifiés peuvent UPLOADER
CREATE POLICY "Authenticated users can upload profile pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-pictures');

-- Politique simplifiée : Les utilisateurs authentifiés peuvent METTRE À JOUR
CREATE POLICY "Authenticated users can update profile pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-pictures');

-- Politique simplifiée : Les utilisateurs authentifiés peuvent SUPPRIMER
CREATE POLICY "Authenticated users can delete profile pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-pictures');

-- Vérification
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'objects'
AND policyname LIKE '%profile%'
ORDER BY policyname;
