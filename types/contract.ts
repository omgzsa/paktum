export interface Question {
  questionId: number;
  questionSelectedOptionIdentifier: string;
  optionParameters?: Array<{ 
    optionParameterId?: number; 
    parameter?: string | number | undefined; 
  }>;
}

export interface PublicDocument {
  movingOut: boolean;
  paymentObligation: boolean;
  servicePresumption: boolean;
  paidBy: 'owner' | 'renter' | 'both' | undefined;
}
