import React, { createContext, useState } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [seenList, setSeenList] = useState([]); // Lista de películas vistas

  const addToWatchList = (movie) => {
    setWatchList((prevList) => [...prevList, movie]);
  };

  const addToSeenList = (movie) => {
    setSeenList((prevList) => [...prevList, movie]); // Función para agregar a la lista de películas vistas
  };

  return (
    <WatchListContext.Provider value={{ watchList, seenList, addToWatchList, addToSeenList }}>
      {children}
    </WatchListContext.Provider>
  );
};
