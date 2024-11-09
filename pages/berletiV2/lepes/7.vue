<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
const { paymentDetail, indexing } = storeToRefs(contractStore);

const availableCurrencies = [
  { value: 'HUF', label: 'Magyar forint' }, 
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
const isTransferPayment = useState('isTransferPayment', () => false);
const isCashPayment = useState('isCashPayment', () => false);
const cashAnnexLabel = 'Készpénz átvételi elismervény minta bérleti díjról';

watch(() => indexing.value.indexingType, () => {
  if (indexing.value.indexingType === 'HU' || indexing.value.indexingType === 'EUR') {
    hasIndexingDate.value = true;
  } else {
    hasIndexingDate.value = false;
  }
});

watch(() => paymentDetail.value.cash, () => {
  if (paymentDetail.value.cash) {
    isCashPayment.value = true;
    isTransferPayment.value = false;
  } else {

    paymentDetail.value.paymentDocument = false;
    isCashPayment.value = false;
    isTransferPayment.value = true;
  }
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/7 - BÉRLETI DÍJ -->
    <QuestionBlock
      title="Bérleti díj"
      sub-text=""
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

    <!-- 2/7 - ÉVES INDEXÁLÁS -->
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
        :bordered="true"
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
          <p class="text-sm text-gray-500">Válassz dátumot</p>
          <InputDatePicker 
            v-model="indexing.indexingNotifyDate" 
            name="indexing.indexingNotifyDate"
          />
        </div>
      </QuestionBlock>
    </TheTransition>

    <!-- 3/7 - FIZETÉSI ESEDÉKESSÉGE -->
    <QuestionBlock
      title="Bérleti díj fizetés esedékessége"
      sub-text=""
      placement="3/7."
    >
      <div class="xs:flex xs:justify-between">
        <div class="space-y-3">
          <InputRadioBool 
            v-model="paymentDetail.isPreviousMonth"
            name="paymentDetail.isPreviousMonth"
            label="előző hónap"
            @update:model-value="paymentDetail.isCurrentMonth = false"
          />
          <InputRadioBool 
            v-model="paymentDetail.isCurrentMonth"
            name="paymentDetail.isCurrentMonth"
            label="tárgyhónap"
            @update:model-value="paymentDetail.isPreviousMonth = false"
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
    
    <!-- 4/7 - FIZETÉS MÓDJA -->
    <QuestionBlock
      title="Bérleti díj fizetés módja"
      sub-text=""
      placement="4/7."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': isTransferPayment || !isTransferPayment }"
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

    <!-- 4/7.1 - ÁTUTALÁS -->
    <TheTransition v-model="isTransferPayment">
      <QuestionBlock
        title=""
        :bordered="true"
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

    <!-- 4/7.2 - KÉSZPÉNZ -->
    <TheTransition v-model="isCashPayment">
      <QuestionBlock
        title="Melléklet vásárlási lehetőség"
        :bordered="true"
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
          :label="cashAnnexLabel"
          name="subjectProperty.inventoryDocument"
        />
      </QuestionBlock>
    </TheTransition>
  </section>
</template>
