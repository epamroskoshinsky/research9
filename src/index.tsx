import "./scss/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { LayoutProvider } from "./components/Layout";
import { App } from "./components/App";

ReactDOM.render( (
        <LayoutProvider>
            <App />
        </LayoutProvider>
    ),
    document.querySelectorAll( "body > div" )[ 0 ]
);
