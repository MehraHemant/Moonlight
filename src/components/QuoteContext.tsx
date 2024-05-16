"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {ProductHawkEye} from "@/types"

const QuoteContext = createContext<{quote: ProductHawkEye[], addToQuote: (product: ProductHawkEye) => void, removeFromQuote: (product: ProductHawkEye["id"]) => void}>({
  quote: [],
  addToQuote: ()=>{},
  removeFromQuote: ()=>{},
});

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quote, setQuote] = useState<ProductHawkEye[]>([]);

  // Load quote from local storage when the component mounts
  useEffect(() => {
    const storedQuote = typeof window !== 'undefined' ? localStorage.getItem('quote') : null;
    if (storedQuote) {
      setQuote(JSON.parse(storedQuote));
    }
  }, []);


  // Save quote to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quote', JSON.stringify(quote));
    }
  }, [quote]);
  

  // Listen for storage events to synchronize changes across tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'quote') {
        setQuote(JSON.parse(event.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
}}, []);

  const addToQuote = (product: ProductHawkEye) => {
    setQuote((currentQuote) => [...currentQuote, product]);
  };

  const removeFromQuote = (productId: ProductHawkEye["id"]) => {
    setQuote((currentQuote) => currentQuote.filter(p => p.id !== productId));
  };

  return (
    <QuoteContext.Provider value={{ quote, addToQuote, removeFromQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);

