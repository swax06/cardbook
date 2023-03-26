import cardProcessors, { DEFAULT_PROCESSOR } from "./cardProcessors";
import { addMatchingCardsToResults } from "./utils/add-matching-cards-to-results";
import { findBestMatch } from "./utils/find-best-match";
import { clone } from "./utils/clone";
import {
  CreditCardProcessor,
  CardCollection,
  CreditCardProcessorCardBrandId,
} from "./types/types";

let customCards = {} as CardCollection;

const cardNames: Record<string, CreditCardProcessorCardBrandId> = {
  VISA: "visa",
  MASTERCARD: "mastercard",
  RUPAY: "rupay",
  AMERICAN_EXPRESS: "american-express",
  DINERS_CLUB: "diners-club",
  DISCOVER: "discover",
  JCB: "jcb",
  UNIONPAY: "unionpay",
  MAESTRO: "maestro",
  ELO: "elo",
  MIR: "mir",
  HIPER: "hiper",
  HIPERCARD: "hipercard"
};

const ORIGINAL_TEST_ORDER = [
  cardNames.VISA,
  cardNames.MASTERCARD,
  cardNames.RUPAY,
  cardNames.AMERICAN_EXPRESS,
  cardNames.DINERS_CLUB,
  cardNames.DISCOVER,
  cardNames.JCB,
  cardNames.UNIONPAY,
  cardNames.MAESTRO,
  cardNames.ELO,
  cardNames.MIR,
  cardNames.HIPER,
  cardNames.HIPERCARD
];

let testOrder = clone(ORIGINAL_TEST_ORDER) as string[];

function isValidInputProcessor<T>(cardNumber: T): boolean {
  return typeof cardNumber === "string" || cardNumber instanceof String;
}

function findProcessor(cardProcessor: string | number): CreditCardProcessor {
  return customCards[cardProcessor] || cardProcessors[cardProcessor];
}

function getAllCardProcessors(): CreditCardProcessor[] {
  return testOrder.map(
    (cardProcessor) => clone(findProcessor(cardProcessor)) as CreditCardProcessor
  );
}

function getCardPosition(
  name: string,
  ignoreErrorForNotExisting = false
): number {
  const position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card processor.');
  }

  return position;
}

function creditCardProcessor(cardNumber: string): Array<CreditCardProcessor> {
  const results = [] as CreditCardProcessor[];

  if (!isValidInputProcessor(cardNumber)) {
    return results;
  }

  if (cardNumber.length === 0) {
    return [DEFAULT_PROCESSOR];
  }

  testOrder.forEach((cardProcessor) => {
    const cardConfiguration = findProcessor(cardProcessor);

    addMatchingCardsToResults(cardNumber, cardConfiguration, results);
  });

  const bestMatch = findBestMatch(results) as CreditCardProcessor;

  if (bestMatch) {
    return [bestMatch];
  }

  return results.length ? results : [DEFAULT_PROCESSOR];
}

creditCardProcessor.getProcessorInfo = (cardProcessor: string): CreditCardProcessor =>
  clone(findProcessor(cardProcessor)) as CreditCardProcessor;

creditCardProcessor.removeCard = (name: string): void => {
  const position = getCardPosition(name);

  testOrder.splice(position, 1);
};

creditCardProcessor.addCard = (config: CreditCardProcessor): void => {
  const existingCardPosition = getCardPosition(config.processor, true);

  customCards[config.processor] = config;

  if (existingCardPosition === -1) {
    testOrder.push(config.processor);
  }
};

creditCardProcessor.updateCard = (
  cardProcessor: string,
  updates: Partial<CreditCardProcessor>
): void => {
  const originalObject = customCards[cardProcessor] || cardProcessors[cardProcessor];

  if (!originalObject) {
    throw new Error(
      `"${cardProcessor}" is not a recognized processor. Use \`addCard\` instead.'`
    );
  }

  if (updates.processor && originalObject.processor !== updates.processor) {
    throw new Error("Cannot overwrite processor parameter.");
  }

  let clonedCard = clone(originalObject) as CreditCardProcessor;

  clonedCard = { ...clonedCard, ...updates };

  customCards[clonedCard.processor] = clonedCard;
};

creditCardProcessor.changeOrder = (name: string, position: number): void => {
  const currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardProcessor.resetModifications = (): void => {
  testOrder = clone(ORIGINAL_TEST_ORDER) as string[];
  customCards = {};
};

creditCardProcessor.processors = cardNames;

export default creditCardProcessor;
