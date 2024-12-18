export const useAuthModal = defineStore('auth-modal', () => {
	const isOpen = ref(false)

	function open() {
		isOpen.value = true
	}

	function close() {
		isOpen.value = false
	}

	return {
		isOpen,
		open,
		close,
	}
})
