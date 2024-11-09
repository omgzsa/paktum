<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
// const { questions } = storeToRefs(contractStore);
const { getQuestion, addQuestion } = contractStore;

const createValue = (questionId: number) => computed({
  get: () => getQuestion(questionId)?.optionId || '',
  set: (newOptionId) => {
    updateQuestions(newOptionId, questionId);
  },
});

const Q15Value = createValue(10);
const Q4Value = createValue(11);
const Q16Value = createValue(12);
const Q17Value = createValue(13);
const Q21Value = createValue(14);
const Q18Value = createValue(15);
const Q19Value = createValue(16);
const Q20Value = createValue(17);

const currency = ref('HUF');

const optionsQ15 = [
  { id: 0, label: 'kert gondozása' },
  { id: 1, label: 'öntözőrendszer karbantartása' },
  { id: 2, label: 'kerti bútorok javítása' },
  { id: 3, label: 'az épület és a közös használatú helyiségek tisztántartása' },
  { id: 4, label: 'az épület és a közös használatú helyiségek megvilágítása' },
  { id: 5, label: 'háztartási szemét elszállítása' },
];

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

const handleSyncChange = (e: Event) => {
  const clickedOption = (e.target as HTMLInputElement).value;

  if (clickedOption === 'Q17O1' || clickedOption === 'Q21O1') {
    Q17Value.value = 'Q17O1';
    Q21Value.value = 'Q21O1';
    updateQuestions('Q17O1', 13);
    updateQuestions('Q21O1', 14);
  } else if (clickedOption === 'Q17O2' || clickedOption === 'Q21O2') {
    Q17Value.value = 'Q17O2';
    Q21Value.value = 'Q21O2';
    updateQuestions('Q17O2', 13);
    updateQuestions('Q21O2', 14);
  }
};

const textValueRef = ref<string | number | null>(null);
const checkedValuesRef = ref<string[]>([]);

const handleCombinedUpdate = (
  optionId: string, 
  questionId: number,
  { textValue, checkedValues }: { textValue?: string | number; checkedValues?: string[] }) => {
    
  // Update the refs based on which value is being passed
  if (textValue !== undefined) textValueRef.value = textValue;
  if (checkedValues !== undefined) checkedValuesRef.value = checkedValues;

  // If both values are present, proceed with adding the question
  if (textValueRef.value && checkedValuesRef.value.length) {
    const concatenatedValues = concatValues(checkedValuesRef.value);

    addQuestion(questionId, optionId, [
      {
        optionParameterId: 0,
        parameter: JSON.stringify(textValueRef.value),
      },
      {
        optionParameterId: 1,
        parameter: concatenatedValues,
      },
    ]);

    // Clear the refs after submission to avoid repeated updates
    textValueRef.value = null;
    checkedValuesRef.value = [];
  }
};

// const handleMultipleInputs = (event: any) => {
//   const { optionId, checkedValues, textValue } = event;

//   if (!optionId || !textValue) return;
//   if (!checkedValues.length) return updateQuestions(optionId, 10, textValue);

//   const concatenatedValues = ref(concatValues(checkedValues));

//   addQuestion(10, optionId, [
//     {
//       optionParameterId: 0,
//       parameter: JSON.stringify(textValue),
//     },
//     {
//       optionParameterId: 1,
//       parameter: concatenatedValues.value,
//     },
//   ]);
// };
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- Q15 - 1/8 -->
    <QuestionBlock
      title="Karbantartási kötelezettség"
      sub-text="A Bérleményt"
      placement="1/8."
    >
      <template #hint>
        <AppTooltip
          class="ml-auto -mt-2 -mb-2 sm:-mt-8"
          :width="300"
          label="Ezt jó, ha tudod!"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Itt kizárólag azoknak az épülethez kötődő feladatoknak a Bérlő általi elvégzésében lehet megállapodni, amelyek kisebb munka- és költségráfordítással elvégezhetők. Ezek a felsorolásban foglalt feladatok jellegéhez hasonló horderejű tennivalók lehetnek.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioTextCheckedCustom
        :question-id="10"
        :extra-options="optionsQ15"
        option-id="Q15O1"
        name="Q15"
        label-start="a Bérlő tartja karban a karbantartási feladatok elvégzését követő hónapra elszámolható havi"
        :label-end="`${currency} lakbérmérséklés ellenében az alábbi feladatok tekintetében (a többi a Bérbeadó feladata):`"
        :min="0"
        :max="999999"
        :step="5"
        :width="70"
        @update:text-value="(e) => handleCombinedUpdate(Q15Value, 10, { textValue: e })"
        @update:checked-values="(e) => handleCombinedUpdate(Q15Value, 10, { checkedValues: e })"
      />
      <InputRadioBase
        v-model="Q15Value"
        :question-id="10"
        option-id="Q15O2"
        name="Q15"
        label="a Bérbeadó köteles karbantartani."
      />
    </QuestionBlock>

    <!-- Q4 - 2/8 --> 
    <QuestionBlock
      title="Burkolatok, ajtók, ablakok és berendezések"
      sub-text="A Bérlemény burkolatainak, ajtóinak, ablakainak és berendezéseinek karbantartásával, felújításával, pótlásával és cseréjével kapcsolatosan"
      placement="2/8."
    >
      <InputRadioBase
        v-model="Q4Value"
        :question-id="11"
        option-id="Q4O1"
        name="Q4"
        label="a karbantartás, felújítás, pótlás és csere költsége is a Bérbeadót terheli."
      />
      <InputRadioBase
        v-model="Q4Value"
        :question-id="11"
        option-id="Q4O2"
        name="Q4"
        is-default
        label="a karbantartás és felújítás költsége a Bérlőt, a pótlás és csere költsége a Bérbeadót terheli."
      />
      <InputRadioBase
        v-model="Q4Value"
        :question-id="11"
        option-id="Q4O3"
        name="Q4"
        label="a karbantartás, felújítás, pótlás és csere költsége is a Bérlőt terheli."
      />
    </QuestionBlock>

    <!-- Q16 - 3/8 -->
    <QuestionBlock
      title="Bérbeadói kötelezettségek elmulasztása esetén bérlői pótlás"
      sub-text="Ha a Bérbeadó nem teljesít határidőben kijavítást, karbantartást, vagy egyéb kötelezettséget"
      placement="3/8."
      class="border-b-0"
    >
      <InputRadioBase
        v-model="Q16Value"
        :question-id="12"
        option-id="Q16O1"
        name="Q16"
        label="a Bérlő szükséges munkát a Bérbeadó helyett és költségére elvégezheti a Bérbeadó előzetes írásbeli felszólítása nélkül."
      />
      <InputRadioBase
        v-model="Q16Value"
        :question-id="12"
        option-id="Q16O2"
        name="Q16"
        is-default
        label="a Bérlő szükséges munkát a Bérbeadó helyett és költségére elvégezheti, de csak akkor, ha azt a Bérbeadó a Bérlő előzetes írásbeli felszólításában megjelölt határidőben sem pótolja."
      />
    </QuestionBlock>

    <!-- Q17 - 4/8 -->
    <QuestionBlock
      title="Bérbeadói karbantartás esedékessége"
      sub-text="A Bérbeadó a Bérlemény hibáit"
      placement="4/8."
      :bordered="true"
      class="mb-4"
    >
      <template #hint>
        <AppTooltip
          :width="300"
          label="Ezt jó, ha tudod!"
          class="ml-auto -mb-2 md:-mt-2 lg:-mt-4"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Ez a két bekeretezett kérdés logikailag összefügg, így a választott válaszok együtt mozognak.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="Q17Value"
        :question-id="13"
        option-id="Q17O1"
        name="Q17"
        label="bármilyen hiba esetén köteles késedelem nélkül kijavítani."
        @change="handleSyncChange"
      />
      <InputRadioBase
        v-model="Q17Value"
        :question-id="13"
        option-id="Q17O2"
        name="Q17"
        is-default
        label="csak azonnali beavatkozást igénylő hibák esetén köteles késedelem nélkül kijavítani, egyéb hibákat csak az épület karbantartásával vagy felújításával egyidejűleg."
        @change="handleSyncChange"
      />
    </QuestionBlock>
    
    <!-- Q21 - 5/8 -->
    <QuestionBlock
      title="Azonnali beavatkozást nem igénylő hibák kijavításának elmulasztása"
      sub-text="Ha a Bérbeadó a Bérlemény azonnali beavatkozást nem igénylő hibáit nem javítja ki"
      placement="5/8."
      :bordered="true"
      class=""
    >
      <InputRadioBase
        v-model="Q21Value"
        :question-id="14"
        option-id="Q21O1"
        name="Q21"
        label="a Bérlő felszólíthatja arra, hogy haladéktalanul pótolja a mulasztását, függetlenül az épület karbantartásának és felújításának időpontjától."
        @change="handleSyncChange"
      />
      <InputRadioBase
        v-model="Q21Value"
        :question-id="14"
        option-id="Q21O2"
        name="Q21"
        is-default
        label="a Bérlő erre csak akkor szólíthatja fel, ha a kijavítás(oka)t az épület karbantartásakor vagy felújításakor mulasztotta el."
        @change="handleSyncChange"
      />
    </QuestionBlock>
    
    <!-- Q18 - 6/8 -->
    <QuestionBlock
      title="Azonnali beavatkozást igénylő hiba kijavítása"
      sub-text="Ha azonnali beavatkozást igénylő (pl. életveszélyt okozó, vagy a használatot lényegesen akadályozó) hibát kell kijavítani"
      placement="6/8."
    >
      <InputRadioBase
        v-model="Q18Value"
        :question-id="15"
        option-id="Q18O1"
        name="Q18"
        label="a kijavítást bármely Fél elvégezheti, és a Bérbeadó akkor sem mentesülhet a kijavítás költségeinek megfizetése alól, ha az számára méltánytalan megterhelést okoz."
      />
      <InputRadioBase
        v-model="Q18Value"
        :question-id="15"
        option-id="Q18O2"
        name="Q18"
        is-default
        label="a kijavítást bármely Fél elvégezheti, de a Bérbeadó mentesül a kijavítás költségeinek megfizetése alól, ha az számára méltánytalan megterhelést okoz."
      />
    </QuestionBlock>
    
    <!-- Q19 - 7/8 -->
    <QuestionBlock
      title="Bérbeadó korszerűsítést megelőző értesítési kötelezettsége"
      sub-text="A Bérlemény korszerűsítési munkálatairól és azok várható időtartamáról a Bérbeadónak"
      placement="7/8."
    >
      <InputRadioBase
        v-model="Q19Value"
        :question-id="16"
        option-id="Q19O1"
        name="Q19"
        is-default
        label="írásban kell értesítenie a Bérlőt, aki az értesítést követő hónap utolsó napjáig felmondhat."
      />
      <InputRadioBase
        v-model="Q19Value"
        :question-id="16"
        option-id="Q19O2"
        name="Q19"
        label="írásban kell értesítenie a Bérlőt, aki az értesítést követően nem mondhat fel."
      />
    </QuestionBlock>

    <!-- Q20 - 8/8 -->
    <QuestionBlock
      title="A bérlet épületkarbantartás miatti szünetelése"
      sub-text="Ha az épület karbantartása miatt ki kell költöztetni a Bérlőt"
      placement="8/8."
    >
      <InputRadioBase
        v-model="Q20Value"
        :question-id="17"
        option-id="Q20O1"
        name="Q20"
        label="a bérleti díj a Bérlemény után erre az időre nem jár, vagy felajánlott cserelakásként a Bérlő kevesebb szobaszámú, alacsonyabb komfortfokozatú lakást nem köteles elfogadni."
      />
      <InputRadioBase
        v-model="Q20Value"
        :question-id="17"
        option-id="Q20O2"
        name="Q20"
        is-default
        label="a bérleti díj erre az időre nem jár, vagy felajánlott cserelakásként a Bérlő kevesebb szobaszámú, alacsonyabb komfortfokozatú lakást köteles elfogadni."
      />
      <InputRadioBase
        v-model="Q20Value"
        :question-id="17"
        option-id="Q20O3"
        name="Q20"
        label="a bérleti díj továbbra is minden esetben jár, felajánlott cserelakásként a Bérlő kevesebb szobaszámú, alacsonyabb komfortfokozatú lakást köteles elfogadni."
      />
    </QuestionBlock>
  </section>
</template>
