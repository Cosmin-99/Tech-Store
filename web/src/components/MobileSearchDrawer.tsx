import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import { searchProducts } from 'services/categories.service';
import { useLoadData } from 'hooks/useLoadData';
import { urls, useRouting } from 'utils/routing';
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: "100%",
        height: "100%",
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "0px",
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing(0),
        },
    },
    openPaper: {
        borderTop: "1px solid rgba(0,0,0,.2)", boxShadow: "0 2px 3px 0 rgba(0,0,0,.3)"
    },
    product: {
        marginBottom: "20px",
        maxHeight: "30px",
        textOverflow: "ellipsis",
        cursor: "pointer",
        overflow: "hidden",
        color: "#305F72"
    }
}))

export const MobileSearchDrawer = (p: {
    open: boolean,
    searchText: string,
    onClickProduct: () => void,
}) => {
    const { open, searchText, onClickProduct } = p;

    const [products, setProducts] = useState<any[]>([]);
    const { routeTo } = useRouting();
    useLoadData(async () => {
        if (!searchText) {
            return;
        }
        const req = await searchProducts({
            searchString: searchText
        });
        setProducts(req.data);
    }, [searchText]);
    const classes = useStyles();
    return <div className={clsx(classes.drawerPaper, !open && classes.drawerPaperClose, open && classes.openPaper)}>
        <div style={{ display: "flex", flexDirection: "column", padding: "2rem 2rem 8rem", }}>
            {products.map((product, i) => <div key={i} className={classes.product} onClick={() => {
                routeTo(urls.product, { id: product.id });
                onClickProduct();
            }}>
                {product.name}
            </div>)}
            {products.length === 0 && !searchText && <div className={classes.product}>
                Type in for a product
            </div>}
            {products.length === 0 && searchText && <div className={classes.product}>
                No products found for what you have typed
            </div>}
        </div>
    </div>
}