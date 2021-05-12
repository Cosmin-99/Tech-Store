import { Chip, Divider, Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TechButton } from '../components/TechButton';
import { useLoadData } from '../hooks/useLoadData';
import { Product } from '../models/Product';
import { urls, useRouting } from '../utils/routing';
import { ProductDetailsTable } from '../components/ProductDetailsTable';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import { Promotion } from '../models/Promotion';
import { AddToCartButton } from '../components/AddToCartButton';
import { LoadingComponent } from '../components/LoadingComponent';
const useStyles = makeStyles((theme) => ({
    grid: {
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(['box-shadow']),
        boxShadow: theme.shadows[1],
        '&:hover': {
            boxShadow: theme.shadows[11],
        },
    },
    categoryText: {
        fontFamily: "proxima-nova-bold",
        fontSize: "24px",
        marginTop: "40px",
        marginBottom: "40px",
        textDecoration: "none",
    },
    spacingContainer: {
        marginLeft: "5px",
    },
    chipDiscount: {
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "#f03",
        color: "white",
        fontSize: "20px",
    },
    mobileFooter: {
        position: "fixed",
        bottom: 0,
        height: "80px",
        width: "100%",
        boxShadow: theme.shadows[11],
        backgroundColor: theme.palette.background.paper,
    },
    saveIcon: {
        backgroundColor: theme.palette.secondary.light
    }
}));

export const ViewProduct = (p: RouteComponentProps<{ product: string }>) => {
    const { routeTo } = useRouting();
    const classes = useStyles();

    const [product, setProduct] = useState<Product>();
    const [details, setDetails] = useState<object>(null!);
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const { loading } = useLoadData(async () => {
        // const product = await getProductById(p.match.params.product);
        const product = {
            name: "Produs",
            pret: 500,
            discount: 100,
            imageurl: "https://s13emagst.akamaized.net/products/10663/10662750/images/res_ecfc088b490d89ed2e289fc4dd889641.jpg?width=450&height=450&hash=95A4B7319532656D6EC386362AF0004A",
            details: {
                "Slot": "PCI Express 2.0",
                "Procesor Video": "GeForce GT 710",
                "Rezolutie maxima": "4096 x 2160",
                "Tip placa": "Multimedia"
            }
        } as any;
        if (!product) {
            routeTo(urls.shop);
            return;
        }
        const details = product.details;
        if (details) {
            setDetails(details)
        } else {
            setDetails(null!);
        }
        setProduct(product);
    }, [p.match.params.product]);
    if (loading || !product) {
        return <LoadingComponent />
    }
    const { name, price, discount, imageurl } = product;
    let percent = 0;
    if (discount) {
        percent = 100 - Math.round((100 * (price - discount)) / price)
    }
    return <>
        {sm && <Grid container className={classes.grid}>
            <Grid item xs={8}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}>
                    <img src={imageurl ?? ""} alt={name} style={{ objectFit: "contain" }} />
                </div>
            </Grid>
            <Grid item xs={4} sm container>
                <Grid item xs container direction="column">
                    <Grid item>
                        <div className={classes.spacingContainer}>
                            <div className={classes.categoryText}>
                                {name}
                            </div>
                            {/* <div
                                onClick={() => {
                                    if (isFavorite) {
                                        cart.removeFavorite(product);
                                    } else {
                                        cart.addFavorite(product);
                                    }
                                }}
                                style={{
                                    color: "#8d8d8d", fontSize: "20px", display: "flex", justifyContent: "center", float: "left", userSelect: "none", cursor: "pointer"
                                }}>
                                {isFavorite ? <>
                                    Salvat <FavoriteIcon color="secondary" />
                                </> : <>
                                    Salveaza <FavoriteBorderIcon fontSize="default" />
                                </>}

                            </div> */}
                        </div>
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item>
                        <div className={classes.spacingContainer}>
                            <Chip label={`-${percent}%`} className={classes.chipDiscount} style={{ backgroundColor: discount ? "" : "transparent", color: discount ? "" : "transparent" }} variant="default" />
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.spacingContainer}>
                            <div title={product.discount ? `${product.price} LEI` : ""} style={{ userSelect: "none", fontFamily: "proxima-nova", fontSize: "18px", color: "#f03", textDecoration: "line-through", minHeight: "14.4px", marginTop: "10px" }}>
                                {product.discount ? `${product.price} LEI` : ""}
                            </div>
                        </div>
                    </Grid>
                    <Grid item >
                        <div className={classes.spacingContainer}>
                            <div style={{ userSelect: "none", fontFamily: "proxima-nova-bold", color: "#305F72", fontSize: "32px", marginTop: "10px", }}>
                                {price - (discount ?? 0)} LEI
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <Divider />
                    </Grid>
                    <Grid item container alignItems="flex-end" style={{ backgroundColor: "blue", marginTop: "auto" }}>
                        <AddToCartButton
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                // cart.add(product);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>}
        {!sm && <Grid container direction="column" className={classes.grid}>
            <Grid item>
                <div className={classes.categoryText}>
                    {name}
                </div>

            </Grid>
            <Grid item>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                    <img src={imageurl ?? ""} alt={name} style={{ objectFit: "contain", width: "200px", height: "auto" }} />
                </div>
                <div
                    onClick={() => {
                        // if (isFavorite) {
                        //     cart.removeFavorite(product);
                        // } else {
                        //     cart.addFavorite(product);
                        // }
                    }}
                    style={{
                        color: "#8d8d8d", fontSize: "20px", display: "flex", justifyContent: "center", float: "right", userSelect: "none", cursor: "pointer", marginRight: "10px",
                    }}>
                    {/* {isFavorite ? <>
                        Salvat <FavoriteIcon color="secondary" />
                    </> : <>
                        Salveaza <FavoriteBorderIcon fontSize="default" />
                    </>} */}

                </div>
            </Grid>
        </Grid>}
        {!sm && <div className={classes.mobileFooter}>
            <Grid container>
                <Grid item xs={6}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginBottom: "5px" }}>
                        <div title={product.discount ? `${product.price} LEI` : ""} style={{ userSelect: "none", fontFamily: "proxima-nova", fontSize: "15px", color: "#f03", textDecoration: "line-through", minHeight: "14.4px", marginTop: "10px" }}>
                            {product.discount ? `${product.price} LEI` : ""}
                        </div>
                        <div style={{ userSelect: "none", fontFamily: "proxima-nova-bold", color: "#305F72", fontSize: "30px" }}>
                            {price - (discount ?? 0)} LEI
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
                                // cart.add(product);
                            }}
                        >
                            <ShoppingCartIcon style={{ color: "white" }} />
                        </TechButton>
                    </div>
                </Grid>
            </Grid>
        </div>}

        {details && <div>
            <div className={classes.categoryText}>
                Specificatii
            </div>
            <ProductDetailsTable product={details} />
        </div>}
    </>
}