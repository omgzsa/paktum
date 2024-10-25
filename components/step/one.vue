<script lang="ts" setup>
import { useContractStore } from '@/stores/contract';

const contractStore = useContractStore();
const { ptkSelected, ltvSelected } = storeToRefs(contractStore);

const items = [
  {
    label: 'Mit jelent ez?',
    icon: 'i-heroicons-information-circle',
    defaultOpen: false,
    slot: 'content',
  },
];
</script>

<template>
  <section>
    <QuestionBlock
      title="Az alábbi háttérjogszabályok szövegét kérem a bérleti szerződésembe"
      sub-text=""
      placement="1."
    >
      <InputChboxPrice
        v-model="ptkSelected"
        name="ptkSelected"
        label="Polgári Törvénykönyv (2013. évi V. törvény)"
        price="2500"
      />
      <InputChboxPrice
        v-model="ltvSelected"
        name="ltvSelected"
        label="Lakástörvény (1993. évi LXXVIII. törvény)"
        price="3500"
      />
    </QuestionBlock>

    <UAccordion :items="items" class="max-w-2xl mx-auto">
      <template #default="{ item, index, open }">
        <UButton
          color="gray"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'py-3' } }"
        >
          <span class="truncate">{{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-up-20-solid"
              class="w-5 h-5 transition-transform duration-200 transform ms-auto"
              :class="[open && 'rotate-180']"
            />
          </template>
        </UButton>
      </template>
      <template #content>
        <div class="py-3 space-y-4">
          <h4>A háttérjogszabály</h4>
          <p>
            Ha a szerződés nem szabályoz egy kérdést, de a törvény igen, a
            kérdésben a háttérjogszabály rendelkezéseit kell alkalmazni. Ha
            szerződéseddel akarsz szabályozni egy kérdéskört, a
            háttérjogszabálytól függ, hogy a törvénytől eltérhetsz-e, és ha
            igen, kinek a javára.
          </p>
          <h4>Polgári Törvénykönyv és Lakástörvény a bérleti szerződésben</h4>
          <p>
            A lakáscélú bérleti szerződések háttérjogszabályai a Polgári
            Törvénykönyv és a Lakástörvény. A szerződésben a Polgári
            Törvénykönyvtől mindkét fél javára, viszont a Lakástörvénytől -
            néhány kivételtől eltekintve - csak a Bérlő javára el lehet térni.
            Ha szeretnéd, hogy a szerződésedben szerepeljen a jogszabályok
            szövege is, pipáld ki fentebb!
          </p>
        </div>
      </template>
    </UAccordion>
  </section>
</template>
