export interface Question {
    questionId: number
    questionSelectedOptionIdentifier: string
    optionParameters?: Array<{
        optionParameterId?: number
        parameter?: string | number | undefined
    }>
}

export interface PublicDocument {
    movingOut: boolean
    paymentObligation: boolean
    servicePresumption: boolean
    paidBy: 'owner' | 'renter' | 'both' | undefined
}

// Base interface for shared properties
export interface Person {
    firstName: string
    lastName: string
    birthDate: string
    birthPlace: string
    mothersName: string
    country: string
    nationality: string
    zipcode: string
    city: string
    address: string
    idCardType: string
    idCardNumber: string
    idCardExpiration: string
    taxIdentificationNumber: string
    mailingZipcode: string
    mailingCountry: string
    mailingCity: string
    mailingAddress: string
    // these below properties are used for the address concatenation
    streetName: string
    houseNumber: number | string | undefined
    building: number | undefined
    staircase: number | undefined
    floor: number | undefined
    door: number | undefined
    publicAreaType: string
    // these below properties are used for the mailing address concatenation
    mailingStreetName: string
    mailingHouseNumber: number | string | undefined
    mailingBuilding: number | undefined
    mailingStaircase: number | undefined
    mailingFloor: number | undefined
    mailingDoor: number | undefined
    mailingPublicAreaType: string
}

// Extended interfaces for specific entities
export interface Owner extends Person {
    ownerId: number
    contractId: number
    bankName: string
    bankAccount: string
}

export interface Renter extends Person {
    renterId: number
    contractId: number
}

export interface NonLegalEntity {
    entityName: string
    representativeName: string
    registrationNumber: string
    address: string
    country: string
}

// Union type for contract participants
export type ContractParticipant = Owner | Renter | NonLegalEntity
