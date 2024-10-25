<script lang="ts" setup>
import { schemas } from './schemas.js';

/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData: any) {
  console.log(JSON.stringify(formData, null, 2));
}

definePageMeta({
  layout: 'contract',
});
</script>

<template>
  <UContainer class="pt-10 md:gap-8 md:grid md:grid-cols-8">
    <!-- left aside -->
    <!-- <div class="col-span-1"></div> -->
    <FormWrapper
      :validation-schema="schemas"
      @submit="onSubmit"
      class="col-span-8"
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
    </FormWrapper>
    <!-- right aside -->
    <!-- <div class="col-span-1"></div> -->
  </UContainer>
</template>
