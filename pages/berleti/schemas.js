// import * as yup from 'yup';
import { object, string } from 'yup';

// Example static schemas for other steps
const stepOne = object({
  // Add your static fields here for step one
});

// Combine static and dynamic fields using .shape()
const stepTwo = object().shape({
  // Q6: string().required('Q6 is required'),
  // Q14: string().required('Q14 is required'),
  // Q5: string().required('Q5 is required'),
  // 'textInput-Q3O3': string().required('Q303 is required'),
});

const stepThree = object({
  // Q4: string().required('Q4 is required'),
});

const stepFour = object({
  // Add your static fields here for step four
});

export const schemas = [stepOne, stepTwo, stepThree, stepFour];
