// GlobalContextProvider.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface Cafe {
  id: string;
  name: string;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}

interface CafeProviderProps {
  children?: React.ReactNode;
}

interface CafeContextProps {
  model: string;
  setModel: (model: string) => void;
  user: any;
  isSignedIn: boolean;
  isLoaded: boolean;
  cafes: Cafe[];
  setCafes: React.Dispatch<React.SetStateAction<Cafe[]>>;
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
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fetch cafes when user is loaded and signed in
  useEffect(() => {
    const fetchCafes = async () => {
      if (!isLoaded || !isSignedIn) return;
      
      try {
        const response = await fetch('/api/cafe');
        if (response.ok) {
          const data = await response.json();
          setCafes(data);
        } else {
          console.error('Failed to fetch cafes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cafes:', error);
      }
    };

    fetchCafes();
  }, [isLoaded, isSignedIn]);

  return (
    <GlobalContext.Provider value={{ model, setModel, user, isSignedIn: !!isSignedIn, isLoaded: !!isLoaded, cafes, setCafes }}>
      {children}
    </GlobalContext.Provider>
  );
};
