import React, { useContext, useRef, useState } from 'react';
import { ICard } from '../../types/CardInterface';
import { newCard } from '../../utils/utilFunctions';

export enum PAGE_MODE {
  ADD = 'Add',
  EDIT = 'Edit'
}

const CardDataContext = React.createContext<{ cardInput: ICard, updateCard: Function, pageMode: PAGE_MODE }>({ cardInput: newCard(), updateCard: (x: any) => { }, pageMode: PAGE_MODE.ADD });

export function useCardData() {
  return useContext(CardDataContext);
}

export default function AddCardProvider({ children, card }: { children: any, card?: ICard }) {
  const [cardInput, setCardInput] = useState<ICard>(card ?? newCard());
  const pageMode =  !!card ? PAGE_MODE.EDIT : PAGE_MODE.ADD;

  const updateCard = (event: any) => {
    setCardInput(prev => ({ ...prev, ...event }));
  };

  return (
    <CardDataContext.Provider value={{ cardInput, updateCard, pageMode }}>
      {children}
    </CardDataContext.Provider>
  );
};