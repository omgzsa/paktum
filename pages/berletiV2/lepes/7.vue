<!-- 
  AZ ELLENÉRTÉK
-->
<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
const { 
  paymentDetail,
  indexing,
  contractTerminationDays,
  penalityChange
} = storeToRefs(contractStore);

const availableCurrencies = [
  { value: 'HUF', label: 'Magyar forint' },
  { value: 'EUR', label: 'Euró' },
  { value: 'USD', label: 'Amerikai dollár' },
  { value: 'GBP', label: 'Angol font' },
  { value: 'RON', label: 'Román lej' },
  { value: 'HRK', label: 'Horvát kuna' },
  { value: 'RSD', label: 'Szerb dínár' },
  { value: 'UAH', label: 'Ukrán hrivnya' },
  { value: 'CZK', label: 'Cseh korona' },
  { value: 'PLN', label: 'Lengyel zloty' }
]

// 2/7.1 - Indexálás éves értesítő
const hasIndexingDate = useState('hasIndexingDate', () => false);

// 4/7.1 & 4/7.2 - Átutalás & Készpénz
const isRentTransferPayment = useState('isRentTransferPayment', () => false);
const isRentCashPayment = useState('isRentCashPayment', () => false);
const cashRentAnnexLabel = 'Készpénz átvételi elismervény minta bérleti díjról';

watch(() => indexing.value.indexingType, () => {
  if (indexing.value.indexingType === 'HU' || indexing.value.indexingType === 'EUR') {
    hasIndexingDate.value = true;
  } else {
    hasIndexingDate.value = false;
  }
});

watch(() => paymentDetail.value.cash, () => {
  if (paymentDetail.value.cash) {
    isRentCashPayment.value = true;
    isRentTransferPayment.value = false;
  } else {
    paymentDetail.value.paymentDocument = false;
    isRentCashPayment.value = false;
    isRentTransferPayment.value = true;
  }
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/7 - Bérleti díj -->
    <QuestionBlock
      title="Bérleti díj"
      placement="1/7."
    >
      <div class="gap-4 space-y-4">
        <InputText
          v-model="paymentDetail.rentingFee"
          type="number"
          label="Bérleti díj összege"
          name="paymentDetail.rentingFee"
          :custom-class="`grid space-x-0 sm:flex`"
        />
        <InputSelect
          v-model="paymentDetail.paymentCurrency"
          label="Bérleti díj pénzneme"
          :options="availableCurrencies"
          name="paymentDetail.paymentCurrency"
          class="grid space-x-0 sm:flex"
        />
      </div>
    </QuestionBlock>

    <!-- 2/7 - Éves indexálás -->
    <QuestionBlock
      title="Bérleti díj éves indexálása"
      placement="2/7."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': hasIndexingDate }"
    >
      <template #hint>
        <AppTooltip
          class="ml-auto -mt-2 -mb-2 sm:-mt-2 lg:-mt-4"
          :width="300"
          label="§ Indexálás"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              A bérbeadó a bérleti díjat a hozzákötött index változásának mértékével, a szerződés írásbeli módosítása nélkül évente egyoldalúan módosíthatja. Ha indexálást választasz, minden év január elsejével módosul a bérleti díj.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="indexing.indexingType"
        option-id="HU"
        name="indexing.indexingType"
        label="a magyar (KSH) éves fogyasztói árindexe alapján."
      />
      <InputRadioBase
        v-model="indexing.indexingType"
        option-id="EUR"
        name="indexing.indexingType"
        label="az Európai Unió (EUROSTAT) éves fogyasztói árindexe alapján."
      />
      <InputRadioBase
        v-model="indexing.indexingType"
        :option-id="`''`"
        name="indexing.indexingType"
        label="nincs indexálás."
      />
    </QuestionBlock>

    <!-- 2/7.1 - Indexálás éves értesítő -->
    <TheTransition v-model="hasIndexingDate">
      <QuestionBlock
        title="Bérbeadó adott évben legkésőbb mikor küldje meg az indexálási értesítőt a Bérlőnek?"
        bordered
      >
        <template #hint>
          <AppTooltip
            class="ml-auto -mt-2 -mb-2 sm:-mt-4"
            :width="300"
            label="§ Indexálási értesítő"
          >
            <template #content>
              <p class="text-xs font-normal tracking-wide text-neutral-100">
                A bérbeadó arról, hogy adott évben milyen összeggel módosult a bérleti díj, írásos indexálási értesítőt küld a bérlőnek. Az értesítés megküldésére tartalmaz a szerződés egy végső határidőt.
              </p>
            </template>
          </AppTooltip>
        </template>
        <div class="inline-flex flex-col items-center">
          <p class="text-sm text-neutral-500">Válassz dátumot</p>
          <InputDatePicker 
            v-model="indexing.indexingNotifyDate" 
            name="indexing.indexingNotifyDate"
          />
        </div>
      </QuestionBlock>
    </TheTransition>

    <!-- 3/7 - Fizetés esedékessége -->
    <QuestionBlock
      title="Bérleti díj fizetés esedékessége"
      sub-text=""
      placement="3/7."
    >
      <div class="xs:flex xs:justify-between">
        <div class="space-y-3">
          <InputRadioBool 
            v-model="paymentDetail.previousMonth"
            name="paymentDetail.previousMonth"
            label="előző hónap"
            @update:model-value="paymentDetail.currentMonth = false"
          />
          <InputRadioBool 
            v-model="paymentDetail.currentMonth"
            name="paymentDetail.currentMonth"
            label="tárgyhónap"
            @update:model-value="paymentDetail.previousMonth = false"
          />
        </div>

        <div class="self-end">
          <InputText
            v-model="paymentDetail.paymentDeadlineDay"
            type="number"
            :min="1"
            :max="31"
            :step="1"
            label-end=". napján"
            name="paymentDetail.paymentDeadlineDay"
            class="mt-3 ml-5 w-[100px] xs:mr-5 [&>*]:gap-0"
          />
        </div>
      </div>
    </QuestionBlock>
    
    <!-- 4/7 - Fizetés módja -->
    <QuestionBlock
      title="Bérleti díj fizetés módja"
      sub-text=""
      placement="4/7."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': isRentTransferPayment || isRentCashPayment }"
    >
      <InputRadioBool 
        v-model="paymentDetail.cash"
        name="paymentDetail.cash"
        label="készpénz"
        @update:model-value="paymentDetail.transfer = false"
      />
      <InputRadioBool 
        v-model="paymentDetail.transfer"
        name="paymentDetail.transfer"
        label="átutalás"
        @update:model-value="paymentDetail.cash = false"
      />
    </QuestionBlock>

    <!-- 4/7.1 - készpénz -->
    <TheTransition v-model="isRentCashPayment">
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
                A készpénz átadásának megtörténtét dokumentálni érdemes, enélkül a készpénz átadása jogvita esetén nehezen bizonyítható.<br>
                Tartalma:<br>
                a Bérlő, a Bérbeadó, a Bérlemény adataival és a  havi bérleti díj összegével és pénznemével automatikusan ki van töltve<br>
                Bérbeadó úgy nyilatkozkozik benne, hogy az adott havi bérleti díjat a Bérlőtől készpénzben átvette<br>
                a dátumon és a keltezésen kívül nincs kézírással kitöltendő része<br>
                le kell tanúzni
              </p>
            </template>
          </AppTooltip>
        </template>
        <InputToggle 
          v-model="paymentDetail.paymentDocument"
          :label="cashRentAnnexLabel"
          name="subjectProperty.inventoryDocument"
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 4/7.2 - átutalás -->
    <TheTransition v-model="isRentTransferPayment">
      <QuestionBlock
        title=""
        bordered
        class="mb-4"
      >
        <InputText
          v-model="paymentDetail.bankName"
          label="Bérbeadó számlavezető bankjának neve"
          name="paymentDetail.bankName"
          :custom-class="`grid space-x-0 sm:flex`"
        />
        <InputText
          v-model="paymentDetail.accountNumber"
          label="Bérbeadó bankszámlaszáma"
          name="paymentDetail.accountNumber"
          :custom-class="`grid space-x-0 sm:flex`"
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 5/7. - Első havi fizetés esedékessége -->
    <QuestionBlock
      title="Első havi bérleti díj fizetésének esedékessége"
      placement="5/7."
    >
      <div class="inline-flex flex-col items-center">
        <p class="text-sm text-neutral-500">Válassz dátumot</p>
        <InputDatePicker 
          v-model="paymentDetail.firstPaymentDate"
          name="paymentDetail.firstPaymentDate"
        />
      </div>
    </QuestionBlock>

    <!-- 6/7. Felmondási idő -->
    <QuestionBlock
      title="Ha a bérlő nem fizet bérleti díjat, és emiatt mond fel a bérbeadó, mennyi legyen a felmondási idő?"
      placement="6/7."
    >
      <InputText
        v-model="contractTerminationDays"
        type="number"
        :min="15"
        :max="999"
        :step="1"
        placeholder="min.15"
        label-end="nap"
        name="contractTerminationDays"
        class="w-28"
      />
    </QuestionBlock>

    <!-- 7/7. Használati díj (megszűnés után) -->
    <QuestionBlock
      title="Ha a bérleti szerződés megszűnt és a bérlő ingóságaival nem hagyja el a bérleményt, a visszaadásig a bérbeadónak fizetendő használati díj havi mértéke a megszűnéstől számított 2 hónap elteltével"
      placement="7/7."
    >
    <InputRadioBase
        v-model="penalityChange"
        option-id="1"
        name="penalityChange"
        label="a bérleti díj 1-szerese"
      />
      <InputRadioBase
        v-model="penalityChange"
        option-id="1.5"
        name="penalityChange"
        label="a bérleti díj 1,5-szöröse"
      />
      <InputRadioBase
        v-model="penalityChange"
        option-id="2"
        name="penalityChange"
        label="a bérleti díj 2-szerese"
      />
      <InputRadioBase
        v-model="penalityChange"
        option-id="2.5"
        name="penalityChange"
        label="a bérleti díj 2,5-szöröse"
      />
      <InputRadioBase
        v-model="penalityChange"
        option-id="3"
        name="penalityChange"
        label="a bérleti díj 3-szorosa"
      />
    </QuestionBlock>
  </section>
</template>
