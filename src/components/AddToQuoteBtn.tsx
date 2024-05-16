"use client";
import { ProductHawkEye } from "@/types";
import { useQuote } from "./QuoteContext";
import { useEffect, useState } from "react";

export function AddToQuoteBtn({product}: {product: ProductHawkEye}){
    const { quote, addToQuote, removeFromQuote } = useQuote();
    const [isProductAlreadyInQuote, setIsProductAlreadyInQuote] = useState<boolean>(false);

    useEffect(()=>{
        if(quote.find((q)=>q.id === product.id)){
            setIsProductAlreadyInQuote(true);
        } 
        else {
            setIsProductAlreadyInQuote(false);
        }
    }, [quote, product.id])


return <button className={`add-to-quote-btn ${isProductAlreadyInQuote ? "already-added":""}`} disabled={isProductAlreadyInQuote} onClick={()=>addToQuote(product)}>{isProductAlreadyInQuote ? "Product In Quote" : "Add To Quote"}</button>
}
