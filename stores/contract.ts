export const useContractStore = defineStore('contract', () => {
  const contractId = ref(0)
  const userId = ref(1)

  const subjectProperty = ref({
    subjectPropertyId: 0,
    parcelNumber: "738291HU",
    country: "Magyarország",
    zipCode: "1094",
    city: "Budapest",
    address: "Szív utca 2",
    size: 67,
    hasFurniture: false,
    inventoryDocument: false,
    numberOfKeys: 2,
    smokingPermitted: false,
    petsAllowed: false,
    addressCardPermitted: false,
    tempAddressCardPermitted: false,
    propertyEmptied: false,
    propertyCleaned: false,
    propertyFurnituredByOwner: false,
  })

  const contractStartDate = ref("2024-06-21T19:43:14.217Z")
  const contractEndDate = ref("2024-06-21T19:43:14.217Z")
  const propertyUsageStartDate = ref("2024-06-21T19:43:14.217Z")
  const undefiniteContractPeriod = ref(false)

  const cohabitants = ref([
    {
      firstName: "Pista",
      lastName: "Kis",
    },
    {
      firstName: "Pista",
      lastName: "Nagy",
    }
  ])

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
  ])

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
  ])

  const paymentDetail = ref({
    paymentDetailId: 0,
    rentingFee: 200000,
    paymentDeadlineDay: 15,
    bankName: "K&H Bank",
    accountNumber: "12345678-12345678-12345678",
    cash: false,
    firstPaymentDate: "2024-06-21T19:43:14.217Z",
    paymentCurrency: "EUR",
    paymentDocument: false,
  })

  interface Question {
    questionId: number,
    questionSelectedOptionIdentifier: string,
    // optionParameters.paramter can be either string or number
    optionParameters?: Array<{ 
      optionParameterId: number, 
      parameter: string | number
    }>
  }

  const questions = ref<Array<Question>>([]);

  const selectedLanguages = ref([
    {
      languageId: 0,
      languageCode: "string",
      languageName: "string",
    }
  ])

  const indexing = ref({
    indexingId: 0,
    contractId: 0,
    indexingType: "EUR",
    indexingNotifyDate: "04.15.",
  })

  const ptkSelected = ref(false)
  const ltvSelected = ref(false)

  const utilityExpenses = ref({
    utilityExpensesId: 0,
    contractId: 0,
    bankName: "K&H Bank",
    bankAccount: "12345678-12345678-12345678",
    cash: false,
    payedByOwner: false,
    paymentDocument: false,
  })

  const deposit = ref({
    depositId: 0,
    contractId: 0,
    paymentDate: "2024-06-21T19:43:14.217Z",
    amount: 0,
    currency: "string",
    nbOfMonths: 0,
    bankName: "string",
    bankAccount: "string",
    cash: false,
    paymentDocument: false,
    depositPaybackDays: 0,
    depositRefillDays: 0,
    contractTerminationPossibleOnNoRefill: false,
  })

  const contractTerminationDate = ref("2024-06-21T19:43:14.217Z")
  const contractTerminationDays = ref(0)
  const contractTerminationDayInMonth = ref(0)
  const contractConfirmationDays = ref(0)
  const contractReConfirmationDays = ref(0)

  const damageReport = ref(false)
  const notarialDocumentCostForOwner = ref("Bérlő")
  const energeticCertificateRequired = ref(false)
  const condominiumFoundingDocument = ref(false)
  const orgRules = ref(false)
  const houseRules = ref(false)

  const moveOut = ref(false)
  const paymentObligation = ref(false)
  const presumptionOfDelivery = ref(false)
  
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

  return {
    contractId,
    userId,
    subjectProperty,
    contractStartDate,
    contractEndDate,
    propertyUsageStartDate,
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
    contractReConfirmationDays,
    damageReport,
    notarialDocumentCostForOwner,
    energeticCertificateRequired,
    condominiumFoundingDocument,
    orgRules,
    houseRules,
    moveOut,
    paymentObligation,
    presumptionOfDelivery,
    addQuestion,
  }
});
