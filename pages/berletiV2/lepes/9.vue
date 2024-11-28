<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

// const setFieldValue = inject('setFieldValue') as (field: string, value: string | number | boolean) => void;

const contractStore = useContractStore();
const { propertyUsageStartDate, subjectProperty } = storeToRefs(contractStore);
const { removeQuestion, getQuestion, updateQuestions } = contractStore;

const createValue = (questionId: number) => computed({
  get: () => getQuestion(questionId)?.optionId,
  set: (newOptionId) => {
    updateQuestions(newOptionId, questionId);
  },
});

// 3/6 - Bútorozottság, komfortfokozat
// 3/6.1 - Bútorozottság a bérlő által
const isFurnishedByOwner = useState('is-furnished-by-owner', () => false);
const Q1Value = createValue(33);
watch(() => subjectProperty.value.propertyFurnituredByOwner, (newValue) => {
  if(newValue) {
    isFurnishedByOwner.value = false;
    removeQuestion(33);
  } else {
    isFurnishedByOwner.value = true;
  }
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/6. - Birtokbaadás napja -->
    <QuestionBlock
      title="A birtokbaadás napja"
      placement="1/6."
    >
      <div class="inline-flex flex-col items-center">
        <p class="text-sm text-gray-500">Válassz dátumot</p>
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
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              A bérbeadó a bérleti díjat a hozzákötött index változásának mértékével, a szerződés írásbeli módosítása nélkül évente egyoldalúan módosíthatja. Ha indexálást választasz, minden év január elsejével módosul a bérleti díj.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBool
        v-model="subjectProperty.propertyFurnituredByOwner"
        is-default
        name="subjectProperty.propertyFurnituredByOwner"
        label="a Bérbeadó a komfortfokozatnak megfelelő berendezésekkel adja át."
        @update:model-value="subjectProperty.notFurnishedByOwner = false"
      />
      <InputRadioBool
        v-model="subjectProperty.notFurnishedByOwner"
        name="subjectProperty.notFurnishedByOwner"
        label="a Bérlő látja el a komfortfokozatnak megfelelő berendezésekkel."
        @update:model-value="subjectProperty.propertyFurnituredByOwner = false"
      />
    </QuestionBlock>

    <!-- 3/6.1 - Indexálás éves értesítő -->
    <TheTransition v-model="isFurnishedByOwner">
      <QuestionMultiple
        title="A berendezés igazolt költségeit"
        :bordered="true"
      >
        <QuestionItem
          title="A berendezés igazolt költségeit"
        >
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
            <p class="text-sm text-gray-500">Válassz dátumot</p>
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
    >
      # undefiniteContractPeriod
    </QuestionBlock>
  </section>
</template>
