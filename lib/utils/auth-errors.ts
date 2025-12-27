export function parseSupabaseError(error: any, context: 'login' | 'signup' | 'oauth' | 'resend' | 'updateProfile'): {
    userFriendly: string;
    raw: string;
    code?: string;
} {
    let userFriendly = "Une erreur inattendue est survenue.";
    let raw = JSON.stringify(error);
    let code: string | undefined;

    if (error && typeof error.message === 'string') {
        raw = error.message;
        
        if (error.code) {
            code = error.code;
        }

        switch (context) {
            case 'login':
                if (error.message.includes("Invalid login credentials")) {
                    userFriendly = "Email ou mot de passe incorrect.";
                } else if (error.message.includes("Email not confirmed")) {
                    userFriendly = "Veuillez confirmer votre email avant de vous connecter.";
                } else if (error.message.includes("Email link is invalid or has expired")) {
                    userFriendly = "Le lien de connexion est invalide ou a expiré.";
                } else if (error.message.includes("User not found")) {
                    userFriendly = "Utilisateur non trouvé.";
                } else {
                    userFriendly = "Échec de la connexion. Vérifiez vos identifiants.";
                }
                break;

            case 'signup':
                if (error.message.includes("User already registered")) {
                    userFriendly = "Cet email est déjà associé à un compte. Connectez-vous ou réinitialisez votre mot de passe.";
                } else if (error.message.includes("profiles_first_name_last_name_country_key")) {
                    userFriendly = "Un utilisateur avec ce nom existe déjà dans le pays sélectionné.";
                } else if (error.message.includes("Password should be at least")) {
                    userFriendly = "Le mot de passe est trop court (min. 6 caractères).";
                } else if (error.message.includes("weak_password")) {
                    userFriendly = "Le mot de passe est trop faible. Utilisez une combinaison plus complexe.";
                } else if (error.message.includes("duplicate key value violates unique constraint")) {
                    userFriendly = "Un compte existe déjà avec cet email.";
                } else if (error.message.includes("AuthApiError")) {
                    userFriendly = "Échec de l'inscription. Veuillez réessayer plus tard.";
                } else {
                    userFriendly = "Échec de l'inscription. Veuillez réessayer.";
                }
                break;

            case 'oauth':
                if (error.message.includes("AuthApiError")) {
                    userFriendly = "Un compte existe déjà avec cet email. Veuillez vous connecter manuellement pour lier les comptes.";
                } else {
                    userFriendly = "Échec de la connexion avec le fournisseur. Veuillez réessayer.";
                }
                break;

            case 'resend':
                if (error.message.includes("User not found")) {
                    userFriendly = "Aucun utilisateur trouvé avec cet email.";
                } else if (error.message.includes("A message was already sent")) {
                    userFriendly = "Un email de confirmation a déjà été envoyé récemment. Veuillez vérifier votre boîte de réception.";
                } else {
                    userFriendly = "Échec du renvoi de l'email. Veuillez réessayer.";
                }
                break;
            
            case 'updateProfile':
                userFriendly = "Échec de la mise à jour du profil. Veuillez réessayer.";
                break;
        }
    } else if (typeof error === 'string') {
        raw = error;
        userFriendly = error; // Fallback simple pour les erreurs string
    }

    return { userFriendly, raw, code };
}