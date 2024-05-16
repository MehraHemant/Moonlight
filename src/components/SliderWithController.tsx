'use client';
import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosNewIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';

interface SliderProps {
  items: JSX.Element[],
  title: string;
}

const SliderWithController: React.FC<SliderProps> = ({ items, title }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollerRef.current) {
      const { scrollLeft, clientWidth } = scrollerRef.current;
      const newScrollPosition =
        direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollerRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <Box className="controlled-slider-container">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">{title}</Typography>
      <div className="slider-top-div" 
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '20px 0px',
        position: 'relative',
        // backgroundImage: "url('/product-banner.png')",
      }}>
        <Image
        style={{zIndex: -1, opacity: 0.8}}
      src={'/featured-bck-banner.png'}
      alt={"N"}
      fill={true}
      priority
  />
      <IconButton onClick={() => scroll('left')} aria-label="scroll left">
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        ref={scrollerRef}
        sx={{
          overflow: 'hidden',
          width: 'calc(100% - 96px)', // Adjust based on IconButton size and padding
          whiteSpace: 'nowrap',
          scrollBehavior: 'smooth',
        }}
      >
        {items.map((item, index) => (
            <Box
            key={index}
            sx={{
              display: 'inline-block',
              width: 350,
              marginRight: '10px',
              marginLeft: index === 0 ? '10px' : 0, // Add left margin only to the first item
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
      <IconButton onClick={() => scroll('right')} aria-label="scroll right">
        <ArrowForwardIosNewIcon />
      </IconButton>
      </div>
    </Box>
  );
};

export default SliderWithController;