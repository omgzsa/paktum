<script setup lang="ts">
const props = defineProps<{
    person: string
}>()

const publicAreaTypes = ref([
    'utca',
    'tér',
    'út',
    'sugárút',
    'körút',
    'sétány',
    'köz',
    'lépcső',
    'rakpart',
    'dűlő',
    'fasor',
    'sor',
    'park',
    'liget',
    'udvar',
    'árok',
    'telep',
    'sziget',
])

const country = defineModel<string>('country')
const zipcode = defineModel<string>('zipcode')
const city = defineModel<string>('city')
const streetName = defineModel<string>('streetName')
const publicAreaType = defineModel<string>('publicAreaType', {
    default: 'utca',
})
const houseNumber = defineModel<string | number | undefined>('houseNumber')
const building = defineModel<string | number | undefined>('building')
const staircase = defineModel<string | number | undefined>('staircase')
const floor = defineModel<string | number | undefined>('floor')
const door = defineModel<string | number | undefined>('door')
</script>

<template>
    <div class="space-y-4">
        <InputText
            v-model="country"
            label="Ország"
            :name="`${props.person}.country`"
        />
        <InputText
            v-model="zipcode"
            label="Irányítószám"
            :name="`${props.person}.zipcode`"
        />
        <InputText
            v-model="city"
            label="Település"
            :name="`${props.person}.city`"
        />
        <InputText
            v-model="streetName"
            label="Közterület neve"
            :name="`${props.person}.streetName`"
        />

        <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
            <InputSelect
                v-model="publicAreaType"
                label="Közterület jellege"
                :options="publicAreaTypes"
                :name="`${props.person}.publicAreaType`"
            />
            <InputText
                v-model="houseNumber"
                label="Házszám"
                :name="`${props.person}.houseNumber`"
            />
            <InputText
                v-model="building"
                label="Épület"
                :name="`${props.person}.building`"
            />
        </div>

        <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
            <InputText
                v-model="staircase"
                label="Lépcsőház"
                :name="`${props.person}.staircase`"
            />
            <InputText
                v-model="floor"
                label="Emelet"
                :name="`${props.person}.floor`"
            />
            <InputText
                v-model="door"
                label="Ajtó"
                :name="`${props.person}.door`"
            />
        </div>
    </div>
</template>
