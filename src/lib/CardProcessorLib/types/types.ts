export type CreditCardProcessorCardBrandId =
  | "american-express"
  | "default"
  | "diners-club"
  | "discover"
  | "elo"
  | "hiper"
  | "hipercard"
  | "jcb"
  | "maestro"
  | "mastercard"
  | "mir"
  | "unionpay"
  | "rupay"
  | "visa";

type CreditCardProcessorCardBrandNiceProcessor =
  | "American Express"
  | "Default"
  | "Diners Club"
  | "Discover"
  | "Elo"
  | "Hiper"
  | "Hipercard"
  | "JCB"
  | "Maestro"
  | "Mastercard"
  | "Mir"
  | "UnionPay"
  | "Rupay"
  | "Visa";

type CreditCardProcessorSecurityCodeLabel =
  | "CVV"
  | "CVC"
  | "CID"
  | "CVN"
  | "CVE"
  | "CVP2";

export interface CreditCardProcessor {
  niceProcessor: string;
  processor: string;
  patterns: number[] | [number[]];
  gaps: number[];
  lengths: number[];
  code: {
    size: number;
    name: string;
  };
  mask: string;
  matchStrength?: number;
  logoFilled: any;
};

export interface BuiltInCreditCardProcessor extends CreditCardProcessor {
  niceProcessor: CreditCardProcessorCardBrandNiceProcessor;
  processor: CreditCardProcessorCardBrandId;
  code: {
    size: 3 | 4;
    name: CreditCardProcessorSecurityCodeLabel;
  };
}

export interface CardCollection {
  [propName: string]: CreditCardProcessor;
}
