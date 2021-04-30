import { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme, createStyles, TableCell, TableRow, makeStyles, TableContainer, Table, TableBody } from '@material-ui/core';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);
const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
    },
});
export const ProductDetailsTable = <T extends object>(p: {
    product: T
}) => {
    const { product } = p;

    const [data, setData] = useState(product);
    useEffect(() => {
        setData(product);
    }, [product]);
    const keys = useMemo(() => Object.keys(data) as (keyof T)[], [data])
    const classes = useStyles();
    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableBody>
                {keys.map((key, i) => <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                        {key}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {product[key]}
                    </StyledTableCell>
                </StyledTableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
}