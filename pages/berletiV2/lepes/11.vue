<!-- 
  FELEK
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
const { 
    owners,
    renters,
    subjectProperty,
    isDifferentMailingAddressForOwner,
    isDifferentMailingAddressForRenter,
  } = storeToRefs(contractStore);
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

// const measure = 'm2';
// const formattedMeasure = computed(() => {
//   return {
//     base: measure.slice(0, -1),
//     sup: measure.slice(-1),
//   };
// });

watch(concatAddress, (newValue) => {
  subjectProperty.value.address = newValue;
});

// Levelezési cím
const mailingAddressDiffersForOwner = useState('mailing-address-differs-for-owner', () => false);
watch(isDifferentMailingAddressForOwner, () => {
  mailingAddressDiffersForOwner.value = isDifferentMailingAddressForOwner.value;
});

const mailingAddressDiffersForRenter = useState('mailing-address-differs-for-renter', () => false);
watch(isDifferentMailingAddressForRenter, () => {
  mailingAddressDiffersForRenter.value = isDifferentMailingAddressForRenter.value;
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/4. - Bérbeadó adatai  -->
    <QuestionBlock 
      title="Bérbeadó adatai" 
      placement="1/4."
    >
      <QuestionHelp 
        icon-name="heroicons:information-circle-16-solid" 
        icon-size="20"
        class="my-8 xs:my-0 xs:mt-2 xs:mb-6"
      >
        <span>
          <strong class="inline">Tájékoztatás!</strong> Önállóan, saját nevükben csak nagykorú és cselekvőképes magánszemélyek köthetnek érvényes szerződést.
        </span>
      </QuestionHelp>

      <div class="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        <InputText
          v-model="owners[0].firstName"
          label="Vezetéknév"
          name="owners[0].firstName"
        />
        <InputText
          v-model="owners[0].lastName"
          label="Keresztnév"
          name="owners[0].lastName"
        />
      </div>
      <InputText
        v-model="owners[0].birthPlace"
        label="Születési hely"
        name="owners[0].birthPlace"
      />
      <!-- <InputText
        v-model="owners[0].birthDate"
        label="Születési idő"
        name="owners[0].birthDate"
      /> -->
      <InputText
        v-model="owners[0].mothersName"
        label="Anyja neve"
        name="owners[0].mothersName"
      />
      <InputText
        v-model="owners[0].country"
        label="Állampolgárság"
        name="owners[0].country"
      />

      <UDivider class="py-4" size="xs" label="Lakcím" />

      <InputText
        v-model="owners[0].country"
        label="Ország"
        name="owners[0].country"
      />
      <InputText
        v-model="owners[0].zipcode"
        label="Irányítószám"
        name="owners[0].zipcode"
      />
      <InputText
        v-model="owners[0].city"
        label="Település"
        name="owners[0].city"
      />
      <InputText
        v-model="owners[0].streetName"
        label="Közterület neve"
        name="owners[0].streetName"
      />
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputSelect
          v-model="owners[0].publicAreaType"
          label="Közterület jellege"
          :options="publicAreaTypes"
          name="owners[0].publicAreaType"
        />
        <InputText
          v-model="owners[0].houseNumber"
          label="Házszám"
          name="owners[0].houseNumber"
        />
        <InputText
          v-model="owners[0].building"
          label="Épület"
          name="owners[0].building"
        />
      </div>
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputText
          v-model="owners[0].staircase"
          label="Lépcsőház"
          name="owners[0].staircase"
        />
        <InputText
          v-model="owners[0].floor"
          label="Emelet"
          name="owners[0].floor"
        />
        <InputText
          v-model="owners[0].door"
          label="Ajtó"
          name="owners[0].door"
        />
      </div>

      <UDivider class="py-4" size="xs" label="Levelezési cím" />

      <InputChboxPrice 
        v-model="isDifferentMailingAddressForOwner"
        label="A levelezési cím eltér a lakcímtől."
        name="isDifferentMailingAddressForOwner"
      />

      <TheTransition v-model="mailingAddressDiffersForOwner">
        <div class="pt-5 space-y-3">
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
        </div>
      </TheTransition>

      <UDivider class="py-4" size="xs" label="Azonosító okmány" />

      <InputText
        v-model="owners[0].idCardType"
        label="Típusa"
        name="owners[0].idCardType"
      />
      <InputText
        v-model="owners[0].idCardNumber"
        label="Száma"
        name="owners[0].idCardNumber"
      />
      
    </QuestionBlock>

    <!-- 2/4. - Bérbeadó jogalapja a bérbeadásra -->
    <!-- 3/4. - Bérbeadó személyes/meghatalmazott -->
    <!-- 4/4. - Bérlő adatai -->
    <QuestionBlock
      title="Bérlő adatai"
      placement="4/4."
    >
    <QuestionHelp 
        icon-name="heroicons:information-circle-16-solid" 
        icon-size="20"
        class="my-8 xs:my-0 xs:mt-2 xs:mb-6"
      >
        <span>
          <strong class="inline">Tájékoztatás!</strong> Önállóan, saját nevükben csak nagykorú és cselekvőképes magánszemélyek köthetnek érvényes szerződést.
        </span>
      </QuestionHelp>

      <div class="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        <InputText
          v-model="renters[0].firstName"
          label="Vezetéknév"
          name="renters[0].firstName"
        />
        <InputText
          v-model="renters[0].lastName"
          label="Keresztnév"
          name="renters[0].lastName"
        />
      </div>
      <InputText
        v-model="renters[0].birthPlace"
        label="Születési hely"
        name="renters[0].birthPlace"
      />
      <!-- <InputText
        v-model="renters[0].birthDate"
        label="Születési idő"
        name="renters[0].birthDate"
      /> -->
      <InputText
        v-model="renters[0].mothersName"
        label="Anyja neve"
        name="renters[0].mothersName"
      />
      <InputText
        v-model="renters[0].country"
        label="Állampolgárság"
        name="renters[0].country"
      />

      <UDivider class="py-4" size="xs" label="Lakcím" />

      <InputText
        v-model="renters[0].country"
        label="Ország"
        name="renters[0].country"
      />
      <InputText
        v-model="renters[0].zipcode"
        label="Irányítószám"
        name="renters[0].zipcode"
      />
      <InputText
        v-model="renters[0].city"
        label="Település"
        name="renters[0].city"
      />
      <InputText
        v-model="renters[0].streetName"
        label="Közterület neve"
        name="renters[0].streetName"
      />
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputSelect
          v-model="renters[0].publicAreaType"
          label="Közterület jellege"
          :options="publicAreaTypes"
          name="renters[0].publicAreaType"
        />
        <InputText
          v-model="renters[0].houseNumber"
          label="Házszám"
          name="renters[0].houseNumber"
        />
        <InputText
          v-model="renters[0].building"
          label="Épület"
          name="renters[0].building"
        />
      </div>
      <div class="gap-4 space-y-4 sm:space-y-0 sm:flex">
        <InputText
          v-model="renters[0].staircase"
          label="Lépcsőház"
          name="renters[0].staircase"
        />
        <InputText
          v-model="renters[0].floor"
          label="Emelet"
          name="renters[0].floor"
        />
        <InputText
          v-model="renters[0].door"
          label="Ajtó"
          name="renters[0].door"
        />
      </div>

      <UDivider class="py-4" size="xs" label="Levelezési cím" />

      <InputChboxPrice 
        v-model="isDifferentMailingAddressForRenter"
        label="A levelezési cím eltér a lakcímtől."
        name="isDifferentMailingAddressForRenter"
      />

      <TheTransition v-model="mailingAddressDiffersForRenter">
        <div class="pt-5 space-y-3">
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
        </div>
      </TheTransition>

      <UDivider class="py-4" size="xs" label="Azonosító okmány" />

      <InputText
        v-model="renters[0].idCardType"
        label="Típusa"
        name="renters[0].idCardType"
      />
      <InputText
        v-model="renters[0].idCardNumber"
        label="Száma"
        name="renters[0].idCardNumber"
      />
    </QuestionBlock>
  </section>
</template>
