import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { IBasicCard, ICard } from '../../types/CardInterface';

const CardListContext = React.createContext<{filteredCardList: ICard[], appendFilter: (componentKey: string, filterQuery: Partial<IBasicCard>) => void, removeFilter: (componentKey: string) => void}>({filteredCardList: [], appendFilter: () => {}, removeFilter: () => {}});

export const useFilteredCardList = () => {
  return useContext(CardListContext);
} 

export default function HomeProvider({children}: {children: any}) {
  const { cardList } = useAppData();
  const [filteredCardList, setFilteredCardList] = useState<ICard[]>(cardList ?? []);
  const filterQuerys = useRef<{[key: string] :Partial<IBasicCard>}>({});

  useEffect(() => {
    updateFilteredList();
  }, [cardList]);

  const updateFilteredList = () => {
    let filteredList = cardList.filter((x: IBasicCard) => {
      return Object.values(filterQuerys.current).every(filterSet => 
        Object.entries(filterSet).some(([key, value]) => 
          String(x[key as (keyof IBasicCard)]).toLowerCase().includes(value.toLowerCase())
      ));
    });
    setFilteredCardList(filteredList);
  };

  const appendFilter = (componentKey: string, filterQuery: Partial<IBasicCard>) => {
    filterQuerys.current[componentKey] = filterQuery;
    updateFilteredList();
  };

  const removeFilter = (componentKey: string) => {
    delete filterQuerys.current[componentKey];
    updateFilteredList();
  };

  return (
    <CardListContext.Provider value={{filteredCardList, appendFilter, removeFilter}}>
      {children}
    </CardListContext.Provider>
  )
}