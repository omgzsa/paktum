<!-- 
  IDŐTARTAM
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
    layout: 'contract',
});

const setFieldValue = inject('setFieldValue') as (
    field: string,
    value: string | number | boolean,
) => void;

const contractStore = useContractStore();
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
} = storeToRefs(contractStore);
const { removeQuestion, getQuestion, updateQuestions } = contractStore;

const createValue = (questionId: number) =>
    computed({
        get: () => getQuestion(questionId)?.optionId,
        set: (newOptionId) => {
            updateQuestions(newOptionId, questionId);
        },
    });

// 3/6 - Bútorozottság, komfortfokozat
// 3/6.1 - Bútorozottság a bérlő által
const isFurnishedByOwner = useState('is-furnished-by-owner', () => false);
const Q1Value = createValue(33);
watch(
    () => subjectProperty.value.propertyFurnituredByOwner,
    (newValue) => {
        if (newValue) {
            removeQuestion(33);
            setFieldValue('Q1', ''); /// is this a must?
            isFurnishedByOwner.value = false;
        } else {
            isFurnishedByOwner.value = true;
        }
    },
);

// 4/6 - A bérlet ideje
// 4/6.1 - Határozott idő
// 4/6.2 - Határozatlan idő
const isDefiniteContract = useState('is-definite-contract', () => true);
const isUndefiniteContract = useState('is-undefinite-contract', () => false);
watch(
    () => definiteContractPeriod.value,
    (newValue) => {
        if (newValue) {
            isDefiniteContract.value = true;
            isUndefiniteContract.value = false;
        } else {
            isDefiniteContract.value = false;
            isUndefiniteContract.value = true;
        }
    },
);
// }
</script>

<template>
    <section class="max-w-2xl mx-auto">
        <!-- 1/6. - Birtokbaadás napja -->
        <QuestionBlock
            title="A birtokbaadás napja"
            placement="1/6."
        >
            <div class="inline-flex flex-col items-center">
                <p class="text-sm text-neutral-500">Válassz dátumot</p>
                <InputDatePicker
                    v-model="propertyUsageStartDate"
                    name="propertyUsageStartDate"
                />
            </div>
        </QuestionBlock>

        <!-- 2/6 - Átadott kulcsok száma -->
        <QuestionBlock
            title="Átadott kulcsok száma"
            placement="2/6."
        >
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
                label="a Bérbeadó a komfortfokozatnak megfelelő berendezésekkel adja át."
                @update:model-value="
                    subjectProperty.propertyFurnituredByRenter = false
                "
            />
            <InputRadioBool
                v-model="subjectProperty.propertyFurnituredByRenter"
                name="subjectProperty.propertyFurnituredByRenter"
                label="a Bérlő látja el a komfortfokozatnak megfelelő berendezésekkel."
                @update:model-value="
                    subjectProperty.propertyFurnituredByOwner = false
                "
            />
        </QuestionBlock>

        <!-- 3/6.1 - Indexálás éves értesítő -->
        <TheTransition v-model="isFurnishedByOwner">
            <QuestionMultiple
                title="A berendezés igazolt költségeit"
                bordered
            >
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
                @update:model-value="undefiniteContractPeriod = false"
            />
            <InputRadioBool
                v-model="undefiniteContractPeriod"
                name="undefiniteContractPeriod"
                label="határozatlan idő."
                @update:model-value="definiteContractPeriod = false"
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
                        label="igen"
                        @update:model-value="
                            contractTerminationNotPossibleBeforeEndDate = false
                        "
                    />
                    <InputRadioBool
                        v-model="contractTerminationNotPossibleBeforeEndDate"
                        name="contractTerminationNotPossibleBeforeEndDate"
                        label="nem"
                        @update:model-value="
                            contractTerminationPossibleBeforeEndDate = false
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
                        label="igen"
                        @update:model-value="noPaymentObligation = false"
                    />
                    <InputRadioBool
                        v-model="noPaymentObligation"
                        name="noPaymentObligation"
                        label="nem"
                        @update:model-value="paymentObligation = false"
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
            # mellékletek Bérbeadónak
        </QuestionBlock>
        <!-- 6/6. - Melléklet vásárlási lehetőség Bérlőnek -->
        <QuestionBlock
            title="Melléklet vásárlási lehetőség Bérlőnek"
            placement="6/6."
        >
            # mellékletek Bérlőnek
        </QuestionBlock>
    </section>
</template>
