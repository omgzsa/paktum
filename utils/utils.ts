export const concatValues = (values: string[]) => {
    return values.join(', ')
}

export const saveToLocalStorage = (key: string, value: string) =>
    localStorage.setItem(key, value)

export const removeFromLocalStorage = (key: string) =>
    localStorage.removeItem(key)

export const toggleVisibility = (ref: Ref) => (ref.value = !ref.value)

export const formatAddress = (property: any) => {
    if (!property) return ''

    const parts = [
        `${property.streetName} ${property.publicAreaType}`,
        `${property.houseNumber}.`,
        property.building && `${property.building}. épület`,
        property.staircase && `${property.staircase}. lépcsőház`,
        property.floor && `${property.floor}.em.`,
        property.door && `${property.door}.a.`,
    ]

    return parts.filter(Boolean).join(', ')
}

export const formatMailingAddress = (property: any) => {
    if (!property) return ''

    const parts = [
        `${property.mailingStreetName} ${property.mailingPublicAreaType}`,
        `${property.mailingHouseNumber}.`,
        property.mailingBuilding && `${property.mailingBuilding}. épület`,
        property.mailingStaircase && `${property.mailingStaircase}. lépcsőház`,
        property.mailingFloor && `${property.mailingFloor}.em.`,
        property.mailingDoor && `${property.mailingDoor}.a.`,
    ]

    return parts.filter(Boolean).join(', ')
}
