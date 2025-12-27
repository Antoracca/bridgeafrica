'use client'

import { Check, X } from 'lucide-react'
import { usePasswordValidation, type PasswordStrength } from '@/hooks/use-password-validation'
import { Progress } from '@/components/ui/progress'

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = usePasswordValidation(password)

  if (!password) return null

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <Progress value={strength.score} className="h-1.5 flex-1" />
        {strength.message && (
          <span className={`text-[10px] font-medium ${
            strength.message === 'Excellent' ? 'text-green-600' :
            strength.message === 'Bon' ? 'text-blue-600' :
            strength.message === 'Moyen' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {strength.message}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          {strength.requirements.length ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <X className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-[10px] text-muted-foreground">8 caractères minimum</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {strength.requirements.uppercase ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <X className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-[10px] text-muted-foreground">Une majuscule</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {strength.requirements.lowercase ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <X className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-[10px] text-muted-foreground">Une minuscule</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {strength.requirements.number ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <X className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-[10px] text-muted-foreground">Un chiffre</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {strength.requirements.special ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <X className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-[10px] text-muted-foreground">Un caractère spécial</span>
        </div>
      </div>
    </div>
  )
}
