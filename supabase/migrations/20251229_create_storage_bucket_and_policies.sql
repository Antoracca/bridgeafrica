-- =====================================================
-- CRÉATION DU BUCKET STORAGE POUR PHOTOS DE PROFIL
-- =====================================================

-- 1. Créer le bucket public pour les photos de profil
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-pictures',
  'profile-pictures',
  true, -- Public pour que les avatars soient visibles
  5242880, -- 5 MB max
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Politique : Tout le monde peut LIRE les photos de profil (public)
CREATE POLICY "Les photos de profil sont publiques"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- 3. Politique : Les utilisateurs authentifiés peuvent UPLOADER leurs propres photos
CREATE POLICY "Les utilisateurs peuvent uploader leur photo de profil"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^avatars/([^-]+)-.*'))[1]
);

-- 4. Politique : Les utilisateurs peuvent METTRE À JOUR leurs propres photos
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur photo de profil"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^avatars/([^-]+)-.*'))[1]
)
WITH CHECK (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^avatars/([^-]+)-.*'))[1]
);

-- 5. Politique : Les utilisateurs peuvent SUPPRIMER leurs propres photos
CREATE POLICY "Les utilisateurs peuvent supprimer leur photo de profil"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^avatars/([^-]+)-.*'))[1]
);

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Vérifier que le bucket a été créé
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%photo de profil%';
