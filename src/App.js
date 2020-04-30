import React from 'react';
import { ResetStyle, GlobalStyle } from './components/globalStyle'
import { HomePage } from './pages';
import '../node_modules/primereact/resources/themes/nova-light/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <ResetStyle />
      <GlobalStyle />
      <HomePage />
    </div>
  );
}

export default App;
