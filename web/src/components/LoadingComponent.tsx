import React from 'react';
import { makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const LoadingComponent = () => {
    const classes = useStyles();
    return <div style={{ height: "100vh" }} >
        <Backdrop className={classes.backdrop} open={true} >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
}