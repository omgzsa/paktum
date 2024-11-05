<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

const contractStore = useContractStore();
const { questions } = storeToRefs(contractStore);
const { getQuestion, addQuestion } = contractStore;

const createValue = (questionId: number) =>
  computed({
    get: () => getQuestion(questionId)?.optionId,
    set: (newOptionId) => {
      updateQuestions(newOptionId, questionId);
    },
  });

const Q12Value = createValue(18);
const Q13Value = createValue(19);
const Q22Value = createValue(20);
const Q23Value = createValue(21);
const Q24Value = createValue(22);
const Q25Value = createValue(23);

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
</script>

<template>
  <section class="">
    <!-- Q12 - 1/6 -->
    <QuestionBlock
      title="Bérlő kárfelelőssége az okozott károkért"
      sub-text="Ha a Bérleményben a Bérlő vagy a vele együttlakó kárt okoz"
      placement="1/6."
    >
      <template #hint>
        <AppTooltip
          class="ml-auto -mt-2 -mb-2 sm:-mt-8"
          :width="300"
          label="§ Kárfelelősség"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              A Polgári Törvénykönyv szerint a Bérlő felelőssége a károkért
              objektív, azaz attól független, hogy neki felróható-e a károkozó
              magatartás, de bizonyos feltételek esetén mentesülhet.
            </p>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Ettől eltérhetsz a Bérlő javára akként, hogy csak akkor lesz
              felelős a károkért, ha a magatartása neki felróható - ez egy
              enyhébb felelősségi alakzat.
            </p>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              A Bérbeadó javára akként térhetsz el, hogy kizárod a Bérlő
              mentesülésének lehetőségét, azaz ha kár keletkezik a Bérleményben,
              mindenképpen helyt kell érte állnia.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="Q12Value"
        :question-id="18"
        option-id="Q12O1"
        name="Q12"
        label="a Bérbeadó a hiba kijavítását vagy a kár megtérítését követelheti, a Bérlő csak akkor mentesül, ha bizonyítja, hogy a Bérlő vagy a vele együttlakó személyek magatartása nem volt felróható."
      />
      <InputRadioBase
        v-model="Q12Value"
        :question-id="18"
        option-id="Q12O2"
        name="Q12"
        is-default
        label="a Bérbeadó a hiba kijavítását vagy a kár megtérítését követelheti, a Bérlő csak akkor mentesül, ha bizonyítja, hogy a szerződésszegést ellenőrzési körén kívül eső, a szerződéskötés időpontjában előre nem látható körülmény okozta, és nem volt elvárható, hogy a körülményt elkerülje vagy a kárt elhárítsa."
      />
      <InputRadioBase
        v-model="Q12Value"
        :question-id="18"
        option-id="Q12O3"
        name="Q12"
        label="a Bérbeadó a hiba kijavítását vagy a kár megtérítését követelheti, a Bérlő nem mentesülhet."
      />
    </QuestionBlock>

    <!-- Q13 - 2/6 -->
    <QuestionBlock
      title="Bérlő beszámítási joga"
      sub-text="A Bérlő a bérleti díjba a Bérbeadóval szemben fennálló pénzkövetelését"
      placement="2/6."
    >
      <InputRadioBase
        v-model="Q13Value"
        :question-id="19"
        option-id="Q13O1"
        name="Q13"
        label="egyoldalú nyilatkozatával beszámíthatja."
      />
      <InputRadioBase
        v-model="Q13Value"
        :question-id="19"
        option-id="Q13O2"
        name="Q13"
        is-default
        label="nem számíthatja be."
      />
    </QuestionBlock>

    <!-- Q22 - 3/6 -->
    <QuestionBlock
      title="Bérbeadó kellékszavatossági felelőssége"
      sub-text="Ha a Bérlemény a bérlet alatt rendeltetésszerű használatra alkalmatlan állapotban van, vagy abba kerül"
      placement="3/6."
    >
      <template #hint>
        <AppTooltip
          class="ml-auto -mb-2 md:-mt-4"
          :width="300"
          label="§ Kellékszavatosság"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Azt jelenti, hogy a Bérbeadó a Bérlemény hibájáért felelősséggel
              tartozik a Bérlő felé. A kellékszavatosság független attól, hogy a
              Bérbeadó tudott-e a Bérlemény hibájáról, vagy sem.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="Q22Value"
        :question-id="20"
        option-id="Q22O1"
        name="Q22"
        is-default
        label="a Bérlő elsősorban kijavítást követelhet; ha a Bérbeadó nem vállalja, vagy nem tud neki eleget tenni, vagy a Bérlőnek a kijavításhoz fűződő érdeke megszűnt, a Bérlő arányos bérleti díj leszállítást követelhet, vagy a hibát a Bérbeadó költségére kijavíttathatja, vagy a szerződést felmondhatja."
        @update:model-value="(optionId: string) => updateQuestions(optionId, 20)"
      />
      <InputRadioBase
        v-model="Q22Value"
        :question-id="20"
        option-id="Q22O2"
        name="Q22"
        label="a Bérlő elsősorban kijavítást követelhet; ha a Bérbeadó nem vállalja, vagy nem tud neki eleget tenni, vagy a Bérlőnek a kijavításhoz fűződő érdeke megszűnt, a Bérlő a hibát a Bérbeadó költségére kijavíttathatja, de arányos bérleti díj leszállítást nem követelhet, és a szerződést nem mondhatja fel."
        @update:model-value="(optionId: string) => updateQuestions(optionId, 20)"
      />
    </QuestionBlock>

    <!-- Q23 - 4/6 -->
    <QuestionBlock
      title="Bérbeadó jogszavatossági felelőssége"
      sub-text="Ha harmadik személy joga a Bérlőt a Bérlemény használatában korlátozza vagy megakadályozza"
      placement="4/6."
    >
      <template #hint>
        <AppTooltip
          :width="300"
          label="§ Jogszavatosság"
          class="ml-auto -mb-2 md:-mt-4"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Azt jelenti, hogy a Bérbeadó felel azért, hogy másnak nincs olyan
              joga, ami a Bérlőt korlátozná, vagy megakadályozná a Bérlemény
              használatában. Pl. ha a Bérleményt valaki másnak a haszonélvezeti
              joga is terheli, e személy korlátozhatja a Bérlőt a Bérlemény
              használatában, mivel neki is van használatra vonatkozó joga.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="Q23Value"
        :question-id="21"
        option-id="Q23O1"
        name="Q23"
        is-default
        label="a Bérlő elsősorban határidő tűzésével tehermentesítést követelhet; ha a határidő eredménytelenül telt el, a Bérlő tehermentesítést a Bérbeadó költségére elvégezheti, vagy ha az lehetetlen vagy aránytalan költséggel járna, a szerződést felmondhatja és kártérítést követelhet, vagy a teher átvállalása fejében a bérleti díj megfelelő csökkentését követelheti."
        @update:model-value="(optionId: string) => updateQuestions(optionId, 21)"
      />
      <InputRadioBase
        v-model="Q23Value"
        :question-id="21"
        option-id="Q23O2"
        name="Q23"
        label="a Bérlő elsősorban határidő tűzésével tehermentesítést követelhet; ha a határidő eredménytelenül telt el, a Bérlő tehermentesítést a Bérbeadó költségére elvégezheti, vagy ha az lehetetlen vagy aránytalan költséggel járna, a szerződést felmondhatja de kártérítést nem követelhet, és a teher átvállalása fejében a bérleti díj megfelelő csökkentését sem követelheti."
        @update:model-value="(optionId: string) => updateQuestions(optionId, 21)"
      />
    </QuestionBlock>

    <!-- Q24 - 5/6 -->
    <QuestionBlock
      title=" Bérlő kárfelelőssége az okozott károkért"
      sub-text="Ha a Bérleményben a Bérlő vagy a vele együttlakó kárt okoz"
      placement="5/6."
    >
      <template #hint>
        <AppTooltip
          :width="300"
          label="§ Zálogjog"
          class="ml-auto -mb-2 md:-mt-4"
        >
          <template #content>
            <p class="text-xs font-normal tracking-wide text-neutral-100">
              Azt jelenti, hogy ha a Bérlő nem fizet a Bérbeadónak, a Bérbeadó
              zálogjogánál fogva a kielégítést kereshet a Bérlő Bérleményben
              található tárgyaiból. Pl. eladhatja a TV-t, és a befolyt vételárat
              a Bérlő bérleti díj tartozására számolhatja el.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioBase
        v-model="Q24Value"
        :question-id="22"
        option-id="Q24O1"
        name="Q24"
        label="nem áll fenn."
      />
      <InputRadioBase
        v-model="Q24Value"
        :question-id="22"
        option-id="Q24O2"
        name="Q24"
        is-default
        label="fennáll, de ha a Bérlő a zálogjog érvényesítését kifogásolja, a Bérbeadó köteles azt bírósági úton érvényesíteni, ellenkező esetben a zálogjoga megszűnik."
      />
      <InputRadioBase
        v-model="Q24Value"
        :question-id="22"
        option-id="Q24O3"
        name="Q24"
        label="fennáll, és ha a Bérlő a zálogjog érvényesítését kifogásolja, de azt a Bérbeadó bírósági úton nem érvényesíti, Bérbeadó zálogjoga akkor is fennmarad."
      />
    </QuestionBlock>

    <!-- Q25 - 6/6 -->
    <QuestionBlock
      title="Bérbeadó ellenőrzési joga"
      sub-text="A Bérlemény ellenőrzésének időpontját"
      placement="6/6."
    >
      <InputRadioText
        v-model:option="Q25Value"
        :question-id="23"
        option-id="Q25O1"
        name="Q25"
        label-start="Bérlő határozza meg, évi"
        label-end="alkalommal."
        :min="0"
        :max="365"
        :step="1"
        :width="45"
        @update:model-value="(optionId: string) => updateQuestions(optionId, 23)"
        @update:text-value="(textValue: string) => updateQuestions(Q25Value, 23, textValue)"
      />
      <InputRadioText
        v-model:option="Q25Value"
        :question-id="23"
        option-id="Q25O2"
        name="Q25"
        label-start="Bérbeadó és Bérlő közösen határozza meg, évi"
        label-end="alkalommal."
        :min="0"
        :max="365"
        :step="1"
        :width="45"
        is-default
        @update:model-value="(optionId: string) => updateQuestions(optionId, 23)"
        @update:text-value="(textValue: string) => updateQuestions(Q25Value, 23, textValue)"
      />
    </QuestionBlock>
  </section>
</template>
