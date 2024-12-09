<!-- 
  EGYEBEK
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
const { subjectProperty } = storeToRefs(contractStore);
// const { removeQuestion, getQuestion, updateQuestions } = contractStore;
</script>

<template>
  <section class="max-w-2xl mx-auto">

    <!-- 1/9. Kisállat -->
    <QuestionBlock 
      title="Kisállatot tarthat a bérlő?"
      placement="1/9."  
    >
      <InputRadioBool
        v-model="subjectProperty.petsAllowed"
        name="subjectProperty.petsAllowed"
        label="igen"
        @update:model-value="subjectProperty.petsNotAllowed = false"
      />
      <InputRadioBool
        v-model="subjectProperty.petsNotAllowed"
        name="subjectProperty.petsNotAllowed"
        label="nem"
        @update:model-value="subjectProperty.petsAllowed = false"
      />
    </QuestionBlock>
    
    <!-- 2/9. Dohányzás -->
    <QuestionBlock 
      title="Dohányzás megengedett?"
      placement="2/9."  
    >
      <InputRadioBool
        v-model="subjectProperty.smokingPermitted"
        name="subjectProperty.smokingPermitted"
        label="igen"
        @update:model-value="subjectProperty.smokingNotPermitted = false"
      />
      <InputRadioBool
        v-model="subjectProperty.smokingNotPermitted"
        name="subjectProperty.smokingNotPermitted"
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
        v-model="subjectProperty.independentHouse"
        name="subjectProperty.independentHouse"
        label="igen"
        @update:model-value="subjectProperty.condominiumApartment = false"
      />
      <InputRadioBool
        v-model="subjectProperty.condominiumApartment"
        name="subjectProperty.condominiumApartment"
        label="nem"
        @update:model-value="subjectProperty.independentHouse = false"
      />
    </QuestionBlock>

    <!-- 4/9. Bérlő bejelentése bérleménybe -->
    <QuestionBlock 
      title="Bérlő bejelentheti a Bérleményt?"
      placement="4/9."  
    >
      <InputRadioBool
        v-model="subjectProperty.addressCardPermitted"
        name="subjectProperty.addressCardPermitted"
        label="Igen, állandó lakcímként és tartózkodási helyként is"
        @update:model-value="() => {
          subjectProperty.tempAddressCardPermitted = false;
          subjectProperty.addressCardNotPermitted = false;
        }"
      />
      <InputRadioBool
        v-model="subjectProperty.tempAddressCardPermitted"
        name="subjectProperty.tempAddressCardPermitted"
        label="Igen, de csak tartózkodási helyként."
        @update:model-value="() => {
          subjectProperty.addressCardPermitted = false;
          subjectProperty.addressCardNotPermitted = false;
        }"
      />
      <InputRadioBool
        v-model="subjectProperty.addressCardNotPermitted"
        name="subjectProperty.addressCardNotPermitted"
        label="Nem szeretném, hogy Bérlő bejelentse a Bérleményt."
        @update:model-value="() => {
          subjectProperty.addressCardPermitted = false;
          subjectProperty.tempAddressCardPermitted = false;
        }"
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
  </section>
</template>
