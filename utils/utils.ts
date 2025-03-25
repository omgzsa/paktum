export const concatValues = (values: string[]) => {
    return values.join(', ')
}

export const saveToLocalStorage = (key: string, value: string) =>
    localStorage.setItem(key, value)

export const removeFromLocalStorage = (key: string) =>
    localStorage.removeItem(key)

// The handler function that works with both refs and plain objects
// export const handleRadioChange = (
//     obj: Record<string, any> | Ref<Record<string, any>>,
//     selected: string,
//     options: string[],
// ) => {
//     const target = isRef(obj)
//         ? (obj.value as Record<string, any>)
//         : (obj as Record<string, any>);

//     options.forEach((option) => {
//         target[option] = false;
//     });

//     target[selected] = true;
// };

export const toggleVisibility = (ref: Ref) => {
    ref.value = !ref.value
}
