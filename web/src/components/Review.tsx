import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { CartContext } from 'contexts/cartContext';
import { Address } from '../models/Address';
import { CreditCard } from '../models/CreditCard';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export const Review = (p: {
    card: CreditCard,
    address: Address
}) => {
    const { address, card } = p;
    const payments = [
        { name: 'Card holder', detail: card.cardName },
        { name: 'Card number', detail: `xxxx-xxxx-xxxx-${card.cardNumber.split(" ")[3]}` },
        { name: 'Expiry date', detail: card.expDate },
    ];
    const classes = useStyles();
    const cartHook = useContext(CartContext);
    const products = cartHook.cart;//.map(cart => ({name:cart.name,}))
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={`${product.name} * ${product.count}`} />
                        <Typography variant="body2">{product.price * product.count} Lei</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {Math.round(products.reduce((sum, curr) => sum + curr.price * curr.count, 0) * 100) / 100} Lei
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{address.firstName} {address.lastName}</Typography>
                    <Typography gutterBottom>{address.address1}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}