export function isPasswordAcceptable(password: string): boolean {
  // Règle de base pour la complexité du mot de passe
  // (peut être étendue avec des regex pour chiffres, majuscules, symboles)
  return password.length >= 8; 
}