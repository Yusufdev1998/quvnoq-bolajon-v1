import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-500.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/nunito/latin-900.css';
import App from './App';
import { MusicProvider } from './Music';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MusicProvider><App /></MusicProvider></React.StrictMode>);
