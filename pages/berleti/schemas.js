import * as yup from 'yup';

// Example static schemas for other steps
const stepOne = yup.object({
  // Add your static fields here for step one
});

// Combine static and dynamic fields using .shape()
const stepTwo = yup.object().shape({
  Q6: yup.string().required('Q6 is required'),
  Q14: yup.string().required('Q14 is required'),
  Q5: yup.string().required('Q5 is required'),
  'textInput-Q3O3': yup.string().required('Q303 is required'),
});

const stepThree = yup.object({
  // Add your static fields here for step three
});

const stepFour = yup.object({
  // Add your static fields here for step four
});

export const schemas = [stepOne, stepTwo, stepThree, stepFour];
