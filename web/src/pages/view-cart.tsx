import { Button, Card, CardContent, Grid, IconButton, makeStyles, Snackbar, Theme, Typography, useMediaQuery, withStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Product } from '../models/Product';
import { CartContext } from 'contexts/cartContext';
import CloseIcon from '@material-ui/icons/Close';
import { CartProduct } from '../hooks/useCart';
import { TechButton } from '../components/TechButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { urls, useRouting } from '../utils/routing';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    mobileFooter: {
        position: "fixed",
        bottom: 0,
        height: "80px",
        width: "100%",
        boxShadow: theme.shadows[11],
        backgroundColor: theme.palette.background.paper,
    }
}));

const CustomIconButton = withStyles((theme) => ({
    root: {
        borderRadius: 5,
        border: "1px solid #dfdfdf",
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamily,
        boxShadow: 'none',
        marginRight: "5px",
        marginLeft: "5px",
        width: '20px',
        height: "20px",
        [theme.breakpoints.up('sm')]: {
            width: "auto",
            height: "auto"
        },

    },
}))(IconButton);
export const ViewCart = () => {
    const classes = useStyles();

    const { routeTo } = useRouting();

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const cart = useContext(CartContext);
    const [undoProduct, setUndoProduct] = useState<Product>(null!);
    const handleClick = () => {
        setOpenSnackbar(true);
    };
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (undoProduct) {
            cart.add(undoProduct);
        }
        setOpenSnackbar(false);
    };
    const closeSnackbar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }
    const CategoryDisplay = (p: {
        product: CartProduct
    }) => {
        const { product } = p;
        const isFavorite = cart.favorite.findIndex(o => o.id === product.id) !== -1;
        return <div style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
            <Card >
                <CardContent>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <img src={product.imageurl ?? ""} alt={product.name} onClick={() => {
                            routeTo(urls.product, { id: product.id })
                        }} style={{ objectFit: "contain", width: sm ? "100px" : "50px", height: sm ? "100px" : "50px" }} />
                        <div style={{ display: "flex", marginLeft: "20px", width: "100%", flexDirection: "column", marginRight: "50px" }}>
                            <div style={{ display: "flex", marginLeft: "20px", width: "100%" }}>
                                <div style={{ textAlign: "center", userSelect: "none", fontFamily: "proxima-nova-bold", fontSize: sm ? "" : "13px" }}>
                                    {product.name}

                                </div>
                                <div style={{ flexGrow: 1 }} />
                                <div>
                                    <IconButton title="Remove item from cart" size="medium" aria-label="close" color="inherit" onClick={() => {
                                        setUndoProduct(product);
                                        cart.deleteFromCart(product);

                                        handleClick();
                                    }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
                            <div style={{ display: "flex", marginLeft: "20px", width: "100%" }}>
                                {sm && <>
                                    <div
                                        onClick={() => {
                                            if (isFavorite) {
                                                cart.removeFavorite(product);
                                            } else {
                                                cart.addFavorite(product);
                                            }
                                        }}
                                        style={{
                                            fontFamily: "proxima-nova",
                                            color: "#8d8d8d", fontSize: "20px", display: "flex", justifyContent: "center", float: "right", userSelect: "none", cursor: "pointer", marginRight: "10px",
                                        }}>
                                        {isFavorite ? <>
                                            Salvat <FavoriteIcon color="secondary" />
                                        </> : <>
                                            Salveaza <FavoriteBorderIcon fontSize="default" />
                                        </>}

                                    </div>
                                    <div style={{ flexGrow: 1 }}></div>
                                </>}
                                <div style={{ fontSize: "20px", fontFamily: "proxima-nova-bold", display: "flex", flexDirection: "row", alignItems: "center", minWidth: sm ? "300px" : "100%" }}>
                                    {/* <div title={product.discount ? `${ product.pret } LEI` : ""} style={{ userSelect: "none", fontFamily: "proxima-nova", fontSize: "18px", color: "#f03", textDecoration: "line-through", minHeight: "14.4px", marginTop: "10px" }}>
                                        {product.discount ? `${ product.pret } LEI` : ""}
                                    </div> */}
                                    <div style={{ color: "grey", display: "flex", alignItems: "center" }}>
                                        <CustomIconButton size="small" onClick={() => {
                                            if (product.count > 1) {
                                                cart.remove(product);
                                            }
                                        }}>
                                            <RemoveIcon fontSize="small" />
                                        </CustomIconButton>
                                        <div style={{ fontSize: "16px", fontFamily: "proxima-nova" }}>
                                            {product.count} buc
                                        </div>
                                        <CustomIconButton size="small" onClick={() => {
                                            cart.add(product);
                                        }}>
                                            <AddIcon fontSize="small" />
                                        </CustomIconButton>
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                    </div>
                                    <div style={{ fontSize: sm ? "auto" : "12px" }}>
                                        {Math.round((product.price - (product.discount ?? 0)) * product.count * 100) / 100} Lei
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div >
    }
    const snackbar = <Snackbar
        anchorOrigin={sm ? ({
            vertical: 'bottom',
            horizontal: 'left',
        }) : ({
            vertical: 'top',
            horizontal: 'left',
        })}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message="Item removed from cart"
        action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
            </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
    />
    if (cart.cart.length === 0) {
        return <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignContent: "center" }}>
            {snackbar}
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <Typography variant="h4">
                    Nu ai nimic in cos :(
                </Typography>
                <img alt="empty_cart" src={process.env.PUBLIC_URL + "/empty-cart.png"} style={{ objectFit: "contain" }}></img>
            </div>
        </div>
    }
    return <div style={{ minHeight: "100vh" }}>
        {snackbar}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {cart.cart.map((product, i) => <div key={i} style={{ margin: "20px", width: "100%" }}>
                <CategoryDisplay key={product.name} product={product} />
            </div>)}
        </div>
        {sm && <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ minWidth: "300px" }}>
                <div style={{ display: "flex", alignItems: "center" }} >
                    <div style={{ fontFamily: "proxima-nova-bold", fontSize: "20px" }}>
                        Total:
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    < div style={{ fontFamily: "proxima-nova-bold", color: "#305F72", fontSize: "40px" }}>
                        {`${Math.round(cart.cart.reduce((sum, current) => sum + (current.price - (current.discount ?? 0)) * current.count, 0) * 100) / 100} Lei`}
                    </div>
                </div>
                <TechButton
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        routeTo(urls.checkout);
                    }}
                >
                    Proceed
            </TechButton>
            </div>
        </div>}
        {!sm && <div className={classes.mobileFooter}>
            <Grid container>
                <Grid item xs={6}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginBottom: "5px" }}>
                        <div style={{ userSelect: "none", fontFamily: "proxima-nova", fontSize: "15px", color: "#666", minHeight: "14.4px", marginTop: "10px" }}>
                            Total
                        </div>
                        <div style={{ userSelect: "none", fontFamily: "proxima-nova-bold", color: "#305F72", fontSize: "25px" }}>
                            {`${Math.round(cart.cart.reduce((sum, current) => sum + (current.price - (current.discount ?? 0)) * current.count, 0) * 100) / 100} Lei`}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
                        <TechButton
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                routeTo(urls.checkout)
                            }}
                        >
                            Proceed
                        </TechButton>
                    </div>
                </Grid>
            </Grid>
        </div>}

    </div >
}