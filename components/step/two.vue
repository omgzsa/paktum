<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

const contractStore = useContractStore();
const { addQuestion } = contractStore;

const updateQuestions = (
  optionId: string,
  questionId: number,
  optionParamsText?: string | number
) => {
  if (optionParamsText) {
    addQuestion(questionId, optionId, [
      {
        optionParameterId: 0,
        parameter: optionParamsText,
      },
    ]);
    return;
  }

  addQuestion(questionId, optionId, []);
};
</script>

<template>
  <div>
    <AppTooltip :width="300" :cross-axis="-10" label="Ezt jó ha tudod!">
      <template #content>
        <h5 class="pb-2 text-white border-b border-b-neutral-400">
          Eltérések a válaszokban
        </h5>
        <p class="text-xs font-light tracking-wide text-neutral-100">
          Egyes kérdéskörök jogszabályi alapállapotától csak a Bérlő, más
          kérdéskörökben pedig akár a Bérlő, akár a Bérbeadó javára is
          eltérhetsz. Összeszedtük a kérdésköröket, és előre megírt eltérési
          lehetőségeket ajánlunk fel neked a jogszabályi lehetőségeknek
          megfelelően.
        </p>
        <p class="text-xs font-light tracking-wide text-neutral-100">
          “§” jellel jelöltük, hogy melyik a jogszabályi alapállapot. Ha
          szeretnél valamelyik fél javára eltérni, válaszd a számodra kedvezőbb
          megfogalmazást. Ha kiválasztottál egy eltérést, az ahhoz tartozó
          szerződéses rendelkezés akkor is szerepelni fog a szerződésedben, ha
          fentebb nem jelölted be egyik háttérjogszabályt sem.
        </p>
        <p class="text-xs font-light tracking-wide text-neutral-100">
          Ha egyik kérdésben sem szeretnél eltérni, csak gyorsan szeretnél egy
          bérleti szerződést, alul kattints a Tovább gombra hogy minden
          kérdéskörben a jogszabályi alapállapot kerüljön kiválasztásra. Így
          egyszerűen a végére érhetsz és nem kell minden kérdésen egyesével
          átmenned.
        </p>
      </template>
    </AppTooltip>

    <!-- Q6 - 1/9 -->
    <QuestionBlock
      title="A bérlemény használata"
      sub-text="A Bérleményt a Bérlőnek rendeltetésszerűen kell használnia. A rendeltetésszerű használat fogalmát"
      placement="1/9."
    >
      <InputRadioOld
        :question-id="1"
        option-id="Q6O1"
        name="Q6"
        label="a szerződés nem tartalmazza, azt csak a bírósági gyakorlat határozza meg."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 1)"
      />
      <InputRadioOld
        :question-id="1"
        option-id="Q6O2"
        name="Q6"
        label="a szerződés is tartalmazza: Bérlő köteles a kármegelőzésre, az állagvédelemre, a vagyonvédelemre, a hulladéktól mentes tisztántartásra."
        @update:model-value="(optionId) => updateQuestions(optionId, 1)"
      />
    </QuestionBlock>

    <!-- Q14 - 2/9 -->
    <QuestionBlock
      title="Albérlet"
      sub-text="A Bérlő a Bérleményt albérletbe"
      placement="2/9."
    >
      <InputRadioOld
        :question-id="2"
        option-id="Q14O1"
        name="Q14"
        label="adhatja a Bérbeadó előzetes hozzájárulása nélkül is."
        @update:model-value="(optionId) => updateQuestions(optionId, 2)"
      />
      <InputRadioOld
        :question-id="2"
        option-id="Q14O2"
        name="Q14"
        label="csak a Bérbeadó előzetes hozzájárulásával adhatja"
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 2)"
      />
      <InputRadioOld
        :question-id="2"
        option-id="Q14O3"
        name="Q14"
        label="nem adhatja."
        @update:model-value="(optionId) => updateQuestions(optionId, 2)"
      />
    </QuestionBlock>

    <!-- Q5 - 3/9 -->
    <QuestionBlock
      title="A költségviselés háttérszabálya"
      sub-text="A Bérlemény fenntartása körében"
      placement="3/9."
    >
      <InputRadioOld
        :question-id="3"
        option-id="Q5O1"
        name="Q5"
        label="a költségeket a Bérbeadó viseli."
        @update:model-value="(optionId) => updateQuestions(optionId, 3)"
      />
      <InputRadioOld
        :question-id="3"
        option-id="Q5O2"
        name="Q5"
        label="a kisebb költségeket a Bérlő, többi költséget a Bérbeadó viseli."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 3)"
      />
      <InputRadioOld
        :question-id="3"
        option-id="Q5O3"
        name="Q5"
        label="a költségeket a Bérlő viseli."
        @update:model-value="(optionId) => updateQuestions(optionId, 3)"
      />
    </QuestionBlock>

    <!-- Q3 - 4/9 -->
    <QuestionBlock
      title="Késedelmi kamat"
      sub-text="A Bérlemény fenntartása körében"
      placement="4/9."
    >
      <template #hint>
        <AppTooltip
          class="ml-auto -mt-2 -mb-2"
          :width="300"
          label="A késedelmi kamat"
        >
          <template #content>
            <p class="text-xs font-light tracking-wide text-neutral-100">
              A Polgári Törvénykönyv szerint bármilyen pénztartozás fizetési
              határidejének elmulasztása esetén késedelmi kamatot kell fizetni.
            </p>
          </template>
        </AppTooltip>
      </template>
      <InputRadioOld
        :question-id="4"
        option-id="Q3O1"
        name="Q3"
        label="nem fizet késedelmi kamatot."
        @update:model-value="(optionId) => updateQuestions(optionId, 4)"
      />
      <InputRadioOld
        :question-id="4"
        option-id="Q3O2"
        name="Q3"
        label="a jegybanki alapkamatnak megfelelő késedelmi kamatot fizet."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 4)"
      />
      <InputRadioText
        :question-id="4"
        option-id="Q3O3"
        name="Q3"
        label-start="jegybanki alapkamat +"
        label-end="% késedelmi kamatot fizet."
        :min="0"
        :max="1"
        :step="0.25"
        :width="12"
        @update:model-value="
          (options) => updateQuestions(options.modelValue, 4, options.textValue)
        "
      />
    </QuestionBlock>

    <!-- Q7 - 5/9 -->
    <QuestionBlock
      title="Bérlő értesítési kötelezettsége károsodás veszélyéről, vagy szükséges munkálatokról"
      sub-text="Ha a Bérleményben károsodás veszélye fenyeget, vagy munkálatokat kell elvégezni"
      placement="5/9."
    >
      <InputRadioOld
        :question-id="5"
        option-id="Q7O1"
        name="Q7"
        label="a Bérlőnek nem kötelező értesítenie a Bérbeadót."
        @update:model-value="(optionId) => updateQuestions(optionId, 5)"
      />
      <InputRadioOld
        :question-id="5"
        option-id="Q7O2"
        name="Q7"
        label="a Bérlőnek kötelező írásban értesítenie a Bérbeadót."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 5)"
      />
      <InputRadioOld
        :question-id="5"
        option-id="Q7O3"
        name="Q7"
        label="a Bérlőnek kötelező írásban értesítenie a Bérbeadót, a veszélyeztetett tárgyak, a várható károsodás, vagy a szükséges munkálatok pontos megjelölésével."
        @update:model-value="(optionId) => updateQuestions(optionId, 5)"
      />
    </QuestionBlock>

    <!-- Q10 - 6/9-->
    <QuestionBlock
      title="Bérlői hibaelhárítás"
      sub-text="Ha a Bérleményben egy berendezés elromlik"
      placement="6/9."
    >
      <InputRadioOld
        :question-id="6"
        option-id="Q10O1"
        name="Q10"
        label="a kijavítást a Bérlő elvégezheti a Bérbeadó előzetes felszólítása nélkül."
        @update:model-value="(optionId) => updateQuestions(optionId, 6)"
      />
      <InputRadioOld
        :question-id="6"
        option-id="Q10O2"
        name="Q10"
        label="a kijavítást a Bérlő nem végezheti el a Bérbeadó előzetes felszólítása nélkül."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 6)"
      />
    </QuestionBlock>

    <!-- Q8 - 7/9 -->
    <QuestionBlock
      title="Bérlő értesítési kötelezettsége károsodás veszélyéről, vagy szükséges munkálatokról"
      sub-text="Ha a Bérleményben károsodás veszélye fenyeget, vagy munkálatokat kell elvégezni"
      placement="7/9."
    >
      <InputRadioOld
        :question-id="7"
        option-id="Q8O1"
        name="Q8"
        label="a Bérlőnek nem kötelező értesítenie a Bérbeadót."
        @update:model-value="(optionId) => updateQuestions(optionId, 7)"
      />
      <InputRadioOld
        :question-id="7"
        option-id="Q8O2"
        name="Q8"
        label="a Bérlőnek kötelező írásban értesítenie a Bérbeadót."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 7)"
      />
    </QuestionBlock>

    <!-- Q9 -->
    <QuestionBlock
      title="Bérlő tűrési kötelezettsége korszerűsítés esetén"
      sub-text="Ha a Bérbeadónak korszerűsítési munkálatokat kell elvégeznie a Bérleményben"
      placement="8/9."
    >
      <InputRadioOld
        :question-id="8"
        option-id="Q9O1"
        name="Q9"
        label="Bérlő akkor sem köteles tűrni, hogy a Bérbeadó elvégezze a korszerűsítést, ha az nem korlátozza a használatban."
        @update:model-value="(optionId) => updateQuestions(optionId, 8)"
      />
      <InputRadioOld
        :question-id="8"
        option-id="Q9O2"
        name="Q9"
        label="Bérlő csak akkor köteles tűrni hogy a Bérbeadó elvégezze a korszerűsítést, ha az nem korlátozza a használatban."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 8)"
      />
      <InputRadioOld
        :question-id="8"
        option-id="Q9O3"
        name="Q9"
        label="Bérlő akkor is köteles tűrni, hogy a Bérbeadó elvégezze a korszerűsítést, ha az korlátozza a használatban."
        @update:model-value="(optionId) => updateQuestions(optionId, 8)"
      />
    </QuestionBlock>

    <!-- Q11 - 9/9 -->
    <QuestionBlock
      title="Jogosulatlan átalakítás"
      sub-text="Ha a Bérlő a Bérbeadó hozzájárulása nélkül végez jogosulatlan átalakítást, vagy felújítást"
      placement="9/9."
    >
      <InputRadioOld
        :question-id="9"
        option-id="Q11O1"
        name="Q11"
        label="és a Bérbeadó visszaalakításra hívja fel, Bérlő választása szerint helyreállíthatja az eredeti állapotot, vagy felhívhatja a Bérbeadót, hogy a bérlet megszűnésekor a Bérbeadó végeztesse el a visszaalakítást, azzal, hogy a költségeket a Bérlő viseli."
        @update:model-value="(optionId) => updateQuestions(optionId, 9)"
      />
      <InputRadioOld
        :question-id="9"
        option-id="Q11O2"
        name="Q11"
        label="köteles visszaalakítani, ha a Bérbeadó erre hívja fel."
        is-default
        @update:model-value="(optionId) => updateQuestions(optionId, 9)"
      />
      <InputRadioText
        :question-id="9"
        option-id="Q11O3"
        name="Q11"
        label-start="köteles visszaalakítani ha a Bérbeadó erre felhívja, valamint a Bérbeadó írásbeli felhívásától az eredeti állapot helyreállításáig napi"
        label-end=" ,- Ft kötbért fizet."
        :max="9999999"
        :width="20"
        @update:model-value="
          (options) => updateQuestions(options.modelValue, 9, options.textValue)
        "
      />
      <InputRadioTextNew
        :question-id="9"
        option-id="Q11O4"
        name="Q11"
        label-start="köteles visszaalakítani ha a Bérbeadó erre felhívja, valamint a Bérbeadó írásbeli felhívásától az eredeti állapot helyreállításáig napi"
        label-end=" ,- Ft kötbért fizet."
        :max="9999999"
        :width="20"
        @update:model-value="
          (options) => updateQuestions(options.modelValue, 9, options.textValue)
        "
      />
    </QuestionBlock>
  </div>
</template>
