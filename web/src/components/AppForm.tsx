import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Paper } from '@material-ui/core';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        backgroundRepeat: 'no-repeat',

    },
    paper: {
        padding: theme.spacing(4, 3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8, 6),
        },
    },
});
const useStyles = makeStyles(styles);
export const AppForm: React.FunctionComponent<{}> = (props) => {
    const { children } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="sm">
                <Box mt={7} mb={12}>
                    {children}
                    {/* <Paper className={classes.paper} background="light">{children}</Paper> */}
                </Box>
            </Container>
        </div>
    );
}
