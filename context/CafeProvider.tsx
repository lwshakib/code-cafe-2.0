// GlobalContextProvider.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface CafeProviderProps {
  children?: React.ReactNode;
}

interface CafeContextProps {
  model: string;
  setModel: (model: string) => void;
  user: any;
  isSignedIn: boolean;
  isLoaded: boolean;
  cafeList: any;
  setCafeList: (cafeList: any) => void;
}

const GlobalContext = React.createContext<CafeContextProps | null>(null);

export const useCafeContext = () => {
  const state = React.useContext(GlobalContext);
  if (!state) throw new Error("State Is Undefined");

  return state;
};

export const CafeContextProvider: React.FC<CafeProviderProps> = ({
  children,
}) => {
  const [model, setModel] = useState("gpt-4");
  const {user, isSignedIn, isLoaded} = useUser();
  const [cafeList, setCafeList] = useState<any>([]);



  return (
    <GlobalContext.Provider value={{ model, setModel, user, isSignedIn: !!isSignedIn, isLoaded: !!isLoaded, cafeList, setCafeList }}>
      {children}
    </GlobalContext.Provider>
  );
};
