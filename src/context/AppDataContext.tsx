import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { CARD_DATA_CLOUD_STORAGE_KEY, CARD_DATA_STORAGE_KEY, PENDING_DOWNLOAD_KEY, PENDING_UPLOAD_KEY } from '../data/StorageKeys';
import { ICard } from '../types/CardInterface';
import { retrieveData, storeData } from '../utils/utilFunctions';
import useLocalStorage from '../hooks/useLocalStorage';
import { downloadData, uploadData } from '../services/DataSyncService';
import { useAppPreference } from './AppPreferenceContext';
import { useNetInfo } from '@react-native-community/netinfo';

export enum ACTIONS {
  ADD_CARDS = 'add',
  SET_CARDS = 'set',
  MODIFY_CARDS = 'modify',
  DELETE_CARDS = 'delete',
};

const AppDataContext = createContext<{ cardList: ICard[], updateCardList: ({ type, payload }: { type: ACTIONS, payload: ICard[] }) => void }>({ cardList: [], updateCardList: () => { } });
const AppDataSyncContext = createContext<{ pendingDownload: boolean, setPendingDownload: (s: boolean) => void, pendingUpload: boolean, setPendingUpload: (s: boolean) => void }>({ pendingDownload: false, setPendingDownload: () => { }, pendingUpload: false, setPendingUpload: () => { } });
export const useAppData = () => {
  return useContext(AppDataContext);
};

export const useAppDataSync = () => {
  return useContext(AppDataSyncContext);
}

const reduce = (state: ICard[], { type, payload }: { type: ACTIONS, payload: ICard[] }) => {
  switch (type) {
    case ACTIONS.SET_CARDS:
      return payload;

    case ACTIONS.ADD_CARDS:
      let stateIdSet = new Set(state.map(x => x.id));
      let filteredPayload = payload.filter(x => !stateIdSet.has(x.id));
      return [...state, ...filteredPayload];

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
  const [pendingDownload, setPendingDownload] = useLocalStorage(PENDING_DOWNLOAD_KEY, false);
  const [pendingUpload, setPendingUpload] = useLocalStorage(PENDING_UPLOAD_KEY, false);
  const { cloudBackupEnabled } = useAppPreference();
  const dataInit = useRef(false);
  const netInfo = useNetInfo();

  const updateCardList = (action: { type: ACTIONS, payload: ICard[] }) => {
    dispatch(action);
  };

  useEffect(() => {
    retrieveData(CARD_DATA_STORAGE_KEY).then((x) => {
      if (x !== null) dispatch({ type: ACTIONS.SET_CARDS, payload: x });
      setTimeout(() => dataInit.current = true, 0);
    });
  }, []);

  useEffect(() => {
    if (dataInit.current) {
      storeData(CARD_DATA_STORAGE_KEY, cardList);
      setPendingUpload(true);
    }
  }, [cardList]);

  useEffect(() => {
    (async () => {
      if (cloudBackupEnabled && pendingUpload && !pendingDownload && netInfo.isInternetReachable) {
        let success = await uploadData(CARD_DATA_CLOUD_STORAGE_KEY, cardList);
        setPendingUpload(!success);
      }
    })();
  }, [pendingUpload, pendingDownload, cloudBackupEnabled, netInfo.isInternetReachable]);

  useEffect(() => {
    (async () => {
      if (cloudBackupEnabled && pendingDownload && netInfo.isInternetReachable) {
        let data = await downloadData(CARD_DATA_CLOUD_STORAGE_KEY);
        if (data !== null && Array.isArray(data))
          dispatch({ type: ACTIONS.ADD_CARDS, payload: data });
        if (data !== undefined)
          setPendingDownload(false);
      }
    })();
  }, [pendingDownload, cloudBackupEnabled, netInfo.isInternetReachable]);

  return (
    <AppDataContext.Provider value={{ cardList, updateCardList }}>
      <AppDataSyncContext.Provider value={{ pendingDownload, setPendingDownload, pendingUpload, setPendingUpload }}>
        {children}
      </AppDataSyncContext.Provider>
    </AppDataContext.Provider>
  );
};

