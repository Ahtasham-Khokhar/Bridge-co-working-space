"use client";
import {createContext, useContext, useState } from "react";

// Create a Context for the Super Admin
const SuperAdminContext = createContext();

// This is the Provider component that will wrap the part of the app where we want to use the context
export function SuperAdminProvider ({children}){
    const [name, setName] = useState("superAdmin");
    return(
        <SuperAdminContext.Provider  value={{name, setName}} >
            {children}
        </SuperAdminContext.Provider>
    )
}


// This is Custom Hook to consume the context
export const useSuperAdminConsumer = ()=> {
    const context = useContext(SuperAdminContext);
    if(!context){
        throw new Error("useSuperAdminConsumer must be used within a SuperAdminProvider");
    }
    return context;
}