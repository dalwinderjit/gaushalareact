import React from "react";
import CowContext from "./CowContext";

const CowState=()=>{
    const state = {
        "name":"harry",
        "class":"5b"
    };
    return (
        <CowContext.Provider value={state}>
            {props.children}
        </CowContext.Provider>
    )
}
export default CowState;