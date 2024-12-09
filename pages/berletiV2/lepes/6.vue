<!-- 
  AZ INGATLAN
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

const contractStore = useContractStore();
const { 
  subjectProperty, 
  condominiumFoundingDocument, 
  orgRules, 
  houseRules 
} = storeToRefs(contractStore);

definePageMeta({
  layout: 'contract',
});

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
  'sziget'
]);

const concatAddress = computed(() => {
  const property = subjectProperty.value;

  const street = `${property.streetName} ${property.publicAreaType} `;
  const houseN = `${property.houseNumber}., `;
  const buildingN = property.building ? `${property.building}. épület, ` : '';
  const staircaseN = property.staircase ? `${property.staircase}. lépcsőház, ` : '';
  const floorN = property.floor ? `${property.floor}.em./` : '';
  const doorN = property.door ? `${property.door}.a.` : '';

  const address = [street, houseN, buildingN, staircaseN, floorN, doorN].filter((value) => value !== '').join('');

  return address;
});

const measure = 'm2';
const formattedMeasure = computed(() => {
  return {
    base: measure.slice(0, -1),
    sup: measure.slice(-1),
  };
});

// 2/3. INGATLAN TÍPUSA
const docsVisible = useState('docsVisible', () => false);

// 3/3. BÚTOROZOTTSÁG
const annexLabel = 'Birtokbaadási jegyzőkönyv, állapotleírás és bútorleltár';
const annexVisible = useState('annexVisible', () => false);

watch(concatAddress, (newValue) => {
  subjectProperty.value.address = newValue;
});

watch(() => subjectProperty.value.condominiumApartment, (newValue) => {
  if (newValue) {
    docsVisible.value = true;
  } else {
    docsVisible.value = false;
  }
});

watch(()=> subjectProperty.value.noFurniture, () => {
  const hasNoFurniture = subjectProperty.value.noFurniture;
  
  if (hasNoFurniture) {
    subjectProperty.value.hasFurniture = false;
    annexVisible.value = false;
  }
});

watch(docsVisible, (newValue) => {
  if (!newValue) {
    condominiumFoundingDocument.value = false;
    orgRules.value = false;
    houseRules.value = false;
  }
});

watch(annexVisible, (newValue) => {
  if (!newValue) {
    subjectProperty.value.inventoryDocument = false;
  }
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/3 - Bérlemény adatai -->
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
        v-model="subjectProperty.streetName"
        label="Közterület neve"
        name="subjectProperty.streetName"
      />
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputSelect
          v-model="subjectProperty.publicAreaType"
          label="Közterület jellege"
          :options="publicAreaTypes"
          name="subjectProperty.streetType"
        />
        <InputText
          v-model="subjectProperty.houseNumber"
          label="Házszám"
          name="subjectProperty.houseNumber"
        />
        <InputText
          v-model="subjectProperty.building"
          label="Épület"
          name="subjectProperty.building"
        />
      </div>
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputText
          v-model="subjectProperty.staircase"
          label="Lépcsőház"
          name="subjectProperty.staircase"
        />
        <InputText
          v-model="subjectProperty.floor"
          label="Emelet"
          name="subjectProperty.floor"
        />
        <InputText
          v-model="subjectProperty.door"
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
          :label-end="formattedMeasure"
          placeholder="min. 10"
          name="subjectProperty.size"
        />
      </div>
    </QuestionBlock>

    <!-- 2/3 - Ingatlan típusa -->
    <QuestionBlock
      title="Az ingatlan típusa"
      placement="2/3."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': docsVisible }"
    >
      <InputRadioBool 
        v-model="subjectProperty.independentHouse"
        name="subjectProperty.independentHouse"
        label="Önálló lakóépület"
        @update:model-value="subjectProperty.condominiumApartment = false"
      />
      <InputRadioBool 
        v-model="subjectProperty.condominiumApartment"
        name="subjectProperty.condominiumApartment"
        label="Társasházi lakás"
        @update:model-value="subjectProperty.independentHouse = false"
      />
    </QuestionBlock>

    <!-- 2/3.1 - Okirat, SZMSZ, Házirend -->
    <TheTransition v-model="docsVisible">
      <QuestionBlock
        title="Bérlő megismerte és átolvasta a társasház"
        bordered
      >
        <InputChboxPrice 
          v-model="condominiumFoundingDocument"
          name="condominiumFoundingDocument" 
          label="alapító okiratát (szövetkezeti ház esetén alakuló jegyzőkönyvét)"
        />
        <InputChboxPrice 
          v-model="orgRules" 
          name="orgRules" 
          label="szervezeti és működési szabályzatát"
        />
        <InputChboxPrice 
          v-model="houseRules" 
          name="houseRules" 
          label="házirendjét"
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 3/3 - Bútorozottság -->
    <QuestionBlock
      title="Bútorozottság"
      placement="3/3."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': annexVisible }"
    >
      <InputRadioBool 
        v-model="subjectProperty.noFurniture"
        name="subjectProperty.noFurniture"
        label="Üres"
        @update:model-value="subjectProperty.hasFurniture = false"
      />
      <InputRadioBool 
        v-model="subjectProperty.hasFurniture"
        name="subjectProperty.hasFurniture"
        label="Bútorozott"
        @update:model-value="() => {
          subjectProperty.noFurniture = false;
          annexVisible = true;
          subjectProperty.hasFurniture = true;
        }"
      />
    </QuestionBlock>

    <!-- 3/3.1 - Birtokbaadási jegyzőkönyv -->
    <TheTransition v-model="annexVisible">
      <QuestionBlock
        title="Melléklet vásárlási lehetőség"
        bordered
        price="5.000Ft"
      >
        <template #hint>
          <AppTooltip
            class="ml-auto -mt-2 -mb-2 sm:-mt-2 lg:-mt-4"
            :width="300"
            label="Mire jó ez a melléklet?"
          >
            <template #content>
              <p class="text-xs font-normal tracking-wide text-neutral-100">
                A birtokbaadási jegyzőkönyv rögzíti az ingatlan birtokbaadáskori állapotát. A jegyzőkönyv felhasználható káresemény bekövetkeztekor, rezsi-elszámolásra, vagy a bérlet megszűnésekor is. A Bérlő, a Bérbeadó és a Bérlemény adataival automatikusan ki van töltve.
                a Felek közös nyilatkozatai:
                - a Bérlemény üres és nincs senki oda bejelentve<br>
                - a Bérlemény “nullás”, a költségei rendezettek<br>
                - az állapot rögzítése fényképpel vagy videóval<br>
                - kézírással ki kell tölteni (kötelezően):<br>
                - óraállások rögzítése<br>
                - átadott kulcsok rögzítése<br>
                kézírással kitölthető (opcionálisan):<br>
                - a Bérlemény állapotleírása<br>
                - a bútorok listája és állapotleírása<br>
                - le kell tanúzni
              </p>
            </template>
          </AppTooltip>
        </template>
        <InputToggle 
          v-model="subjectProperty.inventoryDocument"
          :label="annexLabel"
          name="subjectProperty.inventoryDocument"
        />
      </QuestionBlock>
    </TheTransition>
  </section>
</template>
