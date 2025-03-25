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
            :name="`${props.person}.mailingCountry`"
        />
        <InputText
            v-model="zipcode"
            label="Irányítószám"
            :name="`${props.person}.mailingZipcode`"
        />
        <InputText
            v-model="city"
            label="Település"
            :name="`${props.person}.mailingCity`"
        />
        <InputText
            v-model="streetName"
            label="Közterület neve"
            :name="`${props.person}.mailingStreetName`"
        />

        <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
            <InputSelect
                v-model="publicAreaType"
                label="Közterület jellege"
                :options="publicAreaTypes"
                :name="`${props.person}.mailingPublicAreaType`"
            />
            <InputText
                v-model="houseNumber"
                label="Házszám"
                :name="`${props.person}.mailingHouseNumber`"
            />
            <InputText
                v-model="building"
                label="Épület"
                :name="`${props.person}.mailingBuilding`"
            />
        </div>

        <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
            <InputText
                v-model="staircase"
                label="Lépcsőház"
                :name="`${props.person}.mailingStaircase`"
            />
            <InputText
                v-model="floor"
                label="Emelet"
                :name="`${props.person}.mailingFloor`"
            />
            <InputText
                v-model="door"
                label="Ajtó"
                :name="`${props.person}.mailingDoor`"
            />
        </div>
    </div>
</template>
