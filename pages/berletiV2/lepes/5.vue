<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

definePageMeta({
  layout: 'contract',
});

const contractStore = useContractStore();
// const { questions } = storeToRefs(contractStore);
const { getQuestion, addQuestion } = contractStore;

const createValue = (questionId: number) =>
  computed({
    get: () => getQuestion(questionId)?.optionId,
    set: (newOptionId) => {
      updateQuestions(newOptionId, questionId);
    },
  });

const Q26Value = createValue(24);
const Q27Value = createValue(25);
const Q28Value = createValue(26);
const Q29Value = createValue(27);
const Q30Value = createValue(28);
const Q31Value = createValue(29);
const Q32Value = createValue(30);
const Q33Value = createValue(31);

const updateQuestions = (
  optionId: string,
  questionId: number,
  optionParams?: string | number
) => {
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

const updateQuestionsWithTwoParams = (
  optionId: string,
  questionId: number,
  optionParams?: string | number,
  optionParamsTwo?: string | number
) => {
  const stringParam = JSON.stringify(optionParams) || '';
  const stringParamTwo = JSON.stringify(optionParamsTwo) || '';

  addQuestion(questionId, optionId, [
    {
      optionParameterId: 0,
      parameter: stringParam,
    },
    {
      optionParameterId: 1,
      parameter: stringParamTwo,
    },
  ]);
};
</script>

<template>
  <section class="max-w-2xl mx-auto">
    <!-- Q26 - 1/8 -->
    <QuestionBlock
      title="A felmondás írásbelisége"
      sub-text="A felmondást írásban kell megtenni. Az írásbeliség elmaradására"
      placement="1/8."
    >
      <InputRadioBase
        v-model="Q26Value"
        :question-id="24"
        option-id="Q26O1"
        name="Q26"
        label="elköltözés után a Bérlő hivatkozhat, ha a Bérbeadó mondott fel."
      />
      <InputRadioBase
        v-model="Q26Value"
        :question-id="24"
        option-id="Q26O2"
        name="Q26"
        is-default
        label="a Bérlő elköltözése után egyik fél sem hivatkozhat."
      />
      <InputRadioBase
        v-model="Q26Value"
        :question-id="24"
        option-id="Q26O3"
        name="Q26"
        label="elköltözés után a Bérbeadó hivatkozhat, ha a Bérlő mondott fel."
      />
    </QuestionBlock>

    <!-- Q27 - 2/8 -->
    <QuestionBlock
      title="Bérbeadó rendkívüli felmondási joga Bérlő fizetési kötelezettségének elmulasztása esetén"
      sub-text="Ha a Bérlő határidőre nem teljesíti fizetési kötelezettségeit"
      placement="2/8."
    >
      <template #hint>
        <AppTooltip
          :width="300"
          label="§ Rendkívüli felmondás"
          class="ml-auto -mb-2 md:-mt-4"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Ha a szerződés rendkívüli felmondással szűnik meg, annak oka
              jellemzően az, hogy az egyik fél nem teljesítette valamilyen
              kötelezettségét, vagy a szerződéssel ellentétes magatartást
              tanúsított (pl. nem fizetett bérleti díjat, nem javította ki a
              Bérlemény hibáját, vagy az együttélés követelményeivel kirívóan
              ellentétes magatartást tanúsított), és ezért a másik fél
              rendkívüli felmondással felmondott.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioTextText
        v-model:option="Q27Value"
        :question-id="25"
        option-id="Q27O1"
        name="Q27"
        label-start="a Bérbeadó"
        label-center="napos póthatáridő tűzésével szólíthatja fel, ha a Bérlő erre sem fizet, a Bérbeadó felmondhat a felmondást követő hónap utolsó napjára (a felmondási idő"
        label-end="nap)."
        placeholder="min. 8"
        placeholder2="min. 15"
        :min="8"
        :max="365"
        :step="1"
        :width="59"
        @update:model-value="(optionId: string) => updateQuestions(Q27Value, 25, optionId)"
        @update:text-values="
          ({ textValue, textValueTwo }) =>
            updateQuestionsWithTwoParams(Q27Value, 25, textValue, textValueTwo)
        "
      />
      <InputRadioBase
        v-model="Q27Value"
        :question-id="25"
        option-id="Q27O2"
        is-default
        name="Q27"
        label="a Bérbeadó 8 napos póthatáridő tűzésével szólíthatja fel, ha a Bérlő erre sem fizet, a Bérbeadó felmondhat a felmondást követő hónap utolsó napjára (a felmondási idő minimum 15 nap)."
      />
    </QuestionBlock>

    <!-- Q28 - 3/8 -->
    <QuestionBlock
      title="Bérbeadó ellenőrzési joga"
      sub-text="A Bérlemény ellenőrzésének időpontját"
      placement="3/8."
    >
      <InputRadioText
        v-model:option="Q28Value"
        :question-id="26"
        option-id="Q28O1"
        name="Q28"
        label-start="a Bérbeadónak először fel kell szólítania a Bérlőt, ha ezután sem változtat, Bérbeadó felmondhat a felmondást követő hónap utolsó napjára, a felmondási idő"
        label-end="nap. A Bérlő súlyos magatartása esetén is fel kell szólítani előzetesen, a Bérbeadó enélkül nem mondhat fel."
        :min="15"
        :max="365"
        :step="1"
        :width="45"
        @update:model-value="(optionId: string) => updateQuestions(optionId, 26)"
        @update:text-value="(textValue: string) => updateQuestions(Q28Value, 26, textValue)"
      />
      <InputRadioBase
        v-model="Q28Value"
        :question-id="26"
        is-default
        option-id="Q28O2"
        name="Q28"
        label="a Bérbeadónak először fel kell szólítania a Bérlőt, ha ezután sem változtat, Bérbeadó felmondhat a felmondást követő hónap utolsó napjára, a felmondási idő minimum 15 nap. A Bérlő súlyos magatartása esetén nem kell előzetesen felszólítania, a Bérbeadó enélkül felmondhat."
      />
      <InputRadioBase
        v-model="Q28Value"
        :question-id="26"
        option-id="Q28O3"
        name="Q28"
        label="a Bérbeadónak először fel kell szólítania a Bérlőt, ha ezután sem változtat, Bérbeadó felmondhat a felmondás hónapjának utolsó napjára, a felmondási idő minimum 15 nap. A Bérlő súlyos magatartása esetén nem kell előzetesen felszólítania, a Bérbeadó enélkül felmondhat."
      />
    </QuestionBlock>

    <!-- Q29 - 4/8 -->
    <QuestionBlock
      title="Vevőjelöltek megtekintési joga"
      sub-text="A Bérlő"
      placement="4/8."
    >
      <InputRadioBase
        v-model="Q29Value"
        :question-id="27"
        option-id="Q29O1"
        name="Q29"
        label="nem köteles megengedni, hogy a vevőjelölt a Bérleményt előzetesen megnézhesse."
      />
      <InputRadioBase
        v-model="Q29Value"
        :question-id="27"
        is-default
        option-id="Q29O2"
        name="Q29"
        label="köteles megengedni, hogy a vevőjelölt a Bérleményt előzetesen megnézhesse, a Bérlő szükségtelen háborítása nélkül."
      />
      <InputRadioBase
        v-model="Q29Value"
        :question-id="27"
        option-id="Q29O3"
        name="Q29"
        label="köteles megengedni, hogy a vevőjelölt a Bérleményt előzetesen megnézhesse, a Bérbeadó által előre meghatározott időpontban."
      />
    </QuestionBlock>

    <!-- Q30 - 5/8 -->
    <QuestionBlock
      title="A Bérlemény eladása"
      sub-text="Ha a Bérbeadó a bérlet ideje alatt eladja a Bérleményt"
      placement="5/8."
    >
      <InputRadioBase
        v-model="Q30Value"
        :question-id="28"
        is-default
        option-id="Q30O1"
        name="Q30"
        label="az új tulajdonos lép a Bérbeadó helyébe, de a Bérlő felé mindketten felelnek a bérleti szerződésből eredő kötelezettségek teljesítéséért."
      />
      <InputRadioBase
        v-model="Q30Value"
        :question-id="28"
        option-id="Q30O2"
        name="Q30"
        label="az új tulajdonos lép a Bérbeadó helyébe, és az eladást követően csak az új tulajdonos felel a Bérlő felé a bérleti szerződésből eredő kötelezettségek teljesítéséért."
      />
    </QuestionBlock>

    <!-- Q31 - 6/8 -->
    <QuestionBlock
      title="A bérlet megszűnése előtt új bérlőjelöltek megtekintési joga"
      sub-text="A bérlet megszűnése előtt"
      placement="6/8."
    >
      <InputRadioBase
        v-model="Q31Value"
        :question-id="29"
        option-id="Q31O1"
        name="Q31"
        label="a Bérlőnek nem kell lehetővé kell tennie, hogy az új bérlőjelöltek a Bérleményt megnézhessék."
      />
      <InputRadioBase
        v-model="Q31Value"
        :question-id="29"
        is-default
        option-id="Q31O2"
        name="Q31"
        label="a Bérlőnek lehetővé kell tennie, hogy az új bérlőjelöltek a Bérleményt megnézhessék."
      />
      <InputRadioBase
        v-model="Q31Value"
        :question-id="29"
        option-id="Q31O3"
        name="Q31"
        label="a Bérlőnek lehetővé kell tennie, hogy az új bérlőjelöltek a Bérleményt megnézhessék, olyan időben és módon, ahogy azt a Bérbeadó meghatározza."
      />
    </QuestionBlock>

    <!-- Q32 - 7/8 -->
    <QuestionBlock
      title="A Bérlemény visszaadása"
      sub-text="A bérlet megszűnésekor a Bérleményt és a berendezéseket"
      placement="7/8."
    >
      <InputRadioBase
        v-model="Q32Value"
        :question-id="30"
        option-id="Q32O1"
        name="Q32"
        label="a Bérbeadó teszi rendeltetésszerű használatra alkalmassá, aminek a költségeit a Bérlő állja."
      />
      <InputRadioBase
        v-model="Q32Value"
        :question-id="30"
        option-id="Q32O2"
        is-default
        name="Q32"
        label="a Bérlő rendeltetésszerű használatra alkalmas állapotban adja vissza a Bérbeadónak."
      />
    </QuestionBlock>

    <!-- Q33 - 8/8 -->
    <QuestionBlock
      title="Bérlő elviteli joga"
      sub-text="A Bérlő a bérlet megszűnésekor a Bérleményre felszerelt, a Bérlemény épségének sérelme nélkül eltávolítható dolgait"
      placement="8/8."
    >
      <InputRadioBase
        v-model="Q33Value"
        :question-id="31"
        option-id="Q33O1"
        name="Q33"
        label="leszerelheti és elviheti, kivéve ha a Bérbeadó kártalanítást ajánl fel és a Bérlő azt elfogadja, de a kártalanítás elfogadására Bérlő semmilyen esetben sem kötelezhető."
      />
      <InputRadioBase
        v-model="Q33Value"
        :question-id="31"
        is-default
        option-id="Q33O2"
        name="Q33"
        label="leszerelheti és elviheti, kivéve ha a Bérbeadó ehelyett kártalanítást ajánl fel, és ez a Bérlőnek jogi érdeksérelmet nem okoz."
      />
      <InputRadioBase
        v-model="Q33Value"
        :question-id="31"
        option-id="Q33O3"
        name="Q33"
        label="leszerelheti és elviheti, kivéve ha a Bérbeadó ehelyett kártalanítást ajánl fel, amit a Bérlő minden esetben köteles elfogadni."
      />
    </QuestionBlock>
  </section>
</template>

<style></style>
