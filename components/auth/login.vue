<script setup lang="ts">
// const router = useRouter()
const auth = useAuth()
const toast = useToast()

const form = ref({
	username: '',
	password: '',
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const rememberMe = ref(false)

const handleSubmit = async () => {
	error.value = null
	isLoading.value = true

	try {
		await auth.login(form.value)
		toast.add({
			title: 'Success!',
			description: 'You have been successfully logged in.',
			color: 'paktum',
		})
	} catch (e: unknown) {
		if (e instanceof Error) {
			error.value = e.message
		}
		toast.add({
			title: 'Error',
			description: error.value ?? '',
			color: 'red',
		})
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<UCard
		class="w-full max-w-md mx-auto my-10"
		:ui="{ ring: 'ring-0', shadow: 'shadow-none' }"
	>
		<form
			class="space-y-4"
			@submit.prevent="handleSubmit"
		>
			<UFormGroup
				label="Felhasználónév"
				name="username"
			>
				<UInput
					v-model="form.username"
					type="text"
					placeholder="@username"
					required
					:disabled="isLoading"
				/>
			</UFormGroup>

			<UFormGroup
				label="Jelszó"
				name="password"
			>
				<UInput
					v-model="form.password"
					type="password"
					placeholder="••••••••"
					autocomplete="current-password"
					required
					:disabled="isLoading"
				/>
			</UFormGroup>

			<div class="flex items-center justify-between">
				<UCheckbox
					v-model="rememberMe"
					label="Emlékezz rám"
					name="remember"
				/>
				<UButton
					variant="link"
					color="primary"
					to="/user/forgot-password"
					:disabled="isLoading"
				>
					Efelejtetted a jelszavad?
				</UButton>
			</div>

			<UButton
				type="submit"
				block
				:loading="isLoading"
				:disabled="isLoading"
			>
				{{ isLoading ? 'Belépés...' : 'Belép' }}
			</UButton>

			<div class="text-sm text-center">
				<span class="text-gray-500">Nincs még fiókod?</span>
				<UButton
					variant="link"
					color="primary"
					to="/user/register"
					:disabled="isLoading"
				>
					Regisztráció
				</UButton>
			</div>
		</form>
	</UCard>
</template>
