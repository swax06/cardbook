import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { CARD_DATA_STORAGE_KEY } from '../data/StorageKeys';
import { ICard } from '../types/CardInterface';
import { retrieveData, storeData } from '../utils/utilFunctions';

console.log('data init');

export enum ACTIONS {
  ADD_CARDS = 'add',
  SET_CARDS = 'set',
  MODIFY_CARDS = 'modify',
  DELETE_CARDS = 'delete',
};

const AppDataContext = createContext<{ cardList: ICard[], updateCardList: ({ type, payload }: { type: ACTIONS, payload: ICard }) => void }>({ cardList: [], updateCardList: () => { } });

export const useAppData = () => {
  return useContext(AppDataContext);
};

const reduce = (state: ICard[], { type, payload }: { type: ACTIONS, payload: ICard | ICard[] }) => {
  if (!(payload instanceof Array)) {
    payload = [payload];
  }
  switch (type) {
    case ACTIONS.SET_CARDS:
      return payload;

    case ACTIONS.ADD_CARDS:
      return [...state, ...payload];

    case ACTIONS.MODIFY_CARDS:
      let payloadMap = new Map(payload.map(x => [x.id, x]));
      return state.map(x => ({ ...x, ...(payloadMap.get(x.id) ?? {}) }));

    case ACTIONS.DELETE_CARDS:
      let payloadIdSet = new Set(payload.map(x => x.id));
      return state.filter(x => !payloadIdSet.has(x.id));

    default:
      return state;
  }
};


export default function AppDataProvider({ children }: { children: any }) {
  const [cardList, dispatch] = useReducer(reduce, []);

  const updateCardList = (action: { type: ACTIONS, payload: ICard }) => {
    dispatch(action);
  };

  useEffect(() => {
    retrieveData(CARD_DATA_STORAGE_KEY).then((x) => {
      if(x !== null) dispatch({ type: ACTIONS.SET_CARDS, payload: x })
    });
  }, []);

  useEffect(() => {
    storeData(CARD_DATA_STORAGE_KEY, cardList);
  }, [cardList]);


  return (
    <AppDataContext.Provider value={{ cardList, updateCardList }}>
      {children}
    </AppDataContext.Provider>
  );
};

