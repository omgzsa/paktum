<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

const kozteruletek = ref([
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
  'sziget'
]);

const streetName = ref('');
const houseNumber = ref('');
const building = ref('');
const staircase = ref('');
const floor = ref('');
const door = ref('');
const kozteruletJellege = ref<string>(kozteruletek.value[0]);

const contractStore = useContractStore();
const { subjectProperty } = storeToRefs(contractStore);
const { getQuestion, addQuestion } = contractStore;

// const createValue = (questionId: number) => computed({
//   get: () => getQuestion(questionId)?.optionId,
//   set: (newOptionId) => {
//     updateQuestions(newOptionId, questionId);
//   },
// });

const updateQuestions = (optionId: string, questionId: number, optionParams?: string | number) => {
  const stringParam = JSON.stringify(optionParams) || '';

  if (optionParams) {
    addQuestion(questionId, optionId, [
      {
        optionParameterId: 0,
        parameter: stringParam,
      },
    ]);
    return;
  }

  addQuestion(questionId, optionId, []);
};

const concatAddress = computed(() => {
  const street = `${streetName.value} ${kozteruletJellege.value} `;
  const houseN = `${houseNumber.value}., `;
  const buildingN = building.value ? `${building.value}. épület, ` : '';
  const staircaseN = staircase.value ? `${staircase.value}. lépcsőház, ` : '';
  const floorN = floor.value ? `${floor.value}.em./` : '';
  const doorN = door.value ? `${door.value}.a.` : '';


  // filter values that are not empty
  const address = [street, houseN, buildingN, staircaseN, floorN, doorN].filter((value) => value !== '').join('');

  return address;
});

watch(concatAddress, (newValue) => {
  subjectProperty.value.address = newValue;
});
</script>

<template>
  <div class="space-y-4">
    <QuestionBlock
      title="Bérlemény adatai"
      sub-text=""
      placement="1/3."
    >
      <InputText
        v-model="subjectProperty.country"
        label="Ország"
        name="subjectProperty.country"
      />
      <InputText
        v-model="subjectProperty.zipCode"
        label="Irányítószám"
        name="subjectProperty.zipCode"
      />
      <InputText
        v-model="subjectProperty.city"
        label="Település"
        name="subjectProperty.city"
      />
      <InputText
        v-model="streetName"
        label="Közterület neve"
        name="subjectProperty.streetName"
      />
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputSelect
          v-model="kozteruletJellege"
          label="Közterület jellege"
          :options="kozteruletek"
          name="subjectProperty.streetType"
        />
        <InputText
          v-model="houseNumber"
          label="Házszám"
          name="subjectProperty.houseNumber"
        />
        <InputText
          v-model="building"
          label="Épület"
          name="subjectProperty.building"
        />
      </div>
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputText
          v-model="staircase"
          label="Lépcsőház"
          name="subjectProperty.staircase"
        />
        <InputText
          v-model="floor"
          label="Emelet"
          name="subjectProperty.floor"
        />
        <InputText
          v-model="door"
          label="Ajtó"
          name="subjectProperty.door"
        />
      </div>
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputText
          v-model="subjectProperty.parcelNumber"
          label="Helyrajzi szám"
          name="subjectProperty.parcelNumber"
        />
        <InputText
          v-model="subjectProperty.size"
          type="number"
          label="Alapterület"
          label-end="m2"
          placeholder="min. 10"
          name="subjectProperty.size"
        />
      </div>
    </QuestionBlock>
  </div>
</template>
