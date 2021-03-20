import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, InputBase, InputBaseProps, InputLabel } from '@material-ui/core';
import { FieldMetaState } from 'react-final-form';
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        // borderRadius: 16,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        // width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
    },
    error: {
        color: theme.palette.secondary.main,
        paddingTop: "5px",
        paddingBottom: "5px",
    }
}));

export const TechInput = <T extends object>(p: InputBaseProps & {
    label?: string
    meta?: FieldMetaState<T>
}) => {
    const classes = useStyles();
    const { label, meta, ...rest } = p;
    return <FormControl className={classes.formControl} style={{ width: p.fullWidth ? "100%" : "auto" }}>
        <InputLabel shrink htmlFor="bootstrap-input">
            {label} {rest.required && "*"}
        </InputLabel>
        <BootstrapInput {...rest} fullWidth />
        {meta && meta.error && meta.touched && <span className={classes.error}>{meta.error}</span>}
    </FormControl>
}