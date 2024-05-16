"use client";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ImageType } from '@/types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteImage } from '@/clients/images.client';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';


export default function AdminImagesTable({images, onImagesChanged}: {images:ImageType[], onImagesChanged: ()=>void}) {
  const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  const router = useRouter();

  const handleDelete = (e: any, row: any) => {
    return deleteImage(row.id).then((result)=> {
      onImagesChanged();
      router.refresh();
    }).catch((err)=>{
      console.error("error deleting file", err);
    });
  }

  const columns: GridColDef[] = [
    {field: 'preview', headerName: 'Preview', width: 100, renderCell: (params) => {
      const url = new URL(`/images/${params.row.id}/api`, currentOrigin).toString();
      return <Avatar src={url} />
    }},
    { field: 'name', headerName: 'Name' , width: 800},
    { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
      return (
        <IconButton edge="end" aria-label="delete" onClick={(e)=>{handleDelete(e, params.row)}}>
          <DeleteIcon />
        </IconButton>
      );
    } }
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={images} columns={columns} />
    </div>
  );
}