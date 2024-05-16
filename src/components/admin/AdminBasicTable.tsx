"use client";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

export default function AdminBasicTable<T extends {id: number, name: string}>({data, includeImageNamePreview = false}: {data:T[], includeImageNamePreview?: boolean}) {
  const imagePreviewColumn: GridColDef = {field: 'preview', headerName: 'Preview', width: 100, renderCell: (params) => {
    return <Avatar
    src={`/finishes/${params.row.imageName}`} 
    />
  }}
  const baseColumns: GridColDef[] = [    
    { field: 'name', headerName: 'Name' , width: 1000},
  ];
  const columns: GridColDef[] = includeImageNamePreview ? [imagePreviewColumn, ...baseColumns] : baseColumns;
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
}