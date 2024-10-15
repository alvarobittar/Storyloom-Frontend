// App.js
import React from 'react';
import { WatchListProvider } from './components/WatchListContext';
import MainScreen from './screens/MainScreen';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <WatchListProvider>
      <MainScreen />
    </WatchListProvider>
    </AuthProvider>

  );
}
 
   