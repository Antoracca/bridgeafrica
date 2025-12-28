'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import countries from 'world-countries'

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const countryOptions = countries
  .map(country => ({
    code: country.cca2,
    name: country.name.common,
    flag: country.flag,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

// Détection automatique du pays via timezone
function detectCountryFromTimezone(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Mapping étendu des timezones vers les codes pays (focus Afrique)
    const timezoneToCountry: Record<string, string> = {
      // Afrique Centrale
      'Africa/Libreville': 'GA',
      'Africa/Douala': 'CM',
      'Africa/Malabo': 'GQ',
      'Africa/Kinshasa': 'CD',
      'Africa/Lubumbashi': 'CD',
      'Africa/Brazzaville': 'CG',
      'Africa/Bangui': 'CF',
      'Africa/Ndjamena': 'TD',

      // Afrique de l'Ouest
      'Africa/Abidjan': 'CI',
      'Africa/Dakar': 'SN',
      'Africa/Lagos': 'NG',
      'Africa/Accra': 'GH',
      'Africa/Bamako': 'ML',
      'Africa/Ouagadougou': 'BF',
      'Africa/Niamey': 'NE',
      'Africa/Conakry': 'GN',
      'Africa/Lome': 'TG',
      'Africa/Porto-Novo': 'BJ',
      'Africa/Monrovia': 'LR',
      'Africa/Freetown': 'SL',
      'Africa/Bissau': 'GW',
      'Africa/Banjul': 'GM',
      'Africa/Nouakchott': 'MR',

      // Afrique de l'Est
      'Africa/Nairobi': 'KE',
      'Africa/Dar_es_Salaam': 'TZ',
      'Africa/Kampala': 'UG',
      'Africa/Kigali': 'RW',
      'Africa/Bujumbura': 'BI',
      'Africa/Addis_Ababa': 'ET',
      'Africa/Mogadishu': 'SO',
      'Africa/Djibouti': 'DJ',

      // Afrique du Nord
      'Africa/Algiers': 'DZ',
      'Africa/Tunis': 'TN',
      'Africa/Tripoli': 'LY',
      'Africa/Cairo': 'EG',
      'Africa/Casablanca': 'MA',

      // Afrique Australe
      'Africa/Johannesburg': 'ZA',
      'Africa/Windhoek': 'NA',
      'Africa/Gaborone': 'BW',
      'Africa/Lusaka': 'ZM',
      'Africa/Harare': 'ZW',
      'Africa/Maputo': 'MZ',
      'Africa/Blantyre': 'MW',

      // Europe
      'Europe/Paris': 'FR',
      'Europe/London': 'GB',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Brussels': 'BE',
      'Europe/Zurich': 'CH',
      'Europe/Amsterdam': 'NL',
      'Europe/Lisbon': 'PT',

      // Amérique
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Toronto': 'CA',
      'America/Montreal': 'CA',
      'America/Sao_Paulo': 'BR',
      'America/Mexico_City': 'MX',

      // Asie
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Hong_Kong': 'HK',
      'Asia/Singapore': 'SG',
      'Asia/Dubai': 'AE',
      'Asia/Kolkata': 'IN',

      // Océanie
      'Australia/Sydney': 'AU',
      'Pacific/Auckland': 'NZ',
    }

    return timezoneToCountry[timezone] || null
  } catch {
    return null
  }
}

// Détection via API de géolocalisation (secours)
async function detectCountryFromIP(): Promise<string | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: { 'Accept': 'application/json' }
    })
    const data = await response.json()
    return data.country_code || null
  } catch {
    return null
  }
}

export function CountrySelect({ value, onChange, disabled, className }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [isDetecting, setIsDetecting] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const hasDetected = React.useRef(false)

  // Marquer comme monté côté client (après hydratation)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Détection automatique UNIQUEMENT côté client, après hydratation complète
  React.useEffect(() => {
    // Ne s'exécute que côté client
    if (typeof window === 'undefined') return
    if (!isMounted) return
    if (hasDetected.current) return // Une seule fois

    async function detectCountry() {
      // Ne détecter que si le pays n'est pas déjà défini ou est GA (défaut)
      if (!value || value === 'GA') {
        hasDetected.current = true
        setIsDetecting(true)

        // Méthode 1: Timezone (rapide, précis pour l'Afrique)
        let detectedCountry = detectCountryFromTimezone()

        // Méthode 2: API IP (secours si timezone ne donne rien)
        if (!detectedCountry) {
          detectedCountry = await detectCountryFromIP()
        }

        // Appliquer le pays détecté uniquement s'il est différent de GA
        if (detectedCountry && detectedCountry !== 'GA') {
          onChange(detectedCountry)
        }

        setIsDetecting(false)
      }
    }

    detectCountry()
  }, [isMounted, value, onChange])

  const selectedCountry = countryOptions.find(c => c.code === value)

  const filteredCountries = React.useMemo(() => {
    if (!search) return countryOptions

    const searchLower = search.toLowerCase()
    return countryOptions.filter(country =>
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower)
    )
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Sélectionner un pays"
          disabled={disabled || isDetecting}
          className={cn(
            "w-full h-12! px-4 justify-between text-base rounded-xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 font-medium",
            !selectedCountry && "text-slate-500 dark:text-slate-400",
            className
          )}
        >
          <span suppressHydrationWarning>
            {isDetecting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm font-medium">Détection...</span>
              </span>
            ) : selectedCountry ? (
              <span className="flex items-center gap-2 overflow-hidden">
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="truncate font-medium">{selectedCountry.name}</span>
              </span>
            ) : (
              <span className="text-sm font-medium">Sélectionner un pays</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0 rounded-xl border-2 shadow-xl"
        align="start"
        sideOffset={6}
      >
        <Command shouldFilter={false} className="rounded-xl border-none">
          <CommandInput
            placeholder="Rechercher un pays..."
            value={search}
            onValueChange={setSearch}
            className="h-12 border-b text-base"
            autoFocus
          />
          <CommandList className="max-h-62.5 md:max-h-75 overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Aucun pays trouvé.
            </CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => {
                    onChange(country.code)
                    setOpen(false)
                    setSearch('')
                  }}
                  className="cursor-pointer py-2.5 px-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-blue-600",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="mr-2 text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
