"use client";
import { getImages } from '@/clients/images.client';
import { AdminImagesInput } from '@/components/admin/images/AdminImagesInput';
import AdminImagesTable from '@/components/admin/images/AdminImagesTable';
import { useEffect, useState } from 'react';
import {ImageType} from '@/types'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useTheme } from '@mui/material';

export default function AdminHome() {
  const [storedImages, setStoredImages] = useState<ImageType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const [updateCapturer, setUpdateCapturer] = useState<number>(0);
  useEffect(()=> {
    setLoading(true);
      getImages().then((res)=>{
        setStoredImages(res);
      }).finally(()=>{
        setLoading(false);
      })
  }, [updateCapturer])
  return (
    <main>
     {!storedImages && <Backdrop
        sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
      >
      <CircularProgress color="inherit" />
      </Backdrop>}
      {storedImages && <><AdminImagesInput storedImageNames={storedImages.map((img)=>img.name)}
      onImagesStored={()=>{
        setUpdateCapturer(prev=>prev+1);
      }}
      />
      <div style={{marginTop: '4px'}}>
      <AdminImagesTable images={storedImages} onImagesChanged={()=>{
        setUpdateCapturer(prev=>prev+1);
      }}/>
      </div></>}
    </main>
  )
}