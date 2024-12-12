<!-- 
  EGYEBEK
-->
<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

// Constants
// const PERCENTAGE_MIN = 0
const PERCENTAGE_MAX = 100
const DEBOUNCE_DELAY = 500

const contractStore = useContractStore();
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
} = storeToRefs(contractStore);
const { updateNotarialCosts } = contractStore;

// 6.9 - Hiba, kár rögzítése
// 6.9.1 - Hiba, kár rögzítése jegyzőkönyvvel
const damageReportWithProtocol = useState('damage-report-with-protocol', () => false);
const protocolLabel = 'Kárfelvételi jegyzőkönyv minta';
watch(damageReportWithPhotoAndVideoAndProtocol, () => {
  if (damageReportWithPhotoAndVideoAndProtocol.value) {
    damageReportWithProtocol.value = true;
  } else {
    damageReportWithProtocol.value = false;
    damageReport.value = false;
  }
});

// 7.9 - Közokiratba foglalás
const anyDocumentSelected = computed(() => {
  return publicDocument.value.movingOut || publicDocument.value.paymentObligation;
});
const servicePresumption = useState('service-presumption', () => false);
watch(anyDocumentSelected, () => {
  if (!anyDocumentSelected.value) {
    publicDocument.value.servicePresumption = false;
  }
});
watch(() => publicDocument.value.servicePresumption, () => {
  if (publicDocument.value.servicePresumption) {
    servicePresumption.value = true;
  } else {
    servicePresumption.value = false;
  }
});

// 7.9.1 - Közokirat - napja, megismétlése és költsége
// Computed to handle v-model binding
const ownerCost = computed({
  get: () => notarialDocumentCostForOwner.value,
  set: (value) => handleOwnerCostInput(value)
})
const renterCost = computed({
  get: () => notarialDocumentCostForRenter.value,
  set: (value) => handleRenterCostInput(value)
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
const handleOwnerCostInput = useDebounceFn((value: number | string) => {
  updateNotarialCosts('owner', Number(value))
}, DEBOUNCE_DELAY)
const handleRenterCostInput = useDebounceFn((value: number | string) => {
  updateNotarialCosts('renter', Number(value))
}, DEBOUNCE_DELAY)
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
        v-model="energeticCertificateRequired" 
        name="energeticCertificateRequired" 
        label="igen"
        @update:model-value="energeticCertificateNotRequired = false"
      />
      <InputRadioBool 
        v-model="energeticCertificateNotRequired" 
        name="energeticCertificateNotRequired" 
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
          :step="1" :min="1" :max="365"
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
        label="fénykép vagy videó" 
        @update:model-value="damageReportWithPhotoAndVideoAndProtocol = false"
      />
      <InputRadioBool
        v-model="damageReportWithPhotoAndVideoAndProtocol"
        name="damageReportWithPhotoAndVideoAndProtocol"
        label="fénykép vagy videó és jegyzőkönyv" 
        @update:model-value="damageReportWithPhotoAndVideo = false"
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
              <p class="text-xs font-normal tracking-wide text-neutral-100">
                A kárfelvételi jegyzőkönyvvel a helyszínen tudod rögzíteni a káreseményt. A jegyzőkönyv később egy
                esetleges bírósági eljárás során bizonyítékul szolgálhat.<br>
                a Felek közös nyilatkozatai:<br>
                - a Bérlő, a Bérbeadó és a Bérlemény adataival automatikusan ki van töltve
                kézírással kell kitölteni (kötelezően):<br>
                - a káreset időpontját, helyét, egyéb körülményeinek leírását
                vétkesnek mutatkozó személyek adatait<br>
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
        <QuestionItem title="A szerződés aláírásától hány napon belül kell közokiratba foglaltatnia?">
          <InputText
            v-model="contractConfirmationDays" 
            type="number"
            label-end="nap"
            :step="1" :min="1" :max="365"
            name="contractConfirmationDays" 
            class="w-full xs:w-32"
          />
        </QuestionItem>
        <QuestionItem
          title="Ha a Bérbeadó kifogásolja a közokirat tartalmát, e kifogástól hány napon belül kell megismételni a közokiratba-foglalást?">
          <InputText
            v-model="contractReConfirmationDays" 
            type="number"
            label-end="nap"
            :step="1" :min="1" :max="365"
            name="contractReConfirmationDays" 
            class="w-full xs:w-32"
          />
        </QuestionItem>
        <QuestionItem title="Ki viseli a közokiratba-foglalás költségeit?">
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
          <div class="space-y-5 xs:space-y-0 xs:gap-4 xs:flex xs:items-start xs:justify-between">
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
        label="ingóságaitól kiürítve" 
        @update:model-value="() => {
          subjectProperty.propertyCleaned = false,
          subjectProperty.propertyEmptiedAndCleaned = false
        }"
      />
      <InputRadioBool
        v-model="subjectProperty.propertyCleaned"
        name="subjectProperty.propertyCleaned"
        label="kitakarítva" 
        @update:model-value="() => {
          subjectProperty.propertyEmptied = false,
          subjectProperty.propertyEmptiedAndCleaned = false
        }"
      />
      <InputRadioBool
        v-model="subjectProperty.propertyEmptiedAndCleaned"
        name="subjectProperty.propertyEmptiedAndCleaned"
        label="mindkettő" 
        @update:model-value="() => {
          subjectProperty.propertyEmptied = false,
          subjectProperty.propertyCleaned = false
        }"
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
        label="két tanúval papír alapon" 
        @update:model-value="eSignature = false"
      />
      <InputRadioBool
        v-model="eSignature"
        name="eSignature"
        label="AVDH-val elektronikusan, nyomtatás nélkül" 
        @update:model-value="noSignature = false"
      />
    </QuestionBlock>
  </section>
</template>
