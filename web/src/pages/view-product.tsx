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
import { getProductById } from 'services/products.service';
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

export const ViewProduct = (p: RouteComponentProps<{ id: string }>) => {
    const { routeTo } = useRouting();
    const classes = useStyles();

    const [product, setProduct] = useState<Product>();
    const [details, setDetails] = useState<Record<string, string>>(null!);
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const { loading } = useLoadData(async () => {
        const req = await getProductById(p.match.params.id)
        const product = req.data;
        if (!product) {
            routeTo(urls.shop);
            return;
        }
        const description = product.description;
        if (description) {
            setDetails(JSON.parse(description));
        } else {
            setDetails(null!);
        }
        setProduct(product);
    }, [p.match.params.id]);
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

                    <img src={imageurl ?? ""} alt={name} style={{
                        objectFit: "contain",
                        maxWidth: "500px",
                        maxHeight: "500px"
                        // width: "50%",
                        // height: "50%"
                    }} />
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