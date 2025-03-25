<script setup lang="ts">
const props = defineProps<{
    person: string
}>()

const idCardType = defineModel<string>('idCardType', { required: true })
const idCardNumber = defineModel<string>('idCardNumber', { required: true })
const idCardExpiration = defineModel<string>('idCardExpiration', {
    required: true,
})
const taxIdentificationNumber = defineModel<string>('taxIdentificationNumber', {
    required: true,
})
</script>

<template>
    <div class="space-y-4">
        <InputText
            v-model="idCardType"
            label="Típusa"
            :name="`${props.person}.idCardType`"
        />
        <InputText
            v-model="idCardNumber"
            label="Száma"
            :name="`${props.person}.idCardNumber`"
        />
        <InputText
            v-model="idCardExpiration"
            label="Érvényessége"
            :name="`${props.person}.idCardExpiration`"
        />
        <InputText
            v-model="taxIdentificationNumber"
            label="Adóazonosító jel"
            :name="`${props.person}.taxIdentificationNumber`"
        />
    </div>
</template>
