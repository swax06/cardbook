import React, { useEffect, useState } from 'react';
import { retrieveData, storeData } from '../utils/utilFunctions';

export default function useLocalStorage<T> (storageKey: string, initialState: T | (() => T)): [T, React.Dispatch<T>] {
    const [state, setState] = useState<T>(() => initialState instanceof Function ? initialState() : initialState);

    useEffect(() => {
        retrieveData(storageKey).then(x => {
            if(x !== null) setState(x);
        });
    }, []);

    useEffect(() => {
        storeData(storageKey, state);
    }, [state]);

    return [state, setState];
};