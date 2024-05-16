"use client";
import { FileUploader } from "react-drag-drop-files";
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { storeImages } from '@/clients/images.client';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import Button from '@mui/material/Button';
import { useState } from "react";
import { ACCEPTED_IMAGE_FILE_TYPES, SINGLE_FILE_MAX_SIZE_IN_MB } from "@/constants";
import Modal from "../../Modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from "next/navigation";
import { isStringSafeToStoreInDb } from '@/constants';

const MAX_ALLOWED_SIZE_OF_FILE_BATCH_IN_MB = 30;


type SnackBarContentType= { message: string, severity: AlertProps['severity'] } | null
const acceptedMaxFileSizeInMB = SINGLE_FILE_MAX_SIZE_IN_MB;
const vertical = 'bottom'
const horizontal = 'right'

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function AdminImagesInput({storedImageNames, onImagesStored}:{storedImageNames: string[], onImagesStored: ()=>void}) {
    const [showModal, setShowModal] = useState<boolean>(false);
return <><Modal show={showModal} onClose={()=>{setShowModal(false)}}>
<ImagesInput storedImageNames={storedImageNames} onImagesStored={onImagesStored} />
</Modal>
<div style={{display: "flex", justifyContent: 'flex-end'}}>
<Button type='button' size='large' 
variant="contained" endIcon={<AddCircleOutlineIcon/>}
onClick={()=>{setShowModal(true)}}
>Add Images</Button>
</div>
</>
}

function ImagesInput({storedImageNames, onImagesStored}:{storedImageNames: string[], onImagesStored: ()=>void}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBarContent, setSnackBarContent] = useState<SnackBarContentType>(null);
  const router = useRouter();
  const onAlertClose = () => {
    setSnackBarContent(null)
  }
  const theme = useTheme();
  const handleChange = (newlyUploadedFileList: FileList) => {
    const newlyUploadedFiles = Array.from(newlyUploadedFileList);
    const existingFiles = Array.from(files ?? []);
    const uniqueFileNameSet = new Set([...existingFiles?.map((f)=>f.name), ...storedImageNames]);
    const duplicateFileNames = [];
    for(let file of newlyUploadedFiles){
        if(uniqueFileNameSet.has(file.name)){
            duplicateFileNames.push(file.name);
        } else {
            uniqueFileNameSet.add(file.name);
        }
    }
    if(duplicateFileNames.length > 0){
        setSnackBarContent({severity: "error", message: `The file with following name(s) were either already selected for upload or uploaded ${duplicateFileNames.map((fname)=>fname).join(",")}` })
        return;
    }

    if(newlyUploadedFiles.length > 0){
      if(computeSizeOfFilesInMB(newlyUploadedFiles) > MAX_ALLOWED_SIZE_OF_FILE_BATCH_IN_MB){
          setSnackBarContent({severity: "error", message: `Please make sure you upload less than ${MAX_ALLOWED_SIZE_OF_FILE_BATCH_IN_MB} MB in one go` })
          return;
      }
      const filesWithInvalidNames = newlyUploadedFiles.filter((f)=>!isStringSafeToStoreInDb(f.name))
      if(filesWithInvalidNames.length > 0){
          setSnackBarContent({severity: "error", message: `The following file name(s) have invalid characters ${filesWithInvalidNames.map((f)=>f.name).join(",")}` })
          return;
      }

      setFiles((prev)=> {
        return [...existingFiles, ...newlyUploadedFiles]
      });
    }
  };
  const handleDelete = (fileName: string) => {
    setFiles((prev)=> {
      const remainingFiles = prev?.filter((f)=>f.name !== fileName) ?? null;
      return remainingFiles !== null &&  remainingFiles.length>0 ? remainingFiles : null
    })
  }

  const handleSave = () => {
    const formData  = new FormData();
    if(files){
      for(const file of files) {
        formData.append("files", file);
      }
      setLoading(true);
      storeImages(formData).then(()=>{
        setSnackBarContent({message: "Files Uploaded", severity: "success"});
        onImagesStored();
      }).catch((err)=>{
        console.error("Could not upload files", err)
        setSnackBarContent({message: "The upload failed. Please retry", severity: "error"});
      }).finally(()=>{
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
          multiple={true}
          handleChange={handleChange} name="file" types={ACCEPTED_IMAGE_FILE_TYPES}
          onTypeError={(err: string) => {
            setSnackBarContent({ message: `Unsupported File Format. Please make sure the format is one of the following ${ACCEPTED_IMAGE_FILE_TYPES.join(' ,')}`, severity: 'error' })
          }}
          fileOrFiles={files}
          onSizeError={(err: string) => {
            setSnackBarContent({ message: `File is too large. Please make sure each file is less than ${acceptedMaxFileSizeInMB} MB`, severity: 'error' })
          }}
          maxSize={acceptedMaxFileSizeInMB}
        />
        <Typography sx={{ mt: 4, mb: 2 }} variant="body2" component="div">
          <List>
            <ListItem>
            * {MAX_ALLOWED_SIZE_OF_FILE_BATCH_IN_MB} MB of uploads allowed in one go.
            </ListItem>
            <ListItem>
            * File name should only contain alphanumeric (a-zA-Z0-9), underscore (_), hyphen (-), space ( ), forward slash (/) or period (.) characters.
            </ListItem>
          </List>
        </Typography>
        {files && <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} variant="body1" component="div">
            You are uploading the following {files.length} files. Totalling: ~{computeSizeOfFilesInMB(files).toFixed(2)} MB
            <Button type='button'
           size='large' 
           variant="contained"
          onClick={handleSave}
          >Confirm</Button>
          </Typography>

          <Demo>
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
          </Demo>
        </Grid>}
      </Grid>
      <Snackbar
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
      </Snackbar>
    </>
  );
}

const computeSizeOfFilesInMB = (files: File[]) => {
  return files.reduce((prev, curr)=>prev+curr.size,0)/(1000 * 1000)
}