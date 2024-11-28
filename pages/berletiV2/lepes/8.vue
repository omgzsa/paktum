<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const setFieldValue = inject('setFieldValue') as (field: string, value: string | number | boolean) => void;

const contractStore = useContractStore();
const { deposit, paymentDetail, utilityExpenses } = storeToRefs(contractStore);
const { getQuestion, updateQuestions, updateDepositAmount } = contractStore;

const createValue = (questionId: number) => computed({
  get: () => getQuestion(questionId)?.optionId,
  set: (newOptionId) => {
    updateQuestions(newOptionId, questionId);
  },
});

// 1/6 - KAUCIÓ ÖSSZEGE
// 1/6.1 - Aránytalanul magas biztosíték
const depositTooHigh = useState('deposit-too-high', () => false);
const HIGH_MULTIPLIER = 3;
onMounted(() => updateDepositAmount(deposit.value.nbOfMonths));
// Computed for label-end to prevent unnecessary recalculation
const formattedLabelEnd = computed(() => `= ${deposit.value.amount} ${paymentDetail.value.paymentCurrency}`);
const Q2Value = createValue(32);

// 2/6 - KAUCIÓ ESEDÉKESSÉGE
// 2/6.1 - Kaució megfizetés dátum
const depositPaymentLater = useState('deposit-payment-later', () => false);

// 3/6 - KAUCIÓ FIZETÉS MÓDJA
// 3/6.1 - Készpénz
const isDepositCashPayment = useState('is-deposit-cash-payment', () => false);
// 3/6.2 - Átutalás
const isDepositTransferPayment = useState('is-deposit-transfer-payment', () => false);
const cashDepositAnnexLabel = 'Készpénz átvételi elismervény minta kaucióról';

// 4/6 - KAUCIÓ FELHASZNÁLÁSA
// 4/6.1 - Kaució visszatöltése
const hasToRefillDeposit = useState('has-to-refill-deposit', () => false);

// 6/6 - Rezsi és közös ktsg.
const payesToProvider = useState('payes-to-provider', () => false);
// 6/6.1 - Rezsi/közös ktsg. fizetés módja
const utilityCashPaymentAnnexLabel = 'Készpénz átvételi elismervény minta közös költségről és rezsiről';

// Watchers
// Watch for changes in the number of months (1/6)
watch(() => deposit.value.nbOfMonths, (newVal) => {
  updateDepositAmount(newVal);
  setFieldValue('deposit.amount', deposit.value.amount);

  if(deposit.value.nbOfMonths >= HIGH_MULTIPLIER) {
    depositTooHigh.value = true;
  } else {
    depositTooHigh.value = false;
  }
});

// Watch for changes in the payment date (2/6.1)
watch(() => deposit.value.payedWhen, (newVal) => {
  if (newVal === 'other-date') {
    depositPaymentLater.value = true;
  } else {
    depositPaymentLater.value = false;
  }
});

// Watch for changes in the payment method (3/6.1 - cash)
watch(() => deposit.value.cash, (newVal) => {
  if (newVal) {
    isDepositCashPayment.value = true;
  } else {
    isDepositCashPayment.value = false;
    deposit.value.paymentDocument = false;
  }
});

// Watch for changes in the payment method (3/6.2 - transfer)
watch(() => deposit.value.transfer, (newVal) => {
  if (newVal) {
    isDepositTransferPayment.value = true;
  } else {
    isDepositTransferPayment.value = false;
  }
});

// Watch for changes in the mustRefill value (4/6)
watch(() => deposit.value.mustRefill, (newVal) => {
  if (newVal) {
    hasToRefillDeposit.value = true;
  } else {
    hasToRefillDeposit.value = false;
  }
});

// Watch for changes in the payesToProvider value (6/6)
watch(() => utilityExpenses.value.payedByOwner, (newVal) => {
  if (newVal) {
    payesToProvider.value = false;
  } else {
    payesToProvider.value = true;
    utilityExpenses.value.paymentDocument = false;
  }
});
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- 1/6 - Kaució összege -->
    <QuestionBlock
      title="Kaució összege"
      sub-text="A kaució a havi bérleti díj hányszorosa?"
      placement="1/6."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': depositTooHigh }"
    >
      <InputText
        v-model="deposit.nbOfMonths"
        type="number"
        :label-end="formattedLabelEnd"
        :step="1"
        :min="0"
        name="deposit.nbOfMonths"
        class="inline-flex w-full mb-2 sm:w-1/2"
      />
      <QuestionHelp icon-name="heroicons:information-circle-16-solid" icon-size="20">
        A mezőbe törtszámot is írhatsz két tizedesig, az egészet és a törtet vesszővel elválasztva.
      </QuestionHelp>
    </QuestionBlock>

    <!-- 1/6.1 - Aránytalanul masgas biztosíték -->
    <TheTransition v-model="depositTooHigh">
      <QuestionBlock
        title="Aránytalanul magas biztosíték"
        sub-text="Az aránytalanul magas kauciót"
        :bordered="true"
      >
        <InputRadioBase
          v-model="Q2Value"
          option-id="Q2O1"
          name="Q2"
          label="a bíróság a Bérlő kérelmére mérsékelheti, ha az meghaladja a bérleti díj háromszorosát."
          is-default
        />
        <InputRadioBase
          v-model="Q2Value"
          option-id="Q2O2"
          name="Q2"
          label="a bíróság akkor sem mérsékelheti, ha az meghaladja a bérleti díj háromszorosát."
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 2/6 - Kaució esedékessége -->
    <QuestionBlock
      title="Kaució esedékessége"
      sub-text=""
      placement="2/6."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': depositPaymentLater }"
    >
      <InputRadioBase
        v-model="deposit.payedWhen"
        option-id="contract-sign"
        name="deposit.payedWhen"
        label="szerződéskötéskor"
      />
      <InputRadioBase
        v-model="deposit.payedWhen"
        option-id="other-date"
        name="deposit.payedWhen"
        label="később"
      />
    </QuestionBlock>

    <!-- 2/6.1 - Kaució megfizetés dátum -->
    <TheTransition v-model="depositPaymentLater">
      <QuestionBlock
        title="A szerződéskötést követően mikor kell megfizetni a kauciót?"
        :bordered="true"
        class="mb-4"
      >
        <div class="inline-flex flex-col items-center">
          <p class="text-sm text-gray-500">Válassz dátumot</p>
          <InputDatePicker 
            v-model="deposit.paymentDate"
            name="deposit.paymentDate"
          />
        </div>
      </QuestionBlock>
    </TheTransition>

    <!-- 3/6 - Kaució fizetés módja -->
    <QuestionBlock
      title="Kaució fizetés módja"
      sub-text=""
      placement="3/6."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': isDepositTransferPayment || isDepositCashPayment }"
    >
      <InputRadioBool
        v-model="deposit.cash"
        name="deposit.cash"
        label="készpénz"
        @update:model-value="deposit.transfer = false"
      />
      <InputRadioBool
        v-model="deposit.transfer"
        name="deposit.transfer"
        label="átutalás"
        @update:model-value="deposit.cash = false"
      />
    </QuestionBlock>

    <!-- 3/6.1 - Készpénz -->
    <TheTransition v-model="isDepositCashPayment">
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
                A készpénz átadásának megtörténtét dokumentálni érdemes, enélkül a készpénz átadása jogvita esetén nehezen bizonyítható.<br><br>
                Tartalma:<br>
                - a Bérlő, a Bérbeadó, a Bérlemény adataival és a kaució összegével és pénznemével automatikusan ki van töltve<br>
                - Bérbeadó úgy nyilatkozik, hogy a kauciót a Bérlőtől készpénzben átvette a dátumon és a keltezésen kívül nincs kézírással kitöltendő része<br>
                - le kell tanúzni
              </p>
            </template>
          </AppTooltip>
        </template>
        <InputToggle 
          v-model="deposit.paymentDocument"
          :label="cashDepositAnnexLabel"
          name="deposit.paymentDocument"
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 3/6.2 - Átutalás -->
    <TheTransition v-model="isDepositTransferPayment">
      <QuestionBlock
        title=""
        :bordered="true"
        class="mb-4"
      >
        <InputText
          v-model="deposit.bankName"
          label="Bérbeadó számlavezető bankjának neve"
          name="deposit.bankName"
          :custom-class="`grid space-x-0 sm:flex`"
        />
        <InputText
          v-model="deposit.bankAccount"
          label="Bérbeadó bankszámlaszáma"
          name="deposit.bankAccount"
          :custom-class="`grid space-x-0 sm:flex`"
        />
      </QuestionBlock>
    </TheTransition>

    <!-- 4/6 - Kaució felhasználása -->
    <QuestionBlock
      title="Ha a bérbeadó a szerződés szerint felhasznál a kaucióból, a bérlőnek vissza kell-e töltenie a felhasznált összeget?"
      sub-text=""
      placement="4/6."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': hasToRefillDeposit }"
    >
      <InputRadioBool
        v-model="deposit.mustRefill"
        name="deposit.mustRefill"
        label="igen"
        @update:model-value="deposit.mustNotRefill = false"
      />
      <InputRadioBool
        v-model="deposit.mustNotRefill"
        name="deposit.mustNotRefill"
        label="nem"
        @update:model-value="deposit.mustRefill = false"
      />
    </QuestionBlock>

    <!-- 4/6.1 - Kaució visszatöltése -->
    <TheTransition v-model="hasToRefillDeposit">
      <QuestionMultiple
        :bordered="true"
      >
        <QuestionItem
          title="A felhasználásról történő tudomásszerzéstől számított hány napon belül kell visszatöltenie a bérlőnek a felhasznált kaució összegét?"
        >
          <InputText
            v-model="deposit.depositRefillDays"
            type="number"
            label-end="nappal."
            :step="1"
            :min="0"
            name="deposit.depositRefillDays"
            class="inline-flex w-32"
          />
        </QuestionItem>
        
        <QuestionItem
          title="Ha a bérlő határidőben nem tölti vissza, a bérbeadó emiatt felmondhat-e?"
        >
          <InputRadioBool
            v-model="deposit.contractTerminationPossibleOnNoRefill"
            name="deposit.contractTerminationPossibleOnNoRefill"
            label="igen"
            @update:model-value="deposit.contractTerminationPossibleOnNoNotRefill = false"
          />
          <InputRadioBool
            v-model="deposit.contractTerminationPossibleOnNoNotRefill"
            name="deposit.contractTerminationPossibleOnNoNotRefill"
            label="nem"
            @update:model-value="deposit.contractTerminationPossibleOnNoRefill = false"
          />
        </QuestionItem>
      </QuestionMultiple>
    </TheTransition>

    <!-- 5/6 - Bérlet megszűnése, kaució elszámolása -->
    <QuestionBlock
      title="Ha a bérlet megszűnik, a bérbeadónak a megszűnéstől hány napon belül kell elszámolnia a kaucióval?"
      sub-text=""
      placement="5/6."
    >
      <InputText
        v-model="deposit.depositPaybackDays"
        type="number"
        label-end="napon belül."
        :step="1"
        :min="0"
        name="deposit.depositPaybackDays"
        class="inline-flex w-40 mb-2"
      />
    </QuestionBlock>

    <!-- 6/6 - Rezsi és közös ktsg. -->
    <QuestionBlock
      title="Kinek fizeti a közös költséget és a rezsit a bérlő?"
      sub-text=""
      placement="6/6."
      :class="{ 'border-b-0 -mb-2 sm:-mb-4': payesToProvider }"
    >
      <InputRadioBool
        v-model="utilityExpenses.payedByOwner"
        name="deposit.payedByOwner"
        label="bérbeadónak"
        @update:model-value="utilityExpenses.payedToProvider = false"
      />
      <InputRadioBool
        v-model="utilityExpenses.payedToProvider"
        name="utilityExpenses.payedToProvider"
        label="saját nevén a társasháznak és a közműszolgáltatóknak"
        class="pb-2"
        @update:model-value="utilityExpenses.payedByOwner = false"
      />
      <QuestionHelp icon-name="heroicons:information-circle-16-solid" icon-size="20">
        Fizetőváltozás bejelentése szükséges! 
        <a 
          href="https://e-bejelento.gov.hu/"
          target="_blank"
          class="pr-1.5 text-xs hover:underline hover:underline-offset-2 hover:text-dark-800 dark:hover:text-neutral-400"
        >
          https://e-bejelento.gov.hu/
        </a>
      </QuestionHelp>
    </QuestionBlock>

    <!-- 6/6.1 - Rezsi/közös ktsg. fizetés módja -->
    <TheTransition v-model="payesToProvider">
      <QuestionMultiple
        :bordered="true"
      >
        <QuestionItem
          title="Fizetés módja"
          class=""
        >
          <InputText
            v-model="utilityExpenses.bankName"
            label="Bérbeadó számlavezető bankjának neve"
            name="utilityExpenses.bankName"
            :custom-class="`grid space-x-0 sm:flex`"
          />
          <InputText
            v-model="utilityExpenses.bankAccount"
            label="Bérbeadó bankszámlaszáma"
            name="utilityExpenses.bankAccount"
            :custom-class="`grid space-x-0 sm:flex`"
          />
        </QuestionItem>
        
        <QuestionItem
          title="Melléklet vásárlási lehetőség"
          price="2.500Ft"
          class="pt-8"
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
                  - a Bérlő, a Bérbeadó és a Bérlemény adataival automatikusan ki van töltve<br>
                  - Bérbeadó úgy nyilatkozik, hogy a rezsit a Bérlőtől készpénzben átvette<br>
                  - kézírással ki kell tölteni (kötelezően): az átvett összeg mértékét és pénznemét<br>
                  - le kell tanúzni
                </p>
              </template>
            </AppTooltip>
          </template>
          <InputToggle 
            v-model="utilityExpenses.paymentDocument"
            :label="utilityCashPaymentAnnexLabel"
            name="utilityExpenses.paymentDocument"
          />
        </QuestionItem>
      </QuestionMultiple>
    </TheTransition>
  </section>
</template>
