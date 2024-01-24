import React, {createContext, useState} from "react";

export const LoadingContext = createContext();

function LoadingContextProvider(props) {
    const [loading, set_loading_] = useState(false);

    function set_loading(state) {
        set_loading_(state);
    }

    return (
        <LoadingContext.Provider value={{loading,set_loading}}>
            {props.children}
        </LoadingContext.Provider>
    );
}   

export default LoadingContextProvider;