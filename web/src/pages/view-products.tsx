import { useState } from 'react';
import { Breadcrumbs, Grid, Link, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { useLoadData } from '../hooks/useLoadData';
import { RouteComponentProps } from 'react-router-dom';
import { Product } from '../models/Product';
import { urls, useRouting } from '../utils/routing';
import { ProductDisplay } from '../components/ProductCard';
import { LoadingComponent } from '../components/LoadingComponent';
import { getProductBySubcategoryId } from 'services/products.service';
import { useTitle } from 'hooks/useTitle';
const useStyles = makeStyles((theme) => ({
    categoryText: {
        userSelect: "none",
        fontFamily: "proxima-nova-bold",
        marginTop: "40px",
        marginBottom: "40px",
        textDecoration: "none",
    },
    carrouselBox: {
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center"
    },
    chipDiscount: {
        position: "relative",
        top: "15px",
        left: "20px",
        backgroundColor: "#f03",
        color: "white",
        fontSize: "20px",

    },
    productDisplay: {
        width: "100%",
        cursor: "pointer",
        position: "relative",
        userSelect: "none",
        bottom: "0px",
        transition: theme.transitions.create(['bottom']),
        '&:hover': {
            bottom: "15px",
        },
    }

}));


export const ViewProducts = (props: RouteComponentProps<{ subCategory: string }>) => {
    useTitle("Products");
    const classes = useStyles();

    const { routeTo } = useRouting();
    const [title, setTitle] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [parentCategory, setParentCategory] = useState<{
        name: string;
        id: number;
    }>({
        name: "",
        id: 0
    });
    const { loading } = useLoadData(async () => {
        const { subCategory } = props.match.params;
        if (!subCategory || subCategory === "undefined") {
            // routeTo(urls.shop);
            return;
        }
        const req = await getProductBySubcategoryId(subCategory);
        console.log(req.data);
        setParentCategory(req.data.category);
        setTitle(req.data.subcategory.name);
        setProducts(req.data.products);

    });
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    if (loading) {
        return <LoadingComponent />
    }
    return <>
        <div className={classes.categoryText} style={{ marginLeft: sm ? "0px" : "20px" }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={{ cursor: "pointer" }} onClick={() => {
                    routeTo(urls.shop);
                }}>
                    Categorii
                </Link>
                <Link color="inherit" style={{ cursor: "pointer" }} onClick={() => {
                    routeTo(urls.subcategory, { id: parentCategory.id.toString() });
                }}>
                    {parentCategory.name}
                </Link>
                <Typography color="textPrimary">
                    {title}
                </Typography>
            </Breadcrumbs>
        </div>
        {products.length === 0 && <div style={{ height: "100vh" }}>
            There are no products here :(
        </div>}
        {sm && <Grid container>
            <Grid container item spacing={3} style={{ marginBottom: "20px" }}>
                {products.map((product, i) => <Grid key={i} item sm={6} md={2}>
                    <ProductDisplay product={product} id={product.id} />
                </Grid>)}
            </Grid>
        </Grid>}
        {!sm && <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product, i) => <div key={i} style={{ margin: "20px", width: "100%" }}>
                <ProductDisplay product={product} id={product.id} />
            </div>)}
        </div>}
    </>
}