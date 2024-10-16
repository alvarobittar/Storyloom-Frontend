// App.js
import React from 'react';
import { WatchListProvider } from './components/WatchListContext';
import MainScreen from './screens/MainScreen';


export default function App() {
  return (
    <WatchListProvider>
      <MainScreen />
    </WatchListProvider>

  );
}
 
   