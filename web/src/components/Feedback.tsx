import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const styles = (theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    error: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
    },
    success: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
    },
});

const useStyles = makeStyles(styles);
type Props = {
    error?: boolean
    success?: boolean
    className?: string
}
export const FormFeedback: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    return <div
        className={clsx(
            classes.root,
            { [classes.error]: props.error, [classes.success]: props.success },
            props.className
        )}
    >
        <Typography color="textPrimary">{props.children}</Typography>
    </div>
}

export default withStyles(styles)(FormFeedback);