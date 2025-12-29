-- =====================================================
-- FONCTION RPC POUR SUPPRIMER LES IDENTITÉS DOUBLES
-- =====================================================
-- Cette fonction permet de supprimer une identité (provider)
-- d'un utilisateur pour éviter les conflits d'authentification

-- Supprimer l'ancienne fonction si elle existe
DROP FUNCTION IF EXISTS delete_user_identity_by_provider(uuid, text);

-- Créer la fonction pour supprimer une identité par provider
CREATE OR REPLACE FUNCTION delete_user_identity_by_provider(
  user_id_param UUID,
  provider_param TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Supprimer l'identité du provider spécifié pour l'utilisateur
  DELETE FROM auth.identities
  WHERE user_id = user_id_param
  AND provider = provider_param;

  -- Log pour debug (optionnel)
  RAISE NOTICE 'Identité supprimée: user_id=%, provider=%', user_id_param, provider_param;
END;
$$;

-- Donner les permissions d'exécution
GRANT EXECUTE ON FUNCTION delete_user_identity_by_provider(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_user_identity_by_provider(UUID, TEXT) TO anon;

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Vérifier que la fonction existe
SELECT
  routine_name,
  routine_type,
  security_type,
  specific_name
FROM information_schema.routines
WHERE routine_name = 'delete_user_identity_by_provider'
AND routine_schema = 'public';

-- Afficher la signature complète
\df delete_user_identity_by_provider
