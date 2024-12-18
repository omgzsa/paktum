<script setup lang="ts">
const { useAuthUser, logout } = useAuth()

const user = useAuthUser()
// console.log(user.value);
</script>

<template>
    <div
        class="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8"
    >
        <AuthModal />
        <div class="text-center sm:mx-auto sm:w-full sm:max-w-md">
            <h1 class="mb-6 text-4xl font-bold text-gray-900">
                Welcome {{ user?.username }}
            </h1>
            <div class="space-x-4">
                <NuxtLink
                    v-if="!user"
                    to="/user/login"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                    Sign In
                </NuxtLink>
                <button
                    v-else
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                    @click="() => logout()"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>
