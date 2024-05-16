"use client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ProductDetail } from '@/types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/clients/admin/products.client';


export const AdminProductsTable = ({products, onProductsChanged}: {products:ProductDetail[], onProductsChanged?: ()=>void}) => {
  const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  console.info("re-rendering PRODUCTS table with",products.length)
  const router = useRouter();
  const handleDelete = (e: any, row: any) => {
    return deleteProduct(row.id).then((result)=> {
        onProductsChanged?.();
        router.refresh();
    }).catch((err)=>{
      console.error("error deleting product", err);
    });
}

  const columns: GridColDef[] = [
    {field: 'preview', headerName: 'Preview', renderCell: (params) => {
      const url = new URL(`/images/${params.row.imageId}/api`, currentOrigin).toString();
      return <Avatar src={url} />
    }},
    { field: 'id', headerName: 'SKU'},
    { field: 'modelName', headerName: 'Model Name'},
    { field: 'modelNumber', headerName: 'Model #'},
    { field: 'material', headerName: 'Material' },
    { field: 'finishes', headerName: 'Finishes' },
    { field: 'category', headerName: 'Category' },
    { field: 'isTopSelling', headerName: 'Is Top Selling' },
    { field: 'productionType', headerName: 'Production Type' },
    { field: 'technicalDescription', headerName: 'Technical Description' },
    { field: 'accessoriesAndFeatures', headerName: 'Accessories And Features' },
    { field: 'miscellaneous', headerName: 'Miscellaneous' },
    { field: 'actions', headerName: 'Actions', renderCell: (params) => {
      return (
        <IconButton edge="end" aria-label="delete" onClick={(e)=>{handleDelete(e, params.row)}}>
          <DeleteIcon />
        </IconButton>
      );
    } }
  ];

  return (
    <div style={{ height: 600, overflowX: 'scroll', overflowY: 'auto'}}>
      <DataGrid rows={products} columns={columns} />
    </div>
  );
};


// export const AdminProductsTable = () => {
//   const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [paginationModel, setPaginationModel] = useState({
//     pageSize: 25,
//     page: 0,
//   });
//     const router = useRouter();

//     const handleDelete = (e: any, row: any) => {
//     return deleteProduct(row.id).then((result)=> {
//       router.refresh();
//     }).catch((err)=>{
//       console.error("error deleting product", err);
//     });
//   }

//   // id: string;
//   // imageSrc: string;
//   // modelName: string;
//   // modelNumber: string;
//   // category: string;
//   // material: string;
//   // finishes: string[];
//   // productionType: string;

//   const columns: GridColDef[] = [
//     {field: 'preview', headerName: 'Preview', width: 100, renderCell: (params) => {
//       const url = new URL(`/images/${params.row.imageSrc}/api`, currentOrigin).toString();
//       return <Avatar src={url} />
//     }},
//     { field: 'name', headerName: 'Name' , width: 800},
//     { field: 'modelName', headerName: 'Model Name' , width: 800},
//     { field: 'modelNumber', headerName: 'Model #' , width: 800},
//     { field: 'material', headerName: 'Material' , width: 800},
//     { field: 'finishes', headerName: 'Finishes' , width: 800},
//     { field: 'productionType', headerName: 'Production Type' , width: 800},
//     { field: 'category', headerName: 'Category' , width: 800},
//     { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
//       return (
//         <IconButton edge="end" aria-label="delete" onClick={(e)=>{handleDelete(e, params.row)}}>
//           <DeleteIcon />
//         </IconButton>
//       );
//     } }
//   ];

//   const fetchData = async (currentPage: number) => {
//     const response = await fetch(`/products/api?page=${currentPage + 1}`);
//     const newData = await response.json();
//     setData(newData);
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [page]);

//   return (
//     <div style={{ height: 600, width: '100%' }}>
//       <DataGrid
//         rows={data}
//         columns={[/* ...your columns here... */]}
//         pagination
//         paginationMode="server"
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//       />
//     </div>
//   );
// };