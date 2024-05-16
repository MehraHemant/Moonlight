"use client";
import { useState } from 'react';
import { useQuote } from './QuoteContext';
import Modal from './Modal';
import { ProductHawkEye } from '@/types';
import Image from 'next/image';
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { Button, Typography } from '@mui/material';
import QuoteCaptureForm from './QuoteCaptureForm';

export function QuoteManager() {
  const { quote, addToQuote, removeFromQuote } = useQuote();
  const [openQuoteDetails, setOpenQuoteDetails] = useState(false);

  return <div>
    <Modal show={openQuoteDetails} onClose={() => setOpenQuoteDetails(false)}>
      <div className='quote-container'>
        <div>
        <Typography variant={'h4'} component="span"
            sx={{
              color: "#d5ab25",
            }}
            gutterBottom>
            Your Quote has <strong>{quote.length}</strong> product(s)
          </Typography>
          <div className='quote-items-container'>
          <div>
          {quote.map((p) =>
            <ProductCard key={p.id} product={p} />
          )}
          </div>
        </div>
        </div>
        <div>
        <Typography variant={'h5'} component="span"
            sx={{
              display:'flex',
              justifyContent:'center',
            }}
            gutterBottom>
            Your Details
          </Typography>
          <QuoteCaptureForm />
        </div>
      </div>
    </Modal>
    <button
      className={'quote-button'}
      onClick={() => { setOpenQuoteDetails(!!open) }}>Your Quote {quote.length}</button>
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


export function ProductCard({ product }: { product: ProductHawkEye }) {
  const { removeFromQuote } = useQuote();
  const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL(`/images/${product.imageId}/api`, currentOrigin).toString();
  return (<>
    <Card
      elevation={0}
      sx={{display: "flex", padding: 2, borderRadius: "16px"}}
    >
      <CardContent
      className='quote-product-card-content'
      sx={{pr: 2}}>
        <Box mb={1}>
          <Box
            component="h3"
            className="quote-product-box"
          >
            {product.modelName}
          </Box>
        </Box>
        <Box
          component="p"
          sx={{ fontSize: 14, color: "grey.500", mb: "1.275rem", width: '100%' }}
        >
          Category:: {product.category}
        </Box>
        <Divider light sx={{ mt: 1, mb: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              gap: 1.5,
            }}
          >
            <Button
              component={"button"}
              onClick={() => removeFromQuote(product.id)}
              sx={{
                fontSize: 14,
                color: "red",
                opacity: 0.87,
                "&:hover, &:focus": {
                  color: "rosybrown",
                  opacity: 1,
                  "& $icon": {
                    opacity: 1,
                  },
                },
              }}
            >
              Remove From Quote
              <CloseIcon
                sx={{
                  opacity: 0.6,
                  fontSize: "1.125em",
                  verticalAlign: "middle",
                  "&:first-child": {
                    marginRight: 1,
                  },
                  "&:last-child": {
                    marginLeft: 1,
                  },
                }}
              />
            </Button>
          </Box>
        </Box>

      </CardContent>
      <CardMedia
        sx={{
          width: "100%",
        }}
      >
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
            priority={false}
          />
        </div>
      </CardMedia>
    </Card>
  </>
  );
}