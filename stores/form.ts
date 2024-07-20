import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', () => {
  const formState = ref({})

  return {
    formState,
  }
})
