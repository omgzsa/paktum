<script lang="ts" setup>
/**
 * ÖTLET:
 * jelzés, hogy vegye elő az iratait
 * szig, lkck, tulajdonilap, stb..
 * jelmagyarázat
 */
// import StepOne from '@/components/step/one.vue';
// import StepTwo from '@/components/step/two.vue';
// import StepThree from '@/components/step/three.vue';
// import StepFour from '@/components/step/four.vue';
// import StepFive from '@/components/step/five.vue';
// import StepSix from '@/components/step/six.vue';
// import StepSeven from '@/components/step/seven.vue';

import { schemas } from '@/utils/schemas.js';

// const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix, StepSeven];

// definePageMeta({
//   layout: 'contract',
// });

/**
 * Only Called when the last step is submitted
 */
 function onSubmit(formData: any) {
  console.log(JSON.stringify(formData, null, 2));
};
</script>

<template>
  <UContainer class="py-10 sm:py-16 md:gap-4 lg:gap-8 md:grid md:grid-cols-10">
    <!-- left aside -->
    <!-- <div class="hidden md:col-span-2 md:block">
      <aside
        class="sticky grid col-span-1 p-3 rounded-md top-10 ring-1 ring-neutral-400"
      >
        <UProgress color="paktum" size="sm" class="mb-4" :value="20" indicator />
        <h4 class="pb-4 mb-4 border-b">Összegzés</h4>
        <table class="mb-4 space-y-4 text-[10px] xl:text-xs border-b">
          <tr class="flex items-center justify-between gap-4">
            <td>Alap szerződés díj</td>
            <td class="flex-nowrap">5.000Ft</td>
          </tr>
          <tr class="flex items-center justify-between gap-4">
            <td>Polgári Törvénykönyv (2013. évi V. törvény)</td>
            <td class="flex-nowrap">2.500Ft</td>
          </tr>
          <tr class="flex items-center justify-between gap-4">
            <td>Lakástörvény (1993. évi LXXVIII. törvény)</td>
            <td class="flex-nowrap">2.500Ft</td>
          </tr>
          <tr class="flex items-center justify-between gap-4 pb-4">
            <td>Birtokbaadási jegyzőkönyv, állapotleírás és bútorleltár</td>
            <td class="flex-nowrap">1.000Ft</td>
          </tr>
        </table>
        <div class="flex items-center justify-between text-xs font-bold">
          <h5 class="">Összesen:</h5>
          <p class="text-xs font-bold">11.000 Ft</p>
        </div>
      </aside>
    </div> -->

    
    <!-- form -->
    <FormWrapper
      :validation-schema="schemas"
      class="col-span-10"
      @submit="onSubmit"
    >
      <FormStep>
        <StepOne />
      </FormStep>

      <FormStep>
        <StepTwo />
      </FormStep>

      <FormStep>
        <StepThree/>
      </FormStep>

      <FormStep>
        <StepFour />
      </FormStep>

      <FormStep>
        <StepFive />
      </FormStep>

      <FormStep>
        <StepSix />
      </FormStep>
      
      <FormStep>
        <StepSeven />
      </FormStep>
    </FormWrapper>
    <!-- right aside -->
    <!-- <div class="col-span-1"></div> -->
  </UContainer>
</template>
