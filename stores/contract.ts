interface Question {
  questionId: number,
  questionSelectedOptionIdentifier: string,
  optionParameters?: Array<{ 
    optionParameterId?: number, 
    parameter?: string | number | undefined
  }>
};

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
    independentHouse: false,
    condominiumApartment: false,
    hasFurniture: false,
    noFurniture: false,
    inventoryDocument: false,
    numberOfKeys: 2,
    smokingPermitted: false,
    smokingNotPermitted: false,
    petsAllowed: false,
    petsNotAllowed: false,
    addressCardPermitted: false,
    tempAddressCardPermitted: false,
    addressCardNotPermitted: false, // do we need it?
    annualInspectionDays: 0,
    propertyEmptied: false,
    propertyCleaned: false,
    propertyFurnituredByOwner: true,
    notFurnishedByOwner: false,
    streetName: '',
    houseNumber: '',
    building: '',
    staircase: '',
    floor: '',
    door: '',
    publicAreaType: '',
  });

  const contractStartDate = ref(new Date());
  const contractEndDate = ref(new Date());
  const propertyUsageStartDate = ref(new Date());
  const definiteContractPeriod = ref(true);
  const undefiniteContractPeriod = ref(false);

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

  const owners = ref([
    {
      ownerId: 0,
      contractId: 0,
      firstName: "János",
      lastName: "Jakab",
      birthDate: "2024-06-21T19:43:14.217Z",
      birthPlace: "Budapest",
      mothersName: "Piros Rózsa",
      country: "Magyarország",
      city: "Budapest",
      address: "Fő utca 11",
      idCardType: "személyi igazolvány",
      idCardNumber: "7328919JA",
      bankName: "K&H",
      bankAccount: "12345678-12345678-12345678",
    }
  ]);

  const renters = ref([
    {
      renterId: 0,
      contractId: 0,
      firstName: "József",
      lastName: "Teszt",
      birthDate: "2024-06-21T19:43:14.217Z",
      birthPlace: "Budapest",
      mothersName: "Hegyi Liliom",
      country: "Hungary",
      city: "Budapest",
      address: "Teszt utca 2",
      idCardType: "személyi igazolvány",
      idCardNumber: "843279ZA",
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
    transfer: false,
    firstPaymentDate: ref(new Date()),
    paymentCurrency: "Magyar forint (HUF)",
    paymentDocument: false,
  });

  const questions = ref<Array<Question>>([
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
    payedWhen: "string",
    paymentDate: ref(new Date()),
    amount: 0,
    currency: "string",
    nbOfMonths: 1,
    bankName: "",
    bankAccount: "",
    cash: false,
    transfer: false,
    paymentDocument: false,
    depositPaybackDays: 0,
    depositRefillDays: 0,
    mustRefill: false,
    mustNotRefill: false,
    contractTerminationPossibleOnNoRefill: false,
    contractTerminationPossibleOnNoNotRefill: false,
  });

  const publicDocument = ref({
    movingOut: false,
    paymentObligation: false,
    servicePresumption: false,
    paidByOwner: false,
    paidByRenter: false,
    paidByBoth: false,
  });

  const contractTerminationDate = ref("2024-06-21T19:43:14.217Z");
  const contractTerminationDays = ref(0);
  const contractTerminationDayInMonth = ref(0);
  const contractTerminationPossibleBeforeEndDate = ref(false);
  const contractTerminationNotPossibleBeforeEndDate = ref(false);
  const contractConfirmationDays = ref(0);
  const contractReConfirmationDays = ref(0);


  const damageReport = ref(false);
  const damageReportWithPhotoAndVideo = ref(false);
  const damageReportWithPhotoAndVideoAndProtocol = ref(false);
  const notarialDocumentCostForOwner = ref("");
  const energeticCertificateRequired = ref(false);
  const energeticCertificateNotRequired = ref(false);
  const condominiumFoundingDocument = ref(false);
  const orgRules = ref(false);
  const houseRules = ref(false);

  const moveOut = ref(false);
  const paymentObligation = ref(false);
  const noPaymentObligation = ref(false);
  const presumptionOfDelivery = ref(false);
  const eSignature = ref(false);
  const penalityChange = ref('');

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
    energeticCertificateRequired,
    energeticCertificateNotRequired,
    publicDocument,
    condominiumFoundingDocument,
    orgRules,
    houseRules,
    moveOut,
    eSignature,
    paymentObligation,
    noPaymentObligation,
    presumptionOfDelivery,
    penalityChange,
    addQuestion,
    removeQuestion,
    getQuestion,
    updateQuestions,
    updateQuestionsWithTwoParams,
    updateDepositAmount,
  }
});
