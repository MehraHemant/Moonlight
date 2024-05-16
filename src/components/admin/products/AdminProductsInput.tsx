"use client";
import { FileUploader } from "react-drag-drop-files";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { useState } from "react";
import { ACCEPTED_EXCEL_FILE_TYPES, SINGLE_FILE_MAX_SIZE_IN_MB } from "@/constants";
import Modal from "../../Modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from "next/navigation";
import { storeProducts } from "@/clients/admin/products.client";
import { useCustomSnackbar } from "../Snackbar";
import Download from '@mui/icons-material/Download';


const acceptedMaxFileSizeInMB = SINGLE_FILE_MAX_SIZE_IN_MB;
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function AdminProductExcelInput() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return <><Modal show={showModal} onClose={() => { setShowModal(false) }}>
    <ExcelInput />
  </Modal>
    <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '2px', width: '95%' }}>
      <Button type='button' size='large'
        variant="contained" endIcon={<Download />}
        onClick={() => {
          const link = document.createElement('a');
          link.href = `${process.env.NEXT_PUBLIC_APP_URL}/Product File.xlsx`;
          link.setAttribute('download', 'Product File.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >Get Product Excel Template</Button>
      <Button type='button' size='large'
        variant="contained" endIcon={<AddCircleOutlineIcon />}
        onClick={() => { setShowModal(true) }}
      >Add Products</Button>
    </div>
  </>
}

function ExcelInput() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [setSnackBarContent, customSnackbar] = useCustomSnackbar();

  const router = useRouter();

  const theme = useTheme();
  const handleChange = (newlyUploadedFileList: File) => {
    if (computeSizeOfFilesInMB([newlyUploadedFileList]) > 50) {
      setSnackBarContent({ severity: "error", message: "Please make sure you upload less than 50MB in one go" })
      return;
    }
    setFile(newlyUploadedFileList);
  };

  const handleSave = () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      setLoading(true);
      storeProducts(formData).then(() => {
        setSnackBarContent({ message: "File Uploaded", severity: "success" });
        router.refresh();
      }).catch((err) => {
        console.error("Could not upload excel", err)
        if(err.message.startsWith('CUSTOM::')){
          setSnackBarContent({ message: err.message.replace('CUSTOM:: ', ''), severity: "error" });
        } else {
          setSnackBarContent({ message: "The upload failed. Please retry", severity: "error" });
        }
      }).finally(() => {
        setLoading(false);
      });
    }

  }
  return (
    <>
      <Grid item xs={12} md={6}>
        <Backdrop
          sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file" types={ACCEPTED_EXCEL_FILE_TYPES}
          onTypeError={(err: string) => {
            setSnackBarContent({ message: `Unsupported File Format. Please make sure the format is one of the following ${ACCEPTED_EXCEL_FILE_TYPES.join(' ,')}`, severity: 'error' })
          }}
          fileOrFiles={file}
          onSizeError={(err: string) => {
            setSnackBarContent({ message: `File is too large. Please make sure each file is less than ${acceptedMaxFileSizeInMB}MB`, severity: 'error' })
          }}
          maxSize={acceptedMaxFileSizeInMB}
        />
        <Typography sx={{ mt: 4, mb: 2 }} variant="body2" component="div">
          <List>
            <ListItem>
              * 5Mb should be the maximum size of the excel file.
            </ListItem>
            <ListItem>
              * Each excel cell should only contain alphanumeric (a-zA-Z0-9), underscore (_), hyphen (-), space ( ), forward slash (/) or period (.) characters.
            </ListItem>
          </List>
        </Typography>
        {file && <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} variant="body1" component="div">
            You are uploading {file.name}. Totalling: ~{computeSizeOfFilesInMB([file]).toFixed(2)} MB
            <Button type='button'
              size='large'
              variant="contained"
              onClick={handleSave}
            >Confirm</Button>
          </Typography>
          {/* // here we need to show the products instead... */}
          {/* <Demo>
            <List>
              {Object.entries(files).map(([key, file], index)=>{
                return <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={()=>{handleDelete(file.name)}}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={URL.createObjectURL(file)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={file.name}
                  />
                </ListItem>
              })}
            </List>
          </Demo> */}
        </Grid>}
      </Grid>
      {customSnackbar}
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarContent !== null}
        key={vertical + horizontal}
        sx={{ zIndex: 100000 }}
      >
        <Alert onClose={onAlertClose}
        severity={snackBarContent?.severity} 
        sx={{ width: '100%',  zIndex: 100000 }}>
          {snackBarContent?.message}
        </Alert>
      </Snackbar> */}
    </>
  );
}

const computeSizeOfFilesInMB = (files: File[]) => {
  return files.reduce((prev, curr) => prev + curr.size, 0) / (1000 * 1000)
}