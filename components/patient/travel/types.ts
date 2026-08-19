export type TravelSubView = 
  | 'overview'
  | 'flights'
  | 'visas'
  | 'accommodation'
  | 'transfers'

export type LogisticsStatus = 'non_engage' | 'en_cours' | 'confirme' | 'traite'

export interface FlightDetails {
  isEngaged: boolean
  status: LogisticsStatus
  origin?: string
  destination?: string
  airline?: string
  flightNumber?: string
  departureDate?: string
  returnDate?: string
  hasPMRSupport?: boolean
  medicalLuggageDeclared?: boolean
}

export interface VisaDetails {
  isEngaged: boolean
  status: LogisticsStatus
  destinationCountry?: string
  invitationLetterUrl?: string
  consularRef?: string
  issuedDate?: string
  expiryDate?: string
}

export interface AccommodationDetails {
  isEngaged: boolean
  status: LogisticsStatus
  hotelName?: string
  hotelCategory?: string
  roomType?: string
  checkInDate?: string
  checkOutDate?: string
  address?: string
  accompanyingPersons?: number
  hasPMRSupport?: boolean
}

export interface TransferDetails {
  isEngaged: boolean
  status: LogisticsStatus
  airportPickup?: boolean
  dailyCliniqueShuttle?: boolean
  isAmbulanceRequired?: boolean
  driverName?: string
  driverPhone?: string
  vehicleModel?: string
}

export interface TravelLogisticsPackage {
  id?: string
  caseId?: string
  isEngaged: boolean
  status: LogisticsStatus
  flight?: FlightDetails
  visa?: VisaDetails
  accommodation?: AccommodationDetails
  transfer?: TransferDetails
}
