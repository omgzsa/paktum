<!--
  11. FELEK
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract'

definePageMeta({
    layout: 'contract',
})

const contractStore = useContractStore()
const {
    owners,
    renters,
    subjectProperty,
    isDifferentMailingAddressForOwner,
    isDifferentMailingAddressForRenter,
} = storeToRefs(contractStore)
// const { updateNotarialCosts } = contractStore;

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

// 1/4. - Bérbeadó adatai (levelezési cím)
const mailingAddressDiffersForOwner = useState(
    'mailing-address-differs-for-owner',
    () => false,
)
const ownersAddress = computed(() => formatAddress(owners.value[0]))
watch(ownersAddress, (newValue) => {
    owners.value[0].address = newValue
})
const ownersMailingAddress = computed(() =>
    formatMailingAddress(owners.value[0]),
)
watch(ownersMailingAddress, (newValue) => {
    owners.value[0].mailingAddress = newValue
})
watch(isDifferentMailingAddressForOwner, () => {
    mailingAddressDiffersForOwner.value =
        isDifferentMailingAddressForOwner.value
})

// 2/4. - Bérbeadó jogalapja a bérbeadásra

// 3/4. - Bérbeadó személyes/meghatalmazott

// 4/4. - Bérlő adatai (levelezési cím)
const mailingAddressDiffersForRenter = useState(
    'mailing-address-differs-for-renter',
    () => false,
)
watch(isDifferentMailingAddressForRenter, () => {
    mailingAddressDiffersForRenter.value =
        isDifferentMailingAddressForRenter.value
})
</script>

<template>
    <section class="max-w-2xl mx-auto">
        <!-- 1/4. - Bérbeadó adatai  -->
        <QuestionBlock title="Bérbeadó adatai" placement="1/4.">
            <QuestionHelp
                icon-name="heroicons:information-circle-16-solid"
                icon-size="20"
                class="my-8 xs:my-0 xs:mt-2 xs:mb-6"
            >
                <span>
                    <strong class="inline">Tájékoztatás!</strong> Önállóan,
                    saját nevükben csak nagykorú és cselekvőképes magánszemélyek
                    köthetnek érvényes szerződést.
                </span>
            </QuestionHelp>

            <InputBlockPersonal
                person="owners[0]"
                v-model:firstName="owners[0].firstName"
                v-model:lastName="owners[0].lastName"
                v-model:birthPlace="owners[0].birthPlace"
                v-model:birthDate="owners[0].birthDate"
                v-model:mothersName="owners[0].mothersName"
                v-model:nationality="owners[0].nationality"
            />

            <UDivider class="py-4" size="xs" label="Lakcím" />

            <InputBlockAddress
                person="owners[0]"
                v-model:country="owners[0].country"
                v-model:zipcode="owners[0].zipcode"
                v-model:city="owners[0].city"
                v-model:streetName="owners[0].streetName"
                v-model:publicAreaType="owners[0].publicAreaType"
                v-model:houseNumber="owners[0].houseNumber"
                v-model:building="owners[0].building"
                v-model:staircase="owners[0].staircase"
                v-model:floor="owners[0].floor"
                v-model:door="owners[0].door"
            />

            <UDivider class="py-4" size="xs" label="Levelezési cím" />

            <InputChboxPrice
                v-model="isDifferentMailingAddressForOwner"
                label="A levelezési cím eltér a lakcímtől."
                name="isDifferentMailingAddressForOwner"
            />

            <TheTransition v-model="mailingAddressDiffersForOwner">
                <InputBlockMailingAddress
                    person="owners[0]"
                    v-model:country="owners[0].mailingCountry"
                    v-model:zipcode="owners[0].mailingZipcode"
                    v-model:city="owners[0].mailingCity"
                    v-model:streetName="owners[0].mailingStreetName"
                    v-model:publicAreaType="owners[0].mailingPublicAreaType"
                    v-model:houseNumber="owners[0].mailingHouseNumber"
                    v-model:building="owners[0].mailingBuilding"
                    v-model:staircase="owners[0].mailingStaircase"
                    v-model:floor="owners[0].mailingFloor"
                    v-model:door="owners[0].mailingDoor"
                    class="pt-5"
                />
            </TheTransition>

            <UDivider class="py-4" size="xs" label="Azonosító okmány" />

            <InputBlockIdentity
                person="owners[0]"
                v-model:idCardType="owners[0].idCardType"
                v-model:idCardNumber="owners[0].idCardNumber"
                v-model:idCardExpiration="owners[0].idCardExpiration"
                v-model:taxIdentificationNumber="
                    owners[0].taxIdentificationNumber
                "
            />
        </QuestionBlock>

        <!-- 2/4. - Bérbeadó jogalapja a bérbeadásra -->
        <QuestionBlock
            title="Bérbeadó jogalapja a bérbeadásra"
            placement="2/4."
        >
            Bérbeadó jogalapja a bérbeadásra
        </QuestionBlock>

        <!-- 3/4. - Bérbeadó személyes/meghatalmazott -->
        <QuestionBlock
            title="A Bérbeadó személyesen jár el, vagy meghatalmazott útján?"
            placement="3/4."
        >
            Bérbeadó személyes/meghatalmazott
        </QuestionBlock>

        <!-- 4/4. - Bérlő adatai -->
        <QuestionBlock title="Bérlő adatai" placement="4/4.">
            <QuestionHelp
                icon-name="heroicons:information-circle-16-solid"
                icon-size="20"
                class="my-8 xs:my-0 xs:mt-2 xs:mb-6"
            >
                <span>
                    <strong class="inline">Tájékoztatás!</strong> Önállóan,
                    saját nevükben csak nagykorú és cselekvőképes magánszemélyek
                    köthetnek érvényes szerződést.
                </span>
            </QuestionHelp>

            <InputBlockPersonal
                person="renters[0]"
                v-model:firstName="renters[0].firstName"
                v-model:lastName="renters[0].lastName"
                v-model:birthPlace="renters[0].birthPlace"
                v-model:birthDate="renters[0].birthDate"
                v-model:mothersName="renters[0].mothersName"
                v-model:nationality="renters[0].nationality"
            />

            <UDivider class="py-4" size="xs" label="Lakcím" />

            <InputBlockAddress
                person="renters[0]"
                v-model:country="renters[0].country"
                v-model:zipcode="renters[0].zipcode"
                v-model:city="renters[0].city"
                v-model:streetName="renters[0].streetName"
                v-model:publicAreaType="renters[0].publicAreaType"
                v-model:houseNumber="renters[0].houseNumber"
                v-model:building="renters[0].building"
                v-model:staircase="renters[0].staircase"
                v-model:floor="renters[0].floor"
                v-model:door="renters[0].door"
            />

            <UDivider class="py-4" size="xs" label="Levelezési cím" />

            <InputChboxPrice
                v-model="isDifferentMailingAddressForRenter"
                label="A levelezési cím eltér a lakcímtől."
                name="isDifferentMailingAddressForRenter"
            />

            <TheTransition v-model="mailingAddressDiffersForRenter">
                <div class="pt-5 space-y-3">
                    <InputText
                        v-model="renters[0].mailingCountry"
                        label="Ország"
                        name="renters[0].mailingCountry"
                    />
                    <InputText
                        v-model="renters[0].mailingZipcode"
                        label="Irányítószám"
                        name="renters[0].mailingZipcode"
                    />
                    <InputText
                        v-model="renters[0].mailingCity"
                        label="Település"
                        name="renters[0].mailingCity"
                    />
                    <InputText
                        v-model="renters[0].mailingStreetName"
                        label="Közterület neve"
                        name="renters[0].mailingStreetName"
                    />
                    <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
                        <InputSelect
                            v-model="renters[0].mailingPublicAreaType"
                            label="Közterület jellege"
                            :options="publicAreaTypes"
                            name="renters[0].mailingPublicAreaType"
                        />
                        <InputText
                            v-model="renters[0].mailingHouseNumber"
                            label="Házszám"
                            name="renters[0].mailingHouseNumber"
                        />
                        <InputText
                            v-model="renters[0].mailingBuilding"
                            label="Épület"
                            name="renters[0].mailingBuilding"
                        />
                    </div>
                    <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
                        <InputText
                            v-model="renters[0].mailingStaircase"
                            label="Lépcsőház"
                            name="renters[0].mailingStaircase"
                        />
                        <InputText
                            v-model="renters[0].mailingFloor"
                            label="Emelet"
                            name="renters[0].mailingFloor"
                        />
                        <InputText
                            v-model="renters[0].mailingDoor"
                            label="Ajtó"
                            name="renters[0].mailingDoor"
                        />
                    </div>
                </div>
            </TheTransition>

            <UDivider class="py-4" size="xs" label="Azonosító okmány" />

            <InputBlockIdentity
                person="renters[0]"
                v-model:idCardType="renters[0].idCardType"
                v-model:idCardNumber="renters[0].idCardNumber"
                v-model:idCardExpiration="renters[0].idCardExpiration"
                v-model:taxIdentificationNumber="
                    renters[0].taxIdentificationNumber
                "
            />
        </QuestionBlock>
    </section>
</template>
