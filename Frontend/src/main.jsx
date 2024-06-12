import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from '../context/context.jsx';
import {EventContextProvider} from '../context/eventContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ChakraProvider>
     <UserContextProvider>
     <EventContextProvider>
      <App />
      </EventContextProvider>
     </UserContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
