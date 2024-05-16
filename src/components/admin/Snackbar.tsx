"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import { Dispatch, SetStateAction, useState } from "react";

type SnackBarContentType = { message: string, severity: AlertProps['severity'] } | null
const vertical = 'bottom'
const horizontal = 'right'


export function useCustomSnackbar(): [Dispatch<SetStateAction<SnackBarContentType>>, JSX.Element] {
    const [snackBarContent, setSnackBarContent] = useState<SnackBarContentType>(null);
    const onAlertClose = () => {
        setSnackBarContent(null)
    }
    return [setSnackBarContent, <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarContent !== null}
        key={vertical + horizontal}
        sx={{ zIndex: 100000 }}
    >
        <Alert onClose={onAlertClose}
            severity={snackBarContent?.severity}
            sx={{ width: '100%', zIndex: 100000 }}>
            {snackBarContent?.message}
        </Alert>
    </Snackbar>]
}

