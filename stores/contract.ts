import type { Owner, Renter, PublicDocument, Question } from '@/types'

export const useContractStore = defineStore('contract', () => {
    const contractId = ref(0)
    const userId = ref(1)

    const subjectProperty = ref({
        subjectPropertyId: 0,
        parcelNumber: '',
        country: '',
        zipCode: '',
        city: '',
        address: '',
        size: '',
        independentHouse: true,
        condominiumApartment: false, // extra
        hasFurniture: false,
        noFurniture: true, // extra
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
        propertyFurnituredByRenter: false,
        // these below concatenates to address
        streetName: '', // extra
        houseNumber: '', // extra
        building: '', // extra
        staircase: '', // extra
        floor: '', // extra
        door: '', // extra
        publicAreaType: '', // extra
    })

    const contractStartDate = ref(new Date())
    const contractEndDate = ref(new Date())
    const propertyUsageStartDate = ref(new Date())
    const definiteContractPeriod = ref(true) // extra
    const undefiniteContractPeriod = ref(false)

    const cohabitants = ref([
        {
            cohabitantId: 638,
            contractId: 488,
            firstName: 'Pista',
            lastName: 'Kis',
        },
        {
            cohabitantId: 639,
            contractId: 488,
            firstName: 'Zoltán',
            lastName: 'Nagy',
        },
    ])

    const owners = ref<Owner[]>([
        {
            ownerId: 485,
            contractId: 488,
            firstName: 'owners.firstName',
            lastName: 'owners.lastName',
            birthDate: 'owners.birthDate',
            birthPlace: 'owners.birthPlace',
            mothersName: 'owners.mothersName',
            country: 'owners.country',
            nationality: 'owners.nationality',
            city: 'owners.city',
            zipcode: 'owners.zipcode',
            address: 'Fő utca 11',
            idCardType: 'owners.idCardType',
            idCardNumber: 'owners.idCardNumber',
            idCardExpiration: 'owners.idCardExpiration',
            bankName: 'K&H',
            bankAccount: '12345678-12345678-12345678',
            mailingZipcode: 'owners.mailingZipcode',
            mailingCountry: 'owners.mailingCountry',
            mailingCity: 'owners.mailingCity',
            mailingAddress: 'Fő utca 11',
            taxIdentificationNumber: 'owners.taxIdentificationNumber',
            // these below concatenates to address
            streetName: 'owners.streetName', // extra
            houseNumber: 'owners.houseNumber', // extra
            building: undefined, // extra
            staircase: undefined, // extra
            floor: undefined, // extra
            door: undefined, // extra
            publicAreaType: '', // extra
            // these below concatenates to mailingAddress
            mailingStreetName: 'owners.mailingStreetName', // extra
            mailingHouseNumber: 'owners.mailingHouseNumber', // extra
            mailingBuilding: undefined, // extra
            mailingStaircase: undefined, // extra
            mailingFloor: undefined, // extra
            mailingDoor: undefined, // extra
            mailingPublicAreaType: '', // extra
        },
    ])

    const renters = ref<Renter[]>([
        {
            renterId: 0,
            contractId: 0,
            firstName: 'renters.firstName',
            lastName: 'renters.lastName',
            birthDate: 'renters.birthDate',
            birthPlace: 'renters.birthPlace',
            mothersName: 'renters.mothersName',
            nationality: 'renters.nationality',
            zipcode: 'renters.zipcode',
            country: 'renters.country',
            city: 'renters.city',
            address: 'Teszt utca 2',
            idCardType: 'renters.idCardType',
            idCardNumber: 'renters.idCardNumber',
            idCardExpiration: 'renters.idCardExpiration',
            mailingZipcode: 'renters.mailingZipcode',
            mailingCountry: 'renters.mailingCountry',
            mailingCity: 'renters.mailingCity',
            mailingAddress: 'Fő utca 11',
            taxIdentificationNumber: 'renters.taxIdentificationNumber',
            // these below concatenates to address
            streetName: 'renters.streetName', // extra
            houseNumber: 'renters.houseNumber', // extra
            building: undefined, // extra
            staircase: undefined, // extra
            floor: undefined, // extra
            door: undefined, // extra
            publicAreaType: '', // extra
            // these below concatenates to mailingAddress
            mailingStreetName: 'renters.mailingStreetName', // extra
            mailingHouseNumber: 'renters.mailingHouseNumber', // extra
            mailingBuilding: undefined, // extra
            mailingStaircase: undefined, // extra
            mailingFloor: undefined, // extra
            mailingDoor: undefined, // extra
            mailingPublicAreaType: '', // extra
        },
    ])

    const paymentDetail = ref({
        paymentDetailId: 0,
        rentingFee: 0,
        paymentDeadlineDay: 1,
        bankName: 'K&H Bank',
        accountNumber: '12345678-12345678-12345678',
        cash: true,
        firstPaymentDate: ref(new Date()),
        paymentCurrency: 'Magyar forint (HUF)',
        currentMonth: false,
        previousMonth: false, // extra
        transfer: false, // extra
        paymentDocument: false,
    })

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
                },
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
            optionParameters: [
                {
                    optionParameterId: 0,
                    parameter: '',
                },
            ],
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
                },
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
    ])

    const selectedLanguages = ref([
        {
            languageId: 0,
            languageCode: 'string',
            languageName: 'string',
        },
    ])

    const indexing = ref({
        indexingId: 0,
        contractId: 0,
        indexingType: '',
        indexingNotifyDate: new Date(), // previously ref(new Date())
    })

    const ptkSelected = ref(false)
    const ltvSelected = ref(false)

    const utilityExpenses = ref({
        utilityExpensesId: 0,
        contractId: 0,
        bankName: 'K&H Bank',
        bankAccount: '12345678-12345678-12345678',
        cash: false,
        payedByOwner: false, // This should be payedToOwner.
        payedToProvider: false, // extra
        paymentDocument: false, // extra
    })

    const deposit = ref({
        depositId: 0,
        contractId: 0,
        paymentDate: new Date(), // previously ref(new Date())
        amount: 0,
        nbOfMonths: 1,
        payedWhen: 'string', // extra
        bankName: '',
        bankAccount: '',
        cash: true,
        depositPaybackDays: 0,
        depositRefillDays: 0,
        contractTerminationPossibleOnNoRefill: false,
        currency: 'string', // extra
        transfer: false, // extra
        paymentDocument: false,
        mustRefill: false, // extra
        mustNotRefill: false, // extra
        contractTerminationNotPossibleOnNoRefill: false, // extra
    })

    // whole object extra
    const publicDocument = ref<PublicDocument>({
        movingOut: false,
        paymentObligation: false,
        servicePresumption: false,
        paidBy: undefined,
    })

    // const contractTerminationDateIfNotPaid = ref("2024-06-21T19:43:14.217Z"); // 7. oldal 6/7 ???
    const contractTerminationDays = ref(0) // 2 helyen is van 7. oldal 6/7 és 9. oldal 4/6.2
    const contractTerminationDayInMonth = ref(0)
    const contractTerminationPossibleBeforeEndDate = ref(false)
    const contractTerminationNotPossibleBeforeEndDate = ref(false)
    const contractConfirmationDays = ref(0)
    const contractReConfirmationDays = ref(0)
    const contractDatedPlace = ref('')
    const contractDatedDate = ref(new Date())

    const damageReport = ref(false)
    const damageReportWithPhotoAndVideo = ref(true) // extra
    const damageReportWithPhotoAndVideoAndProtocol = ref(false) // extra
    const notarialDocumentCostForOwner = ref(50)
    const notarialDocumentCostForRenter = ref(50) // extra
    const energeticCertificateRequired = ref(false)
    const energeticCertificateNotRequired = ref(false) // extra
    const condominiumFoundingDocument = ref(false)
    const orgRules = ref(false)
    const houseRules = ref(false)

    const moveOut = ref(false)
    const paymentObligation = ref(false)
    const noPaymentObligation = ref(false) // extra
    const presumptionOfDelivery = ref(false) // extra
    const eSignature = ref(false)
    const noSignature = ref(false) // extra
    const penalityChange = ref('')
    const isDifferentMailingAddressForOwner = ref(false) // extra
    const isDifferentMailingAddressForRenter = ref(false) // extra

    // ATTACHMENTS
    const attachment_HandoverReport = ref(false)
    const attachment_ByOwnerAgent = ref(false)
    const attachment_ByRenterAgent = ref(false)
    const attachment_CashReceiptRentFeePayment = ref(false)
    const attachment_CashReceiptDeposit = ref(false)
    const attachment_CashReceiptUtilityCost = ref(false)
    const attachment_NotificationOfModernizationWorks = ref(false)
    const attachment_DamageReport = ref(false)
    const attachment_AuthorizationRenterEsign = ref(false)
    const attachment_AuthorizationOwnerEsign = ref(false)
    const attachment_AuthorizationOwner = ref(false)
    const attachment_AuthorizationRenter = ref(false)
    const attachment_PreTerminationWarningPayment = ref(false)
    const attachment_PreTerminationWarningOther = ref(false)
    const attachment_PreTerminationWarningOtherRight = ref(false)
    const attachment_TerminationHealthWarning = ref(false)
    const attachment_TerminationPropertyConditionProblem = ref(false)
    const attachment_TerminationOtherBreachOfContract = ref(false)
    const attachment_TerminationLatePayment = ref(false)
    const attachment_TerminationModernization = ref(false)
    const attachment_TerminationOtherRight = ref(false)
    const attachment_OrdenaryTerminationOwner = ref(false)
    const attachment_OrdenaryTerminationRenter = ref(false)
    const attachment_CoUsufructuary_ConsentEsign = ref(false)
    const attachment_CoUsufructuary_Consent = ref(false)
    const attachment_CoUsufructuary_ConsentFilled = ref(false)
    const attachment_CoOwner_ConsentEsign = ref(false)
    const attachment_CoOwner_Consent = ref(false)
    const attachment_CoOwner_ConsentFilled = ref(false)
    const attachment_CoOwner_PreLeaseRightWaiverEsign = ref(false)
    const attachment_CoOwner_PreLeaseRightWaiver = ref(false)
    const attachment_CoOwner_PreLeaseRightWaiverFilled = ref(false)

    const agentOwner = ref({
        agentOwnerId: 5,
        contractId: 493,
        firstName: 'Owner Agent',
        lastName: 'Smith',
        birthDate: '2025-01-29T14:15:18.63',
        birthPlace: 'Budapest',
        mothersName: 'Kis Éva',
        nationality: 'magyar',
        zipcode: '1045',
        country: 'Magyarország',
        city: 'Budapest',
        address: 'Fő utca 11',
    })

    const agentRenter = ref({
        agentRenterId: 5,
        contractId: 493,
        firstName: 'Renter Agent',
        lastName: 'Smith',
        birthDate: '2025-01-29T14:15:18.63',
        birthPlace: 'Budapest',
        mothersName: 'Nagy Ilona',
        nationality: 'magyar',
        zipcode: '1054',
        country: 'Magyarország',
        city: 'Budapest',
        address: 'Mellék utca 2',
    })

    const coUsufructuaries = ref([
        {
            coUsufructuaryId: 5,
            contractId: 493,
            firstName: 'Béla',
            lastName: 'Hasznos',
            birthDate: '2025-03-09T09:26:04.988',
            birthPlace: 'Budapest',
            mothersName: 'Piros Rózsa',
            nationality: 'magyar',
            zipcode: '1123',
            country: 'Magyarország',
            city: 'Budapest',
            address: 'Fő út 11.',
        },
    ])

    const coOwners = ref([
        {
            coOwnerId: 5,
            contractId: 493,
            firstName: 'Gál',
            lastName: 'István',
            birthDate: '2025-03-09T13:27:47.385',
            birthPlace: 'Miskolc',
            mothersName: 'Gálos',
            nationality: 'Ilona',
            zipcode: '3214',
            country: 'Magyarország',
            city: 'Miskolc',
            address: 'Kazinczy utca 22.',
            preLeaseRightWaiver: true,
        },
    ])

    // GETTERS

    // ACTIONS
    const addQuestion = (
        questionId: number,
        optionId: string,
        optionParameters?: Array<{
            optionParameterId: number
            parameter: number | string
        }>,
    ) => {
        const existingQuestionIndex = questions.value.findIndex(
            (q) => q.questionId === questionId,
        )

        if (existingQuestionIndex !== -1) {
            // If the question exists, update its selected option
            questions.value[
                existingQuestionIndex
            ].questionSelectedOptionIdentifier = optionId
            questions.value[existingQuestionIndex].optionParameters =
                optionParameters
        } else {
            // If the question doesn't exist, add it to the array
            questions.value.push({
                questionId,
                questionSelectedOptionIdentifier: optionId,
                optionParameters,
            })
        }
    }

    const removeQuestion = (questionId: number) => {
        const existingQuestionIndex = questions.value.findIndex(
            (q) => q.questionId === questionId,
        )

        if (existingQuestionIndex !== -1) {
            questions.value.splice(existingQuestionIndex, 1)
        }
    }

    const getQuestion = (questionId: number) => {
        const question = questions.value.find(
            (q) => q.questionId === questionId,
        )

        return {
            questionId: question?.questionId,
            optionId: question?.questionSelectedOptionIdentifier || '',
            optionParameters: question?.optionParameters || [],
        }
    }

    const updateQuestions = (
        optionId: string,
        questionId: number,
        optionParams?: string | number,
    ) => {
        const stringParam = JSON.stringify(optionParams) || ''

        if (optionParams) {
            addQuestion(questionId, optionId, [
                {
                    optionParameterId: 0,
                    parameter: stringParam,
                },
            ])
            return
        }

        addQuestion(questionId, optionId, [])
    }

    const updateQuestionsWithTwoParams = (
        optionId: string,
        questionId: number,
        param1?: string | number,
        param2?: string | number,
    ) => {
        const stringParam = JSON.stringify(param1) || ''
        const stringParamTwo = JSON.stringify(param2) || ''

        addQuestion(questionId, optionId, [
            {
                optionParameterId: 0,
                parameter: stringParam,
            },
            {
                optionParameterId: 1,
                parameter: stringParamTwo,
            },
        ])
    }

    const updateDepositAmount = (times: number = 1) => {
        if (!deposit.value.amount) {
            deposit.value.amount = paymentDetail.value.rentingFee
        } else {
            deposit.value.amount = paymentDetail.value.rentingFee * times
        }

        return deposit.value.amount
    }

    const updateNotarialCosts = (type: 'owner' | 'renter', value: number) => {
        // Strict input validation
        // 1. Ensure the input is a number
        // 2. Round to one decimal place (for precision)
        // 3. Clamp between 0.1 and 99.9
        const parsedValue = Math.max(
            0.1,
            Math.min(99.9, Number(value.toFixed(1)) || 0.1),
        )

        if (publicDocument.value.paidBy === 'both') {
            if (type === 'owner') {
                notarialDocumentCostForOwner.value = parsedValue
                notarialDocumentCostForRenter.value = Math.max(
                    0.1,
                    Math.min(99.9, 100 - parsedValue),
                )
            } else {
                notarialDocumentCostForRenter.value = parsedValue
                notarialDocumentCostForOwner.value = Math.max(
                    0.1,
                    Math.min(99.9, 100 - parsedValue),
                )
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
        // contractTerminationDateIfNotPaid,
        contractTerminationDays,
        contractTerminationDayInMonth,
        contractConfirmationDays,
        contractTerminationPossibleBeforeEndDate,
        contractTerminationNotPossibleBeforeEndDate,
        contractReConfirmationDays,
        contractDatedPlace,
        contractDatedDate,
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
        isDifferentMailingAddressForOwner,
        isDifferentMailingAddressForRenter,
        attachment_HandoverReport,
        attachment_ByOwnerAgent,
        attachment_ByRenterAgent,
        attachment_CashReceiptRentFeePayment,
        attachment_CashReceiptDeposit,
        attachment_CashReceiptUtilityCost,
        attachment_NotificationOfModernizationWorks,
        attachment_DamageReport,
        attachment_AuthorizationRenterEsign,
        attachment_AuthorizationOwnerEsign,
        attachment_AuthorizationOwner,
        attachment_AuthorizationRenter,
        attachment_PreTerminationWarningPayment,
        attachment_PreTerminationWarningOther,
        attachment_PreTerminationWarningOtherRight,
        attachment_TerminationHealthWarning,
        attachment_TerminationPropertyConditionProblem,
        attachment_TerminationOtherBreachOfContract,
        attachment_TerminationLatePayment,
        attachment_TerminationModernization,
        attachment_TerminationOtherRight,
        attachment_OrdenaryTerminationOwner,
        attachment_OrdenaryTerminationRenter,
        attachment_CoUsufructuary_ConsentEsign,
        attachment_CoUsufructuary_Consent,
        attachment_CoUsufructuary_ConsentFilled,
        attachment_CoOwner_ConsentEsign,
        attachment_CoOwner_Consent,
        attachment_CoOwner_ConsentFilled,
        attachment_CoOwner_PreLeaseRightWaiverEsign,
        attachment_CoOwner_PreLeaseRightWaiver,
        attachment_CoOwner_PreLeaseRightWaiverFilled,
        agentOwner,
        agentRenter,
        coUsufructuaries,
        coOwners,
        addQuestion,
        removeQuestion,
        getQuestion,
        updateQuestions,
        updateQuestionsWithTwoParams,
        updateDepositAmount,
        updateNotarialCosts,
    }
})
