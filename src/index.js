import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import {createRoot} from 'react-dom/client'; // import createRoot from react-dom/client
import DeviceStore from './store/DeviceStore';

export const Context = createContext(null)


createRoot(document.getElementById('root')).render( 
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
        <App />
    </Context.Provider>
);
