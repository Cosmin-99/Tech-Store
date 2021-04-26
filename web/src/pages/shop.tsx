import { Card, CardContent, Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { Category } from '../models/Category';
import { useLoadData } from '../hooks/useLoadData';
import { getCategories } from '../services/categories.service';
// import { getPromotions } from '../services/promotions.service';
// import { Promotion } from '../models/Promotion';
import { LoadingComponent } from '../components/LoadingComponent';


const useStyles = makeStyles((theme) => ({
    categoryText: {
        userSelect: "none",
        // fontFamily: "proxima-nova-bold",
        marginTop: "40px",
        marginBottom: "40px",
        textTransform: "uppercase",
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
        position: "relative",
        bottom: "0px",
        transition: theme.transitions.create(['bottom']),
        '&:hover': {
            bottom: "5px",
        },
    }
}));
export const Shop = () => {
    const classes = useStyles();
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [data, setData] = useState<Category[]>([]);
    const { loading } = useLoadData(async () => {
        const req = await getCategories();
        const categories = req.data;
        setData(categories);
    }, []);


    const CategoryDisplay = (p: {
        category: Category
    }) => {
        const { category } = p;
        return <Card className={classes.categoryDisplay} >
            <CardContent>
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <img src={category.imageurl ?? ""} alt={category.name} width="100px" height="100px" style={{ objectFit: "contain" }} />
                    <div style={{
                        flexGrow: 0, marginLeft: "45px",
                    }}>
                        <div style={{ fontFamily: "proxima-nova-bold", userSelect: "none" }}>
                            {category.name}
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    }

    if (loading) {
        return <LoadingComponent />
    }

    return <>
        <div className={classes.categoryText} style={{ marginLeft: sm ? "0px" : "20px" }}>
            Categorii
        </div>

        {sm && <Grid container>
            <Grid container item spacing={3} style={{ marginBottom: "20px" }}>
                {data.map(category => <Grid key={category.name} item sm={6} md={4} >
                    <CategoryDisplay category={category} />
                </Grid>)}
            </Grid>
        </Grid>}
        {/* Mobile rendering  */}
        {!sm && <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.map(category => <div key={category.name} style={{ margin: "20px", width: "100%" }}>
                <CategoryDisplay category={category} />
            </div>)}
        </div>}


    </>
}