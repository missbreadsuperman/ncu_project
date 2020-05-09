import React from 'react';
import Firebase from 'firebase';
import { ResetStyle, GlobalStyle } from './components/globalStyle'
import { HomePage } from './pages';
import '../node_modules/primereact/resources/themes/nova-light/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primeicons/primeicons.css';
import config from './config';

function App() {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
  }
 
  return (
    <div className="App">
      <ResetStyle />
      <GlobalStyle />
      <HomePage />
    </div>
  );
}

export default App;
