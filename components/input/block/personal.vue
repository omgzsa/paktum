<script setup lang="ts">
const props = defineProps<{
    person: string
}>()

const firstName = defineModel<string>('firstName', { required: true })
const lastName = defineModel<string>('lastName', { required: true })
const birthPlace = defineModel<string>('birthPlace', { required: true })
const birthDate = defineModel<string>('birthDate', { required: true })
const mothersName = defineModel<string>('mothersName', { required: true })
const nationality = defineModel<string>('nationality', { required: true })
</script>

<template>
    <div class="space-y-4">
        <div class="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <InputText
                v-model="firstName"
                label="Vezetéknév"
                :name="`${props.person}.firstName`"
            />
            <InputText
                v-model="lastName"
                label="Keresztnév"
                :name="`${props.person}.lastName`"
            />
        </div>

        <InputText
            v-model="birthPlace"
            label="Születési hely"
            :name="`${props.person}.birthPlace`"
        />
        <InputText
            v-model="birthDate"
            label="Születési idő"
            :name="`${props.person}.birthDate`"
            placeholder="ÉÉÉÉ-HH-NN"
        />

        <InputText
            v-model="mothersName"
            label="Anyja neve"
            :name="`${props.person}.mothersName`"
        />
        <InputText
            v-model="nationality"
            label="Állampolgárság"
            :name="`${props.person}.nationality`"
        />
    </div>
</template>
