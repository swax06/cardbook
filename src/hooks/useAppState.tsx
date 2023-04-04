import { AppState } from 'react-native'
import { useEffect, useState } from 'react'

export default function useAppState() {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          setAppState(nextAppState);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

    return appState;
}