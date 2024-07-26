import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './feature/store';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/socketContext';
import { ConversationContextProvider } from './context/ConversationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ConversationContextProvider>
          <SocketContextProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </SocketContextProvider>
        </ConversationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


