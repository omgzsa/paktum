<script setup lang="ts">
const { useAuthUser, logout } = useAuth()

const user = useAuthUser()
</script>

<template>
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
</template>
