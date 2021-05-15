import React, { useContext, } from 'react';
import { Grid, Theme, useMediaQuery } from '@material-ui/core';
import { ProductDisplay } from '../components/ProductCard';
import { CartContext } from 'contexts/cartContext';
import { useTitle } from 'hooks/useTitle';
export const FavoriteProduct = () => {
    useTitle("Favorite");
    const cartHook = useContext(CartContext);

    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    return <div >
        {cartHook.favorite.length === 0 && <div style={{ height: "100vh" }}>
            There are no products here :(
        </div>}
        {sm && <Grid container>
            <Grid container item spacing={3} style={{ marginBottom: "20px" }}>
                {cartHook.favorite.map((product, i) => <Grid key={i} item sm={6} md={2}>
                    <ProductDisplay product={product} id={product.id} />
                </Grid>)}
            </Grid>
        </Grid>}
        {!sm && <div style={{ display: "flex", flexWrap: "wrap" }}>
            {cartHook.favorite.map((product, i) => <div key={i} style={{ margin: "20px", width: "100%" }}>
                <ProductDisplay product={product} id={product.id} />
            </div>)}
        </div>}
    </div>
}