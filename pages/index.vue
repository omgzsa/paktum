<script setup lang="ts">
const isOpen = ref(false)

const title = 'Készíts bérleti szerződést online, gyorsan és jogszerűen!'
const punchLine =
    'Készítsd el a teljesen személyre szabható, jogszabályoknak megfelelő bérleti szerződést percek alatt online, magas ügyvédi költségek és akár felesleges papírozás nélkül.'

useSeoMeta({
    title: 'Kezdőlap',
    description:
        'Készítsd el a teljesen személyre szabható, jogszabályoknak megfelelő bérleti szerződést percek alatt online, magas ügyvédi költségek és akár felesleges papírozás nélkül.',
    ogImage: '/paktum-logo.svg',
})
</script>

<template>
    <div>
        <LandingHero :title :punch-line @open="isOpen = true" />

        <section class="bg-gray-50 py-20 dark:bg-neutral-900">
            <div class="container mx-auto px-4 text-center">
                <NuxtImg
                    src="/construction-site.svg"
                    alt="Under construction vector image"
                    class="mx-auto mb-8 w-36"
                    width="100"
                    height="50"
                />

                <h2 class="text-3xl font-bold mb-4 dark:text-neutral-200">
                    Fejlesztés alatt
                </h2>
                <p
                    class="max-w-2xl mx-auto text-gray-700 mb-20 dark:text-neutral-400"
                >
                    Weboldalunk jelenleg fejlesztés alatt áll. Hamarosan teljes
                    funkcionalitással elérhető lesz. Köszönjük a türelmedet!
                </p>
            </div>
        </section>

        <AppModal v-model="isOpen">
            <template #title>
                <h2>Üdvözöllek! 📣</h2>
            </template>
            <p>
                Köszönjük, hogy érdeklődsz oldalunk iránt, azonban egyelőre még
                fejlesztés alatt áll. Addig böngészheted
                <NuxtLink
                    to="/blog"
                    class="text-primary-600 hover:text-primary-500 hover:underline decoration-primary-500 underline-offset-4"
                    >blogunkat</NuxtLink
                >,
                <NuxtLink
                    to="/gyik"
                    class="text-primary-600 hover:text-primary-500 hover:underline decoration-primary-500 underline-offset-4"
                    >GYIK-et</NuxtLink
                >
                vagy letöltheted ingyenes mellékleteinket.
            </p>
        </AppModal>
    </div>
</template>
