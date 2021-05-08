import React, { useState } from 'react'
import { makeStyles, Card, CardContent, Grid, useMediaQuery, Theme, Breadcrumbs, Typography } from '@material-ui/core';
import { Category } from '../models/Category';
import { useRouting, urls } from '../utils/routing';
import { useLoadData } from '../hooks/useLoadData';
import Link from '@material-ui/core/Link';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../components/LoadingComponent';
import { getSubcategoriesById } from '../services/categories.service';
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
    categoryDisplay: {
        width: "100%",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        bottom: "0px",
        transition: theme.transitions.create(['bottom']),
        '&:hover': {
            bottom: "5px",
        },
    }

}));

export const ViewSubCategory = (props: RouteComponentProps<{ id: string }>) => {

    const classes = useStyles();
    const { routeTo } = useRouting();
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [title, setTitle] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const { loading } = useLoadData(async () => {
        const { id } = props.match.params;
        if (!id) {
            return;
        }
        const req = await getSubcategoriesById(id);
        const categories = req.data;
        setTitle(categories.categoryName);
        setCategories(categories.subcategories);
    }, [props.match.params]);


    const CategoryDisplay = (p: {
        category: Category
    }) => {
        const { category } = p;
        return <div className={classes.categoryDisplay} onClick={() => {
        }}>
            <Card >
                <CardContent>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img src={category.imageurl ?? ""} alt={category.name} width="100px" height="100px" style={{ objectFit: "contain" }} />

                    </div>
                </CardContent>
            </Card>
            <div style={{ textAlign: "center", marginTop: "10px", userSelect: "none" }}>
                {category.name}
            </div>
        </div>
    }
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
                <Typography color="textPrimary">
                    {title}
                </Typography>
            </Breadcrumbs>
            {/* Categorii / {title} */}
        </div>
        {categories.length === 0 && <div style={{ height: "100vh" }}>
            There are no categories here :(
        </div>}
        {sm && <Grid container>
            <Grid container item spacing={3} style={{ marginBottom: "20px" }}>
                {categories.map(category => <Grid key={category.name} item sm={6} md={2} >
                    <CategoryDisplay category={category} />
                </Grid>)}
            </Grid>
        </Grid>}
        {!sm && <div style={{ display: "flex", flexWrap: "wrap" }}>
            {categories.map(category => <div key={category.name} style={{ margin: "20px", width: "100%" }}>
                <CategoryDisplay category={category} />
            </div>)}
        </div>}
    </>
}