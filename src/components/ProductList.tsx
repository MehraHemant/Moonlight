"use client";
import { ProductFilters, ProductHawkEye } from '@/types'
import Image from 'next/image';
import { AddToQuoteBtn } from './AddToQuoteBtn';
import { useFilter } from '@/hooks/useFilter';
import { useEffect, useState } from 'react';
import { getProductsHawkEye } from '@/clients/products.client';
import React from "react";
import Link from 'next/link';
import Typography from "@mui/material/Typography";

const ProductList = ({ initiallyFilteredProducts, filtersFromUrl, pageFilterCategory }: { initiallyFilteredProducts: ProductHawkEye[], filtersFromUrl?: ProductFilters, pageFilterCategory: keyof ProductFilters }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductHawkEye[]>([]);
  const [filters, filterComponent] = useFilter({ initialFilters: filtersFromUrl, pageFilterCategory });
  const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFilteredProducts(initiallyFilteredProducts);
  }, [])

  useEffect(() => {
    if (!filters) return;
    getProductsHawkEye(filters).then(([returnedProducts, totalCount]) => {
      setFilteredProducts(returnedProducts);
    }).catch((err) => {
      console.error("the error is", err);
    })
  }, [filters])
  return (<div
    style={{marginTop: "9.9vh" }}
  >
    <div style={{
      display: 'flex',
      height: '90vh',
      overflowY: 'scroll'
    }}>
      {filterComponent}
      <main className={"sharedMain"} style={{
        marginLeft: 0, flex: 1,
        height: '90vh',
        overflowY: 'scroll'
      }}>
        {filteredProducts.length === 0 && <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column'
        }}>
          <Typography variant={'h5'} color="textSecondary">
            No products found matching your selection criteria
          </Typography>
        </div>}
        <div className={"products-holder"}
          style={{ transition: 'all .2s ease-in-out'}}
        >

          {filteredProducts.map((product) =>
            <ProductTile key={product.id} product={product} />
          )}
        </div>
      </main>
    </div>
  </div>
  )
}

export const ProductTile = ({ product }: { product: ProductHawkEye }) => {
  const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL(`/images/${product.imageId}/api`, currentOrigin).toString();
  return <div key={product.id} className={"product-tile"}
  style={{ transition: 'all .2s ease-in-out'}}
  >
    <Link href={`/builders-hardware-products/${product.modelName.replaceAll(' ', '-')}?id=${product.id}`}>
      <div className={"product-hawk-eye-container"}>
        <div className={"product-image-holder"}>
          <Image
            src={url}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            // @TODO: Discuss the correct alt tag
            alt="ALTMAN"
            //   alt={`${product.childCategory}`}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill={true}
            priority
          />
        </div>
        <div className={"product-model-name-holder"}>
          {product.modelName}
        </div>
      </div>
    </Link>
    <AddToQuoteBtn product={product} />
  </div>
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export default ProductList;