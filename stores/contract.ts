import type { Owner, Renter, PublicDocument, Question } from '@/types';

export const useContractStore = defineStore('contract', () => {
  const contractId = ref(0);
  const userId = ref(1);

  const subjectProperty = ref({
    subjectPropertyId: 0,
    parcelNumber: "",
    country: "",
    zipCode: "",
    city: "",
    address: "",
    size: '',
    independentHouse: false, // extra
    condominiumApartment: false, // extra
    hasFurniture: false,
    noFurniture: false, // extra
    inventoryDocument: false,
    numberOfKeys: 2,
    smokingPermitted: false,
    smokingNotPermitted: false, // extra
    petsAllowed: false,
    petsNotAllowed: false, // extra
    addressCardPermitted: false,
    tempAddressCardPermitted: false,
    addressCardNotPermitted: false, // extra
    annualInspectionDays: 0, // extra
    propertyEmptied: false,
    propertyCleaned: false,
    propertyEmptiedAndCleaned: false, // extra
    propertyFurnituredByOwner: true,
    notFurnishedByOwner: false,
    // these below concatenates to address
    streetName: '', // extra
    houseNumber: '', // extra
    building: '', // extra
    staircase: '', // extra
    floor: '', // extra
    door: '', // extra
    publicAreaType: '', // extra
  });

  const contractStartDate = ref(new Date());
  const contractEndDate = ref(new Date());
  const propertyUsageStartDate = ref(new Date());
  const definiteContractPeriod = ref(true);
  const undefiniteContractPeriod = ref(false); // extra

  const cohabitants = ref([
    {
      firstName: "Pista",
      lastName: "Kis",
    },
    {
      firstName: "Pista",
      lastName: "Nagy",
    }
  ]);

  const owners = ref<Owner[]>([
    {
      ownerId: 0,
      contractId: 0,
      firstName: "owners.firstName",
      lastName: "owners.lastName",
      birthDate: new Date(),
      birthPlace: "owners.birthPlace",
      mothersName: "owners.mothersName",
      country: "owners.country",
      city: "owners.city",
      zipcode: "owners.zipcode",
      address: "Fő utca 11",
      idCardType: "owners.idCardType",
      idCardNumber: "owners.idCardNumber",
      bankName: "K&H",
      bankAccount: "12345678-12345678-12345678",
      // these below concatenates to address
      streetName: '', // extra
      houseNumber: '', // extra
      building: undefined, // extra
      staircase: undefined, // extra
      floor: undefined, // extra
      door: undefined, // extra
      publicAreaType: '', // extra
    }
  ]);

  const renters = ref<Renter[]>([
    {
      renterId: 0,
      contractId: 0,
      firstName: "renters.firstName",
      lastName: "renters.lastName",
      birthDate: new Date(),
      birthPlace: "renters.birthPlace",
      mothersName: "renters.mothersName",
      country: "renters.country",
      city: "renters.city",
      zipcode: "renters.zipcode",
      address: "Teszt utca 2",
      idCardType: "renters.idCardType",
      idCardNumber: "renters.idCardNumber",
      // these below concatenates to address
      streetName: '', // extra
      houseNumber: '', // extra
      building: undefined, // extra
      staircase: undefined, // extra
      floor: undefined, // extra
      door: undefined, // extra
      publicAreaType: '', // extra
    }
  ]);

  const paymentDetail = ref({
    previousMonth: false,
    currentMonth: false,
    paymentDetailId: 0,
    rentingFee: 0,
    paymentDeadlineDay: 1,
    bankName: "K&H Bank",
    accountNumber: "12345678-12345678-12345678",
    cash: false,
    transfer: false, // extra
    firstPaymentDate: ref(new Date()),
    paymentCurrency: "Magyar forint (HUF)",
    paymentDocument: false,
  });

  const questions = ref<Question[]>([
    {
      questionId: 1,
      questionSelectedOptionIdentifier: 'Q6O1',
      optionParameters: [],
    },
    {
      questionId: 2,
      questionSelectedOptionIdentifier: 'Q14O2',
      optionParameters: [],
    },
    {
      questionId: 3,
      questionSelectedOptionIdentifier: 'Q5O2',
      optionParameters: [],
    },
    {
      questionId: 4,
      questionSelectedOptionIdentifier: 'Q3O2',
      optionParameters: [
        {
          optionParameterId: 0,
          parameter: '0',
        }
      ],
    },
    {
      questionId: 5,
      questionSelectedOptionIdentifier: 'Q7O2',
      optionParameters: [],
    },
    {
      questionId: 6,
      questionSelectedOptionIdentifier: 'Q10O2',
      optionParameters: [],
    },
    {
      questionId: 7,
      questionSelectedOptionIdentifier: 'Q8O2',
      optionParameters: [],
    },
    {
      questionId: 8,
      questionSelectedOptionIdentifier: 'Q9O2',
      optionParameters: [],
    },
    {
      questionId: 9,
      questionSelectedOptionIdentifier: 'Q11O2',
      optionParameters: [{
        optionParameterId: 0,
        parameter: '',
      }],
    },
    {
      // Q15
      questionId: 10,
      questionSelectedOptionIdentifier: '',
      optionParameters: [],
    },
    {
      questionId: 11,
      questionSelectedOptionIdentifier: 'Q4O2',
      optionParameters: [],
    },
    {
      questionId: 12,
      questionSelectedOptionIdentifier: 'Q16O2',
      optionParameters: [],
    },
    {
      questionId: 13,
      questionSelectedOptionIdentifier: 'Q17O2',
      optionParameters: [],
    },
    {
      questionId: 14,
      questionSelectedOptionIdentifier: 'Q21O2',
      optionParameters: [],
    },
    {
      questionId: 15,
      questionSelectedOptionIdentifier: 'Q18O2',
      optionParameters: [],
    },
    {
      questionId: 16,
      questionSelectedOptionIdentifier: 'Q19O1',
      optionParameters: [],
    },
    {
      questionId: 17,
      questionSelectedOptionIdentifier: 'Q20O2',
      optionParameters: [],
    },
    {
      questionId: 18,
      questionSelectedOptionIdentifier: 'Q12O2',
      optionParameters: [],
    },
    {
      questionId: 19,
      questionSelectedOptionIdentifier: 'Q13O2',
      optionParameters: [],
    },
    {
      questionId: 20,
      questionSelectedOptionIdentifier: 'Q22O1',
      optionParameters: [],
    },
    {
      questionId: 21,
      questionSelectedOptionIdentifier: 'Q23O1',
      optionParameters: [],
    },
    {
      questionId: 22,
      questionSelectedOptionIdentifier: 'Q24O2',
      optionParameters: [],
    },
    {
      questionId: 23,
      questionSelectedOptionIdentifier: 'Q25O2',
      optionParameters: [
        {
          optionParameterId: 0,
          parameter: '',
        }
      ],
    },
    {
      questionId: 24,
      questionSelectedOptionIdentifier: 'Q26O2',
      optionParameters: [],
    },
    {
      questionId: 25,
      questionSelectedOptionIdentifier: 'Q27O2',
      optionParameters: [],
    },
    {
      questionId: 26,
      questionSelectedOptionIdentifier: 'Q28O2',
      optionParameters: [],
    },
    {
      questionId: 27,
      questionSelectedOptionIdentifier: 'Q29O2',
      optionParameters: [],
    },
    {
      questionId: 28,
      questionSelectedOptionIdentifier: 'Q30O1',
      optionParameters: [],
    },
    {
      questionId: 29,
      questionSelectedOptionIdentifier: 'Q31O2',
      optionParameters: [],
    },
    {
      questionId: 30,
      questionSelectedOptionIdentifier: 'Q32O2',
      optionParameters: [],
    },
    {
      questionId: 31,
      questionSelectedOptionIdentifier: 'Q33O2',
      optionParameters: [],
    },
    {
      questionId: 32,
      questionSelectedOptionIdentifier: 'Q2O1',
      optionParameters: [],
    },
    {
      questionId: 33,
      questionSelectedOptionIdentifier: 'Q1O1',
      optionParameters: [],
    },
  ]);

  const selectedLanguages = ref([
    {
      languageId: 0,
      languageCode: "string",
      languageName: "string",
    }
  ]);

  const indexing = ref({
    indexingId: 0,
    contractId: 0,
    indexingType: "",
    indexingNotifyDate: ref(new Date()),
  });

  const ptkSelected = ref(false)
  const ltvSelected = ref(false)

  const utilityExpenses = ref({
    utilityExpensesId: 0,
    contractId: 0,
    bankName: "K&H Bank",
    bankAccount: "12345678-12345678-12345678",
    cash: false,
    payedByOwner: false,
    payedToProvider: false,
    paymentDocument: false,
  });

  const deposit = ref({
    depositId: 0,
    contractId: 0,
    payedWhen: "string", // extra
    paymentDate: ref(new Date()),
    amount: 0,
    currency: "string",
    nbOfMonths: 1,
    bankName: "",
    bankAccount: "",
    cash: false,
    transfer: false, // extra
    paymentDocument: false,
    depositPaybackDays: 0,
    depositRefillDays: 0,
    mustRefill: false,
    mustNotRefill: false, // extra
    contractTerminationPossibleOnNoRefill: false,
    contractTerminationPossibleOnNoNotRefill: false, // extra
  });

  // whole object extra
  const publicDocument = ref<PublicDocument>({
    movingOut: false,
    paymentObligation: false,
    servicePresumption: false,
    paidBy: undefined,
  });

  const contractTerminationDate = ref("2024-06-21T19:43:14.217Z");
  const contractTerminationDays = ref(0);
  const contractTerminationDayInMonth = ref(0);
  const contractTerminationPossibleBeforeEndDate = ref(false);
  const contractTerminationNotPossibleBeforeEndDate = ref(false);
  const contractConfirmationDays = ref(0);
  const contractReConfirmationDays = ref(0);


  const damageReport = ref(false);
  const damageReportWithPhotoAndVideo = ref(false); // extra
  const damageReportWithPhotoAndVideoAndProtocol = ref(false); // extra
  const notarialDocumentCostForOwner = ref(50);
  const notarialDocumentCostForRenter = ref(50); // extra
  const energeticCertificateRequired = ref(false);
  const energeticCertificateNotRequired = ref(false); // extra
  const condominiumFoundingDocument = ref(false);
  const orgRules = ref(false);
  const houseRules = ref(false);

  const moveOut = ref(false); // extra
  const paymentObligation = ref(false);
  const noPaymentObligation = ref(false); // extra
  const presumptionOfDelivery = ref(false); // extra
  const eSignature = ref(false);
  const noSignature = ref(false); // extra
  const penalityChange = ref('');
  const isDifferentMailingAddress = ref(false); // extra

  // GETTERS
  
  // ACTIONS
  const addQuestion = (
    questionId: number, 
    optionId: string, 
    optionParameters?: Array<{ optionParameterId: number, parameter: number | string }>
  ) => {
    const existingQuestionIndex = questions.value.findIndex(q => q.questionId === questionId);
  
    if (existingQuestionIndex !== -1) {
      // If the question exists, update its selected option
      questions.value[existingQuestionIndex].questionSelectedOptionIdentifier = optionId;
      questions.value[existingQuestionIndex].optionParameters = optionParameters;
    } else {
      // If the question doesn't exist, add it to the array
      questions.value.push({
        questionId,
        questionSelectedOptionIdentifier: optionId,
        optionParameters,
      });
    }
  };

  const removeQuestion = (questionId: number) => {
    const existingQuestionIndex = questions.value.findIndex(q => q.questionId === questionId);
  
    if (existingQuestionIndex !== -1) {
      questions.value.splice(existingQuestionIndex, 1);
    }
  };

  const getQuestion = (questionId: number) => {
    const question = questions.value.find(q => q.questionId === questionId);

    return {
      questionId: question?.questionId,
      optionId: question?.questionSelectedOptionIdentifier || '',
      optionParameters: question?.optionParameters || [],
    }
  };

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
    param1?: string | number,
    param2?: string | number
  ) => {
    const stringParam = JSON.stringify(param1) || '';
    const stringParamTwo = JSON.stringify(param2) || '';
  
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

  const updateDepositAmount = (times: number = 1) => {
    if (!deposit.value.amount) {
      deposit.value.amount = paymentDetail.value.rentingFee;
    } else {
      deposit.value.amount = paymentDetail.value.rentingFee * times;
    }

    return deposit.value.amount;
  };

  const updateNotarialCosts = (type: 'owner' | 'renter', value: number) => {
    // Strict input validation
    // 1. Ensure the input is a number
    // 2. Round to one decimal place (for precision)
    // 3. Clamp between 0.1 and 99.9
    const parsedValue = Math.max(0.1, Math.min(99.9, 
      Number(value.toFixed(1)) || 0.1
    ))
  
    if (publicDocument.value.paidBy === 'both') {
      if (type === 'owner') {
        notarialDocumentCostForOwner.value = parsedValue
        notarialDocumentCostForRenter.value = Math.max(0.1, Math.min(99.9, 100 - parsedValue))
      } else {
        notarialDocumentCostForRenter.value = parsedValue
        notarialDocumentCostForOwner.value = Math.max(0.1, Math.min(99.9, 100 - parsedValue))
      }
    } else {
      // If not split, update the value directly
      if (type === 'owner') {
        notarialDocumentCostForOwner.value = parsedValue
      } else {
        notarialDocumentCostForRenter.value = parsedValue
      }
    }
  }
  
  return {
    contractId,
    userId,
    subjectProperty,
    contractStartDate,
    contractEndDate,
    propertyUsageStartDate,
    definiteContractPeriod,
    undefiniteContractPeriod,
    cohabitants,
    owners,
    renters,
    paymentDetail,
    questions,
    selectedLanguages,
    indexing,
    ptkSelected,
    ltvSelected,
    utilityExpenses,
    deposit,
    contractTerminationDate,
    contractTerminationDays,
    contractTerminationDayInMonth,
    contractConfirmationDays,
    contractTerminationPossibleBeforeEndDate,
    contractTerminationNotPossibleBeforeEndDate,
    contractReConfirmationDays,
    damageReport,
    damageReportWithPhotoAndVideo,
    damageReportWithPhotoAndVideoAndProtocol,
    notarialDocumentCostForOwner,
    notarialDocumentCostForRenter,
    energeticCertificateRequired,
    energeticCertificateNotRequired,
    publicDocument,
    condominiumFoundingDocument,
    orgRules,
    houseRules,
    moveOut,
    eSignature,
    noSignature,
    paymentObligation,
    noPaymentObligation,
    presumptionOfDelivery,
    penalityChange,
    isDifferentMailingAddress,
    addQuestion,
    removeQuestion,
    getQuestion,
    updateQuestions,
    updateQuestionsWithTwoParams,
    updateDepositAmount,
    updateNotarialCosts,
  }
});
