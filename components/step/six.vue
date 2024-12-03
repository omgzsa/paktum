<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

// 1/3. BÉRLEMÉNY ADATAI
const streetName = ref('');
const houseNumber = ref('');
const building = ref('');
const staircase = ref('');
const floor = ref('');
const door = ref('');
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
const kozteruletJellege = ref<string>(kozteruletek.value[0]);

const concatAddress = computed(() => {
  const street = `${streetName.value} ${kozteruletJellege.value} `;
  const houseN = `${houseNumber.value}., `;
  const buildingN = building.value ? `${building.value}. épület, ` : '';
  const staircaseN = staircase.value ? `${staircase.value}. lépcsőház, ` : '';
  const floorN = floor.value ? `${floor.value}.em./` : '';
  const doorN = door.value ? `${door.value}.a.` : '';


  // filter values that are not noFurniture
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
const condominiumApartment = ref(false);
const docsVisible = ref(false);

// 3/3. BÚTOROZOTTSÁG
const noFurniture = ref(false);
const annexLabel = 'Birtokbaadási jegyzőkönyv, állapotleírás és bútorleltár';
const annexVisible = ref(false);

const contractStore = useContractStore();
const { 
  subjectProperty, 
  condominiumFoundingDocument, 
  orgRules, 
  houseRules 
} = storeToRefs(contractStore);

watch(concatAddress, (newValue) => {
  subjectProperty.value.address = newValue;
});

watch(condominiumApartment, (newValue) => {
  if (newValue) {
    docsVisible.value = true;
  } else {
    docsVisible.value = false;
  }
});

watch(noFurniture, () => {
  if (noFurniture.value) {
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
  <section>
    <!-- 1/3 - BÉRLEMÉNY ADATAI -->
    <QuestionBlock
      title="Bérlemény adatai"
      sub-text=""
      placement="1/3."
      class="question-block"
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
          :label-end="formattedMeasure"
          placeholder="min. 10"
          name="subjectProperty.size"
        />
      </div>
    </QuestionBlock>

    <!-- 2/3 - INGATLAN TÍPUSA -->
    <QuestionBlock
      title="Az ingatlan típusa"
      placement="2/3."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': docsVisible }"
      class="question-block"
    >
      <InputRadioBool 
        v-model="subjectProperty.independentHouse"
        name="subjectProperty.independentHouse"
        label="Önálló lakóépület"
        @update:model-value="condominiumApartment = false"
      />
      <InputRadioBool 
        v-model="condominiumApartment"
        name="subjectProperty.condominiumApartment"
        label="Társasházi lakás"
        @update:model-value="subjectProperty.independentHouse = false"
      />
    </QuestionBlock>

    <!-- 2/3.1 - OKIRAT, SZMSZ, HÁZIREND (if) -->
    <TheTransition v-model="docsVisible">
      <QuestionBlock
        title="Bérlő megismerte és átolvasta a társasház"
        bordered
        
        class="question-block"
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

    <!-- 3/3 - BÚTOROZOTTSÁG -->
    <QuestionBlock
      title="Bútorozottság"
      placement="3/3."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': annexVisible }"
      class="question-block"
    >
      <InputRadioBool 
        v-model="noFurniture"
        name="subjectProperty.noFurniture"
        label="Üres"
        @update:model-value="subjectProperty.hasFurniture = false"
      />
      <InputRadioBool 
        v-model="subjectProperty.hasFurniture"
        name="subjectProperty.hasFurniture"
        label="Bútorozott"
        @update:model-value="() => {
          noFurniture = false;
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
        class="question-block"
      >
        <template #hint>
          <AppTooltip
            class="ml-auto -mt-2 -mb-2 sm:-mt-4"
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
