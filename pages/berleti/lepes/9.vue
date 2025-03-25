<!--
  9. IDŐTARTAM
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract'

definePageMeta({
    layout: 'contract',
})

const setFieldValue = inject('setFieldValue') as (
    field: string,
    value: string | number | boolean,
) => void

const contractStore = useContractStore()
const {
    propertyUsageStartDate,
    subjectProperty,
    definiteContractPeriod,
    undefiniteContractPeriod,
    contractStartDate,
    contractEndDate,
    contractTerminationPossibleBeforeEndDate,
    contractTerminationNotPossibleBeforeEndDate,
    contractTerminationDays,
    paymentObligation,
    noPaymentObligation,
    contractTerminationDayInMonth,
    attachment_NotificationOfModernizationWorks,
    attachment_PreTerminationWarningPayment,
    attachment_TerminationLatePayment,
    attachment_PreTerminationWarningOther,
    attachment_TerminationOtherRight,
    attachment_OrdenaryTerminationOwner,
    attachment_TerminationOtherBreachOfContract,
    attachment_TerminationHealthWarning,
    attachment_OrdenaryTerminationRenter,
    attachment_TerminationModernization,
    attachment_PreTerminationWarningOtherRight,
    attachment_TerminationPropertyConditionProblem,
} = storeToRefs(contractStore)
const { removeQuestion, getQuestion, updateQuestions } = contractStore

const createValue = (questionId: number) =>
    computed({
        get: () => getQuestion(questionId)?.optionId,
        set: (newOptionId) => {
            updateQuestions(newOptionId, questionId)
        },
    })

// 3/6 - Bútorozottság, komfortfokozat
// 3/6.1 - Bútorozottság a bérlő által
const isFurnishedByOwner = useState('is-furnished-by-owner', () => false)
const Q1Value = createValue(33)
const handlePersonFurnishedBy = (
    type: 'propertyFurnituredByOwner' | 'propertyFurnituredByRenter',
) => {
    toggleVisibility(isFurnishedByOwner)
    if (type === 'propertyFurnituredByOwner') {
        removeQuestion(33)
        setFieldValue('Q1', '') // must?
    }

    subjectProperty.value.propertyFurnituredByOwner = false
    subjectProperty.value.propertyFurnituredByRenter = false

    subjectProperty.value[type] = true
}

// 4/6 - A bérlet ideje
const isDefiniteContract = useState('is-definite-contract', () => true)
const isUndefiniteContract = useState('is-undefinite-contract', () => false)

// 4/6.1 - Határozott idő
const handleContractPeriodType = (type: 'definite' | 'undefinite') => {
    toggleVisibility(isDefiniteContract)
    toggleVisibility(isUndefiniteContract)

    definiteContractPeriod.value = false
    undefiniteContractPeriod.value = false

    if (type === 'definite') definiteContractPeriod.value = true
    if (type === 'undefinite') undefiniteContractPeriod.value = true
}

// 4/6/1.2 - Határozatlan idő
const handleContractTerminationPossibility = (type: 'yes' | 'no') => {
    contractTerminationPossibleBeforeEndDate.value = false
    contractTerminationNotPossibleBeforeEndDate.value = false

    if (type === 'yes') contractTerminationPossibleBeforeEndDate.value = true
    if (type === 'no') contractTerminationNotPossibleBeforeEndDate.value = true
}

// 4/6/1.4 - Teljes időtartamra járó bérleti díj
const handlePaymentObligationOnTermination = (type: 'yes' | 'no') => {
    paymentObligation.value = false
    noPaymentObligation.value = false

    if (type === 'yes') paymentObligation.value = true
    if (type === 'no') noPaymentObligation.value = true
}
</script>

<template>
    <section class="max-w-2xl mx-auto">
        <!-- 1/6. - Birtokbaadás napja -->
        <QuestionBlock title="A birtokbaadás napja" placement="1/6.">
            <div class="inline-flex flex-col items-center">
                <p class="text-sm text-neutral-500">Válassz dátumot</p>
                <InputDatePicker
                    v-model="propertyUsageStartDate"
                    name="propertyUsageStartDate"
                />
            </div>
        </QuestionBlock>

        <!-- 2/6 - Átadott kulcsok száma -->
        <QuestionBlock title="Átadott kulcsok száma" placement="2/6.">
            <InputText
                v-model="subjectProperty.numberOfKeys"
                type="number"
                label-end="db."
                :step="1"
                :min="0"
                name="subjectProperty.numberOfKeys"
                class="w-full xs:w-32"
            />
        </QuestionBlock>

        <!-- 3/6 - Bútorozottság, komfortfokozat -->
        <QuestionBlock
            title="A bérbeadó a komfortfokozatnak megfelelő berendezésekkel adja át a bérleményt a bérlőnek, vagy a bérlő látja el a bérleményt a komfortfokozatnak megfelelő berendezésekkel?"
            placement="3/6."
            :class="{ 'border-b-0 -mb-2 sm:-mb-4': isFurnishedByOwner }"
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
                            A bérbeadó a bérleti díjat a hozzákötött index
                            változásának mértékével, a szerződés írásbeli
                            módosítása nélkül évente egyoldalúan módosíthatja.
                            Ha indexálást választasz, minden év január elsejével
                            módosul a bérleti díj.
                        </p>
                    </template>
                </AppTooltip>
            </template>
            <InputRadioBool
                v-model="subjectProperty.propertyFurnituredByOwner"
                is-default
                name="subjectProperty.propertyFurnituredByOwner"
                group-value="furnituredBy"
                label="a Bérbeadó a komfortfokozatnak megfelelő berendezésekkel adja át."
                @update:model-value="
                    handlePersonFurnishedBy('propertyFurnituredByOwner')
                "
            />
            <InputRadioBool
                v-model="subjectProperty.propertyFurnituredByRenter"
                name="subjectProperty.propertyFurnituredByRenter"
                group-value="furnituredBy"
                label="a Bérlő látja el a komfortfokozatnak megfelelő berendezésekkel."
                @update:model-value="
                    handlePersonFurnishedBy('propertyFurnituredByRenter')
                "
            />
        </QuestionBlock>

        <!-- 3/6.1 - Indexálás éves értesítő -->
        <TheTransition v-model="isFurnishedByOwner">
            <QuestionMultiple title="A berendezés igazolt költségeit" bordered>
                <QuestionItem title="A berendezés igazolt költségeit">
                    <InputRadioBase
                        v-model="Q1Value"
                        option-id="Q1O1"
                        name="Q1"
                        label="a Bérbeadó megtéríti a Bérlőnek."
                    />
                    <InputRadioBase
                        v-model="Q1Value"
                        option-id="Q1O2"
                        name="Q1"
                        label="a Bérlő a bérleti díjba megtérülésig beszámíthatja."
                    />
                    <InputRadioBase
                        v-model="Q1Value"
                        option-id="Q1O3"
                        name="Q1"
                        label="a Bérlő viseli."
                    />
                </QuestionItem>
                <QuestionItem
                    title="Az igazolt költségek megfizetésének határideje"
                >
                    <div class="inline-flex flex-col items-center">
                        <p class="text-sm text-neutral-500">Válassz dátumot</p>
                        <InputDatePicker
                            v-model="propertyUsageStartDate"
                            name="propertyUsageStartDate"
                        />
                    </div>
                </QuestionItem>
            </QuestionMultiple>
        </TheTransition>

        <!-- 4/6 - A bérlet ideje -->
        <QuestionBlock
            title="A bérlet ideje"
            placement="4/6."
            :class="{
                'border-b-0 -mb-2 sm:-mb-4':
                    isDefiniteContract || isUndefiniteContract,
            }"
        >
            <InputRadioBool
                v-model="definiteContractPeriod"
                name="definiteContractPeriod"
                label="határozott idő."
                group-value="contractPeriodType"
                @update:model-value="handleContractPeriodType('definite')"
            />
            <InputRadioBool
                v-model="undefiniteContractPeriod"
                name="undefiniteContractPeriod"
                label="határozatlan idő."
                group-value="contractPeriodType"
                @update:model-value="handleContractPeriodType('undefinite')"
            />
        </QuestionBlock>

        <!-- 4/6.1 - Időtartam, lejárat, felmondás -->
        <TheTransition v-model="isDefiniteContract">
            <QuestionMultiple bordered>
                <!-- időtartam -->
                <QuestionItem title="A bérlet időtartama">
                    <div class="xs:flex">
                        <div class="flex items-center gap-2">
                            <div
                                class="xs:inline-flex xs:flex-col xs:items-center"
                            >
                                <p
                                    class="ml-3 text-sm text-neutral-500 xs:ml-0"
                                >
                                    Válassz dátumot
                                </p>
                                <InputDatePicker
                                    v-model="contractStartDate"
                                    name="contractStartDate"
                                />
                            </div>
                            <p>- tól</p>
                        </div>
                        <div
                            class="flex items-center gap-2 xs:ml-auto sm:ml-24"
                        >
                            <div
                                class="xs:inline-flex xs:flex-col xs:items-center"
                            >
                                <p
                                    class="ml-3 text-sm text-neutral-500 xs:ml-0"
                                >
                                    Válassz dátumot
                                </p>
                                <InputDatePicker
                                    v-model="contractEndDate"
                                    name="contractEndDate"
                                />
                            </div>
                            <p>- ig.</p>
                        </div>
                    </div>
                </QuestionItem>
                <!-- lejárat -->
                <QuestionItem
                    title="Határozott idő lejárta előtt felmondható-e?"
                >
                    <InputRadioBool
                        v-model="contractTerminationPossibleBeforeEndDate"
                        name="contractTerminationPossibleBeforeEndDate"
                        group-value="contractTerminationPossibilityBeforeDueDate"
                        label="igen"
                        @update:model-value="
                            handleContractTerminationPossibility('yes')
                        "
                    />
                    <InputRadioBool
                        v-model="contractTerminationNotPossibleBeforeEndDate"
                        name="contractTerminationNotPossibleBeforeEndDate"
                        group-value="contractTerminationPossibilityBeforeDueDate"
                        label="nem"
                        @update:model-value="
                            handleContractTerminationPossibility('no')
                        "
                    />
                </QuestionItem>
                <!-- felmondás -->
                <QuestionItem title="Felmondási idő">
                    <InputText
                        v-model="contractTerminationDays"
                        type="number"
                        label-end="nap"
                        :step="1"
                        :min="0"
                        name="contractTerminationDays"
                        class="w-full xs:w-32"
                    />
                </QuestionItem>
                <!-- teljes időtartamra járó bérleti díj -->
                <QuestionItem
                    title="A bérlő felmondása esetén a teljes időtartamra járó bérleti díjat meg kell-e fizetni?"
                >
                    <InputRadioBool
                        v-model="paymentObligation"
                        name="paymentObligation"
                        group-value="paymentObligationOnTermination"
                        label="igen"
                        @update:model-value="
                            handlePaymentObligationOnTermination('yes')
                        "
                    />
                    <InputRadioBool
                        v-model="noPaymentObligation"
                        name="noPaymentObligation"
                        group-value="paymentObligationOnTermination"
                        label="nem"
                        @update:model-value="
                            handlePaymentObligationOnTermination('no')
                        "
                    />
                </QuestionItem>
            </QuestionMultiple>
        </TheTransition>

        <!-- 4/6.2 - Határozatlan idő -->
        <TheTransition v-model="isUndefiniteContract">
            <QuestionMultiple bordered>
                <QuestionItem
                    title="A bérlet a hónap hanyadik napjáig mondható fel a következő hónap végére?"
                >
                    <InputText
                        v-model="contractTerminationDayInMonth"
                        type="number"
                        label-end=". nap a hónapban."
                        :step="1"
                        :min="1"
                        :max="31"
                        name="contractTerminationDayInMonth"
                        class="w-full xs:w-48"
                    />
                </QuestionItem>
                <QuestionItem title="Felmondási idő">
                    <div
                        class="items-center space-y-4 xs:space-y-0 xs:flex xs:gap-6"
                    >
                        <InputText
                            v-model="contractTerminationDays"
                            type="number"
                            label-end="nap"
                            :step="1"
                            :min="0"
                            name="contractTerminationDays"
                            class="w-full xs:w-32"
                        />
                        <QuestionHelp
                            icon-name="heroicons:information-circle-16-solid"
                            icon-size="20"
                            class="mb-2"
                        >
                            A mezőbe min. 30 napot, vagy többet írj.
                        </QuestionHelp>
                    </div>
                </QuestionItem>
            </QuestionMultiple>
        </TheTransition>

        <!-- 5/6. - Melléklet vásárlási lehetőség Bérbeadónak -->
        <QuestionBlock
            title="Melléklet vásárlási lehetőség Bérbeadónak"
            placement="5/6."
        >
            <InputBlockAnnex
                v-model="attachment_NotificationOfModernizationWorks"
                name="attachment_NotificationOfModernizationWorks"
                :price="500"
                tooltip-content="???"
                input-label="Értesítés korszerűsítési munkálatokról és azok várható időtartamáról"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_PreTerminationWarningPayment"
                name="attachment_PreTerminationWarningPayment"
                :price="2500"
                tooltip-content="???"
                input-label="Rendkívüli felmondás előtti felszólítás minta (fizetési késedelem esetén)"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_TerminationLatePayment"
                name="attachment_TerminationLatePayment"
                :price="2500"
                tooltip-content="???"
                input-label="Rendkívüli felmondás minta (fizetési késedelem esetén)"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_PreTerminationWarningOther"
                name="attachment_PreTerminationWarningOther"
                :price="2500"
                tooltip-content="???"
                input-label="Rendkívüli felmondás előtti felszólítás minta (egyéb szerződésszegés)"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_TerminationOtherRight"
                name="attachment_TerminationOtherRight"
                :price="2500"
                tooltip-content="???"
                input-label="Rendkívüli felmondás minta (egyéb szerződésszegés)"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_OrdenaryTerminationOwner"
                name="attachment_OrdenaryTerminationOwner"
                :price="2500"
                tooltip-content="???"
                input-label="Rendes felmondás minta"
                class="border-none"
            />
        </QuestionBlock>
        <!-- 6/6. - Melléklet vásárlási lehetőség Bérlőnek -->
        <QuestionBlock
            title="Melléklet vásárlási lehetőség Bérlőnek"
            placement="6/6."
        >
            <InputBlockAnnex
                v-model="attachment_TerminationOtherBreachOfContract"
                name="attachment_TerminationOtherBreachOfContract"
                :price="500"
                tooltip-content="???"
                input-label="Felszólítás minta arra az esetre, ha más joga miatt a Bérlő a Bérleményt nem használhatja"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_PreTerminationWarningOtherRight"
                name="attachment_PreTerminationWarningOtherRight"
                :price="2500"
                tooltip-content="???"
                input-label="Felmondás minta arra az esetre, ha más joga miatt a Bérlő a Bérleményt nem használhatja"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_TerminationHealthWarning"
                name="attachment_TerminationHealthWarning"
                :price="2500"
                tooltip-content="???"
                input-label="Felmondás minta arra az esetre, ha a Bérlemény olyan állapotban van, hogy a használata az egészséget veszélyezteti"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_OrdenaryTerminationRenter"
                name="attachment_OrdenaryTerminationRenter"
                :price="2500"
                tooltip-content="???"
                input-label="Rendes felmondás minta"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_TerminationModernization"
                name="attachment_TerminationModernization"
                :price="2500"
                tooltip-content="???"
                input-label="Felmondás minta a Bérlemény korszerűsítése esetén"
                class="pb-4"
            />
            <InputBlockAnnex
                v-model="attachment_TerminationPropertyConditionProblem"
                name="attachment_TerminationPropertyConditionProblem"
                :price="2500"
                tooltip-content="???"
                input-label="Felmondás minta a Bérlemény nem rendeltetésszerű állapota esetére"
                class="border-none"
            />
        </QuestionBlock>
    </section>
</template>
