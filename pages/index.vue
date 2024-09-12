<script setup lang="ts">
// import { Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// break down the validation steps into multiple schemas
const validationSchema = [
  //
];

/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData: any) {
  console.log(JSON.stringify(formData, null, 2));
}
</script>

<template>
  <div>
    <UContainer>
      <TheColorSwitcher />
      <h1>Kösd meg bérleti szerződésed otthonról, gyorsan, egyszerűen</h1>
      <h2>Lorem ipsum dolor sit ame</h2>
      <h3>Válaszd ki a szerződés típusát</h3>
      <p class="pb-16">Ha a szerződés nem szabályoz egy kérdéskört, de a törvény igen,  a kérdésben a háttérjogszabály rendelkezéseit kell alkalmazni. Ha szerződéseddel akarsz szabályozni egy kérdéskört, a háttérjogszabálytól függ, hogy a törvényi rendelkezésektől eltérhetsz-e, és ha igen, milyen irányba.</p>

      <FormWrapper :validation-schema="validationSchema" @submit="onSubmit">
        <FormStep>
          #1
        </FormStep> 

        <FormStep>
          #2
          <Field
            name="password"
            type="password"
            placeholder="Type a strong one"
          />
          <ErrorMessage name="password" />

          <Field
            name="confirmPass"
            type="password"
            placeholder="Confirm your password"
          />
          <ErrorMessage name="confirmPass" />
        </FormStep>

        <FormStep>
          <Field name="favoriteDrink" as="select">
            <option>Select a drink</option>
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="soda">Soda</option>
          </Field>
          <ErrorMessage name="favoriteDrink" />
        </FormStep> 
      </FormWrapper>
    </UContainer>
  </div>
</template>

<style>
/*  */
</style>
