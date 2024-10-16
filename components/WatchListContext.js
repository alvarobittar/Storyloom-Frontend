import React, { createContext, useState } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [seenList, setSeenList] = useState([]);

  const addToWatchList = (movie) => {
    setWatchList((prevList) => {
      if (!prevList.some(item => item.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const addToSeenList = (movie) => {
    setSeenList((prevList) => {
      if (!prevList.some(item => item.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const removeFromWatchList = (movie) => {
    setWatchList((prevList) => prevList.filter(item => item.id !== movie.id));
  };

  const removeFromSeenList = (movie) => {
    setSeenList((prevList) => prevList.filter(item => item.id !== movie.id));
  };

  return (
    <WatchListContext.Provider value={{ watchList, seenList, addToWatchList, addToSeenList, removeFromWatchList, removeFromSeenList }}>
      {children}
    </WatchListContext.Provider>
  );
};
