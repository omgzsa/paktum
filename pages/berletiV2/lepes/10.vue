<!-- 
  EGYEBEK
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

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
  contractReConfirmationDays
} = storeToRefs(contractStore);
// const { removeQuestion, getQuestion, updateQuestions } = contractStore;

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
    <QuestionBlock title="Bérlő bejelentheti a Bérleményt?" placement="4/9.">
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
        v-model="damageReportWithPhotoAndVideoAndProtocol" name="damageReportWithPhotoAndVideoAndProtocol"
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

    <!-- 7.9 - Közokiratba foglalás -->
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

    <!-- 7.9.1 - Közokirat - napja, megismétlése és költsége -->
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
          //
        </QuestionItem>
      </QuestionMultiple>
    </TheTransition>
  </section>
</template>
