<script setup lang="ts">
const title = 'Bérleti szerződés otthonról, gyorsan, egyszerűen'
const punchLine =
    'Készítsd el a teljesen személyre szabható, ügyvéd által hitelesített bérleti szerződést percek alatt, otthonról, felesleges papírozás és magas ügyvédi költségek nélkül.'
</script>

<template>
    <div class="bg-primary-500 pt-6 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
        <UContainer as="section" class="mb-16">
            <div
                class="flex flex-col items-center max-w-2xl mx-auto text-center gap-4 md:gap-6 xl:gap-8"
            >
                <UButton
                    color="black"
                    variant="outline"
                    to="/"
                    label="Kiváncsi vagy hogyan működik?"
                    trailing-icon="i-heroicons-arrow-right"
                    size="xs"
                    class="rounded-full"
                />
                <h1 class="xl:text-6xl ext-neutral-900 dark:text-neutral-900">
                    {{ title }}
                </h1>
                <p
                    class="text-sm sm:text-base ext-neutral-900 dark:text-neutral-900"
                >
                    {{ punchLine }}
                </p>
                <UButton
                    color="black"
                    variant="solid"
                    to="/berleti/lepes/1"
                    label="Kitöltöm a szerződésem!"
                    size="lg"
                    class="shadow-md"
                />
            </div>
        </UContainer>
        <TheHouses />
    </div>
</template>
