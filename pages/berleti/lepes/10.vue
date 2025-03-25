<!--
  10. EGYEBEK
-->
<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { useContractStore } from '@/stores/contract'

definePageMeta({
    layout: 'contract',
})

// Constants
// const PERCENTAGE_MIN = 0
const PERCENTAGE_MAX = 100
const DEBOUNCE_DELAY = 500

const contractStore = useContractStore()
const {
    subjectProperty,
    energeticCertificateRequired,
    energeticCertificateNotRequired,
    damageReport,
    damageReportWithPhotoAndVideo,
    damageReportWithPhotoAndVideoAndProtocol,
    publicDocument,
    contractConfirmationDays,
    contractReConfirmationDays,
    notarialDocumentCostForOwner,
    notarialDocumentCostForRenter,
    eSignature,
    noSignature,
} = storeToRefs(contractStore)
const { updateNotarialCosts } = contractStore

// 1.9 - Kisállat tartható
const handlePetAllowed = (type: 'yes' | 'no') => {
    subjectProperty.value.petsAllowed = false
    subjectProperty.value.petsNotAllowed = false

    if (type === 'yes') subjectProperty.value.petsAllowed = true
    if (type === 'no') subjectProperty.value.petsNotAllowed = true
}

// 2.9 - Dohányzás engedélyezett
const handleSmokingPermission = (type: 'yes' | 'no') => {
    subjectProperty.value.smokingPermitted = false
    subjectProperty.value.smokingNotPermitted = false

    if (type === 'yes') subjectProperty.value.smokingPermitted = true
    if (type === 'no') subjectProperty.value.smokingNotPermitted = true
}

// 3.9 - Önálló lakóépület
const handleCertificationRequired = (type: 'yes' | 'no') => {
    energeticCertificateRequired.value = false
    energeticCertificateNotRequired.value = false

    if (type === 'yes') energeticCertificateRequired.value = true
    if (type === 'no') energeticCertificateNotRequired.value = true
}

// 4.9 - Bérlő bejelentjeti a bérleményt
const handleAddressCardPermission = (
    type:
        | 'addressCardPermitted'
        | 'tempAddressCardPermitted'
        | 'addressCardNotPermitted',
) => {
    subjectProperty.value.addressCardPermitted = false
    subjectProperty.value.tempAddressCardPermitted = false
    subjectProperty.value.addressCardNotPermitted = false

    subjectProperty.value[type] = true
}
// 6.9 - Hiba, kár rögzítése
// 6.9.1 - Hiba, kár rögzítése jegyzőkönyvvel
const damageReportWithProtocol = useState(
    'damage-report-with-protocol',
    () => false,
)
const protocolLabel = 'Kárfelvételi jegyzőkönyv minta'
const handleDamageReport = (type: 'photo' | 'photo-video') => {
    toggleVisibility(damageReportWithProtocol)

    damageReportWithPhotoAndVideo.value = false
    damageReportWithPhotoAndVideoAndProtocol.value = false

    if (type === 'photo') {
        damageReportWithPhotoAndVideo.value = true
        damageReport.value = false
    } else {
        damageReportWithPhotoAndVideoAndProtocol.value = false
    }
}

// 7.9 - Közokiratba foglalás
const anyDocumentSelected = computed(() => {
    return (
        publicDocument.value.movingOut || publicDocument.value.paymentObligation
    )
})
const servicePresumption = useState('service-presumption', () => false)
watch(anyDocumentSelected, () => {
    if (!anyDocumentSelected.value) {
        publicDocument.value.servicePresumption = false
    }
})
watch(
    () => publicDocument.value.servicePresumption,
    () => {
        if (publicDocument.value.servicePresumption) {
            servicePresumption.value = true
        } else {
            servicePresumption.value = false
        }
    },
)

// 7.9.1 - Közokirat - napja, megismétlése és költsége
// Computed to handle v-model binding
const ownerCost = computed({
    get: () => notarialDocumentCostForOwner.value,
    set: (value) => handleOwnerCostInput(value),
})
const renterCost = computed({
    get: () => notarialDocumentCostForRenter.value,
    set: (value) => handleRenterCostInput(value),
})

// validate % share input between 0,1 - 99,9
const validateInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value

    // Remove non-numeric characters except decimal point
    value = value.replace(/[^0-9.]/g, '')

    // Ensure only one decimal point
    const decimalParts = value.split('.')
    if (decimalParts.length > 2) {
        value = `${decimalParts[0]}.${decimalParts[1]}`
    }

    // Limit to one decimal place
    if (decimalParts.length === 2 && decimalParts[1].length > 1) {
        value = `${decimalParts[0]}.${decimalParts[1].slice(0, 1)}`
    }

    // Truncate to max 99.9
    const numValue = parseFloat(value)
    if (numValue > PERCENTAGE_MAX - 0.1) {
        value = `${PERCENTAGE_MAX - 0.1}`
    }

    // Update the input value if it has changed
    if (value !== input.value) {
        input.value = value
    }
}

// debounced input handlers
const handleOwnerCostInput = useDebounceFn(
    (value: number | string | Date | undefined) => {
        updateNotarialCosts('owner', Number(value))
    },
    DEBOUNCE_DELAY,
)
const handleRenterCostInput = useDebounceFn(
    (value: number | string | Date | undefined) => {
        updateNotarialCosts('renter', Number(value))
    },
    DEBOUNCE_DELAY,
)

// 8.9 - Bérlemény visszaadása
const handlePropertyStateOnReturn = (
    type: 'propertyEmptied' | 'propertyCleaned' | 'propertyEmptiedAndCleaned',
) => {
    subjectProperty.value.propertyEmptied = false
    subjectProperty.value.propertyCleaned = false
    subjectProperty.value.propertyEmptiedAndCleaned = false

    subjectProperty.value[type] = true
}

// 9.9 - Aláírás típusa
const handleSignatureType = (type: 'e-signature' | 'no-signature') => {
    eSignature.value = false
    noSignature.value = false

    if (type === 'e-signature') eSignature.value = true
    if (type === 'no-signature') noSignature.value = true
}
</script>

<template>
    <section class="max-w-2xl mx-auto">
        <!-- 1/9. Kisállat -->
        <QuestionBlock title="Kisállatot tarthat a bérlő?" placement="1/9.">
            <InputRadioBool
                v-model="subjectProperty.petsAllowed"
                name="subjectProperty.petsAllowed"
                group-value="petAllowed"
                label="igen"
                @update:model-value="handlePetAllowed('yes')"
            />
            <InputRadioBool
                v-model="subjectProperty.petsNotAllowed"
                name="subjectProperty.petsNotAllowed"
                group-value="petAllowed"
                label="nem"
                @update:model-value="handlePetAllowed('no')"
            />
        </QuestionBlock>

        <!-- 2/9. Dohányzás -->
        <QuestionBlock title="Dohányzás megengedett?" placement="2/9.">
            <InputRadioBool
                v-model="subjectProperty.smokingPermitted"
                name="subjectProperty.smokingPermitted"
                group-value="smokingPermission"
                label="igen"
                @update:model-value="
                    subjectProperty.smokingNotPermitted = false
                "
            />
            <InputRadioBool
                v-model="subjectProperty.smokingNotPermitted"
                name="subjectProperty.smokingNotPermitted"
                group-value="smokingPermission"
                label="nem"
                @update:model-value="subjectProperty.smokingPermitted = false"
            />
        </QuestionBlock>

        <!-- 3/9. Önálló, 50m2-nél kisebb -->
        <QuestionBlock
            title="A Bérlemény önálló, más épülethez nem csatlakozó, 50 m2-nél kisebb hasznos alapterületű épület?"
            placement="3/9."
        >
            <InputRadioBool
                v-model="energeticCertificateRequired"
                name="energeticCertificateRequired"
                group-value="certificationRequired"
                label="igen"
                @update:model-value="energeticCertificateNotRequired = false"
            />
            <InputRadioBool
                v-model="energeticCertificateNotRequired"
                name="energeticCertificateNotRequired"
                group-value="certificationRequired"
                label="nem"
                @update:model-value="energeticCertificateRequired = false"
            />
        </QuestionBlock>

        <!-- 4/9. Bérlő bejelentése bérleménybe -->
        <QuestionBlock
            title="Bérlő bejelentheti a Bérleményt?"
            placement="4/9."
        >
            <InputRadioBool
                v-model="subjectProperty.addressCardPermitted"
                group-value="addressCardPermission"
                name="subjectProperty.addressCardPermitted"
                label="Igen, állandó lakcímként és tartózkodási helyként is"
                @update:model-value="
                    handleAddressCardPermission('addressCardPermitted')
                "
            />
            <InputRadioBool
                v-model="subjectProperty.tempAddressCardPermitted"
                group-value="addressCardPermission"
                name="subjectProperty.tempAddressCardPermitted"
                label="Igen, de csak tartózkodási helyként."
                @update:model-value="
                    handleAddressCardPermission('tempAddressCardPermitted')
                "
            />
            <InputRadioBool
                v-model="subjectProperty.addressCardNotPermitted"
                group-value="addressCardPermission"
                name="subjectProperty.addressCardNotPermitted"
                label="Nem szeretném, hogy Bérlő bejelentse a Bérleményt."
                @update:model-value="
                    handleAddressCardPermission('addressCardNotPermitted')
                "
            />
        </QuestionBlock>

        <!-- 5/9. - Évente hány ellenőrzés -->
        <QuestionBlock
            title="A Bérbeadó évente hány alkalommal ellenőrizheti a Bérlemény használatát?"
            placement="5/9."
        >
            <div class="items-center space-y-4 sm:space-y-0 sm:flex sm:gap-6">
                <InputText
                    v-model="subjectProperty.annualInspectionDays"
                    type="number"
                    label="Évi"
                    label-end="alkalommal."
                    :step="1"
                    :min="1"
                    :max="365"
                    name="subjectProperty.annualInspectionDays"
                    class="w-full xs:w-64"
                />
                <QuestionHelp
                    icon-name="heroicons:information-circle-16-solid"
                    icon-size="20"
                    class="mb-2"
                >
                    A mezőbe min. 1 alkalmat, vagy többet írj.
                </QuestionHelp>
            </div>
        </QuestionBlock>

        <!-- 6/9. - Hiba, kár rögzítése -->
        <QuestionBlock
            title="Ha a Bérbeadó ellenőrzéskor hibát vagy kárt észlel, hogyan köteles azt rögzíteni?"
            placement="6/9."
            :class="{ 'border-b-0 -mb-2 sm:-mb-4': damageReportWithProtocol }"
        >
            <InputRadioBool
                v-model="damageReportWithPhotoAndVideo"
                name="damageReportWithPhotoAndVideo"
                group-value="damageReport"
                label="fénykép vagy videó"
                @update:model-value="handleDamageReport('photo')"
            />
            <InputRadioBool
                v-model="damageReportWithPhotoAndVideoAndProtocol"
                name="damageReportWithPhotoAndVideoAndProtocol"
                group-value="damageReport"
                label="fénykép vagy videó és jegyzőkönyv"
                @update:model-value="handleDamageReport('photo-video')"
            />
        </QuestionBlock>

        <!-- 6.9.1 - Melléklet vásárlás: jegyzőkönyv minta -->
        <TheTransition v-model="damageReportWithProtocol">
            <QuestionBlock
                title="Melléklet vásárlási lehetőség"
                bordered
                price="2.500Ft"
            >
                <template #hint>
                    <AppTooltip
                        class="ml-auto -mt-2 -mb-2 sm:-mt-2 lg:-mt-4"
                        :width="300"
                        label="Mire jó ez a melléklet?"
                    >
                        <template #content>
                            <p
                                class="text-xs font-normal tracking-wide text-neutral-100"
                            >
                                A kárfelvételi jegyzőkönyvvel a helyszínen tudod
                                rögzíteni a káreseményt. A jegyzőkönyv később
                                egy esetleges bírósági eljárás során
                                bizonyítékul szolgálhat.<br />
                                a Felek közös nyilatkozatai:<br />
                                - a Bérlő, a Bérbeadó és a Bérlemény adataival
                                automatikusan ki van töltve kézírással kell
                                kitölteni (kötelezően):<br />
                                - a káreset időpontját, helyét, egyéb
                                körülményeinek leírását vétkesnek mutatkozó
                                személyek adatait<br />
                                - le kell tanúzni
                            </p>
                        </template>
                    </AppTooltip>
                </template>
                <InputToggle
                    v-model="damageReport"
                    :label="protocolLabel"
                    name="damageReport"
                />
            </QuestionBlock>
        </TheTransition>

        <!-- 7/9 - Közokiratba foglalás -->
        <QuestionBlock
            title="A Bérlő köteles-e közokiratba foglaltatni az alábbiakat?"
            placement="7/9."
            :class="{ 'border-b-0 -mb-2 sm:-mb-4': servicePresumption }"
        >
            <InputChboxPrice
                v-model="publicDocument.movingOut"
                name="publicDocument.movingOut"
                label="a kiköltözést"
            />
            <InputChboxPrice
                v-model="publicDocument.paymentObligation"
                name="publicDocument.paymentObligation"
                label="a fizetési kötelezettségeket"
            />
            <TheTransition v-model="anyDocumentSelected">
                <InputChboxPrice
                    v-model="publicDocument.servicePresumption"
                    name="publicDocument.servicePresumption"
                    label="a közokirati felmondásra vonatkozó kézbesítés vélelmet"
                />
            </TheTransition>
        </QuestionBlock>

        <!-- 7/9.1 - Közokirat - napja, megismétlése és költsége -->
        <TheTransition v-model="servicePresumption">
            <QuestionMultiple bordered>
                <QuestionItem
                    title="A szerződés aláírásától hány napon belül kell közokiratba foglaltatnia?"
                >
                    <InputText
                        v-model="contractConfirmationDays"
                        type="number"
                        label-end="nap"
                        :step="1"
                        :min="1"
                        :max="365"
                        name="contractConfirmationDays"
                        class="w-full xs:w-32"
                    />
                </QuestionItem>
                <QuestionItem
                    title="Ha a Bérbeadó kifogásolja a közokirat tartalmát, e kifogástól hány napon belül kell megismételni a közokiratba-foglalást?"
                >
                    <InputText
                        v-model="contractReConfirmationDays"
                        type="number"
                        label-end="nap"
                        :step="1"
                        :min="1"
                        :max="365"
                        name="contractReConfirmationDays"
                        class="w-full xs:w-32"
                    />
                </QuestionItem>
                <QuestionItem
                    title="Ki viseli a közokiratba-foglalás költségeit?"
                >
                    <InputRadioBase
                        v-model="publicDocument.paidBy"
                        option-id="renter"
                        name="publicDocument.paidBy"
                        label="Bérlő"
                    />
                    <InputRadioBase
                        v-model="publicDocument.paidBy"
                        option-id="owner"
                        name="publicDocument.paidBy"
                        label="Bérbeadó"
                    />
                    <div
                        class="space-y-5 xs:space-y-0 xs:gap-4 xs:flex xs:items-start xs:justify-between"
                    >
                        <InputRadioBase
                            v-model="publicDocument.paidBy"
                            option-id="both"
                            name="publicDocument.paidBy"
                            label="Bérlő és Bérbeadó megosztva"
                        />
                        <div class="space-y-2">
                            <InputText
                                v-model="ownerCost"
                                type="number"
                                label="Bérlő"
                                label-end="%"
                                :step="0.1"
                                :min="0"
                                :max="100"
                                name="notarialDocumentCostForOwner"
                                class="w-full"
                                :is-disabled="publicDocument.paidBy !== 'both'"
                                @update:model-value="handleOwnerCostInput"
                                @input="(e: Event) => validateInput(e)"
                            />
                            <InputText
                                v-model="renterCost"
                                type="number"
                                label="Bérbeadó"
                                label-end="%"
                                :step="0.1"
                                :min="0"
                                :max="100"
                                name="notarialDocumentCostForRenter"
                                class="w-full"
                                :is-disabled="publicDocument.paidBy !== 'both'"
                                @update:model-value="handleRenterCostInput"
                                @input="(e: Event) => validateInput(e)"
                            />
                        </div>
                    </div>
                </QuestionItem>
            </QuestionMultiple>
        </TheTransition>

        <!-- 8/9 - Bérlemény visszaadása -->
        <QuestionBlock
            title="A bérlet megszűnését követően hogyan kell visszaadnia a Bérlőnek a Bérleményt?"
            placement="8/9."
        >
            <InputRadioBool
                v-model="subjectProperty.propertyEmptied"
                name="subjectProperty.propertyEmptied"
                group-value="propertyStateOnReturn"
                label="ingóságaitól kiürítve"
                @update:model-value="
                    handlePropertyStateOnReturn('propertyEmptied')
                "
            />
            <InputRadioBool
                v-model="subjectProperty.propertyCleaned"
                name="subjectProperty.propertyCleaned"
                group-value="propertyStateOnReturn"
                label="kitakarítva"
                @update:model-value="
                    handlePropertyStateOnReturn('propertyCleaned')
                "
            />
            <InputRadioBool
                v-model="subjectProperty.propertyEmptiedAndCleaned"
                name="subjectProperty.propertyEmptiedAndCleaned"
                group-value="propertyStateOnReturn"
                label="mindkettő"
                @update:model-value="
                    handlePropertyStateOnReturn('propertyEmptiedAndCleaned')
                "
            />
        </QuestionBlock>

        <!-- 9/9 - Szerződés (papír/avdh) -->
        <QuestionBlock
            title="Papír alapon két tanúval, vagy nyomtatás nélkül elektronikusan AVDH-val írnátok alá
      a szerződést?"
            placement="9/9."
        >
            <InputRadioBool
                v-model="noSignature"
                name="noSignature"
                group-value="signatureType"
                label="két tanúval papír alapon"
                @update:model-value="handleSignatureType('no-signature')"
            />
            <InputRadioBool
                v-model="eSignature"
                name="eSignature"
                group-value="signatureType"
                label="AVDH-val elektronikusan, nyomtatás nélkül"
                @update:model-value="handleSignatureType('e-signature')"
            />
        </QuestionBlock>
    </section>
</template>
