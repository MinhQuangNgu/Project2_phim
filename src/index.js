import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./style.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import { url } from "./url/Url";

axios.defaults.baseURL = url;
const root = ReactDOM.createRoot(document.getElementById("root"));
if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
}
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>
);
