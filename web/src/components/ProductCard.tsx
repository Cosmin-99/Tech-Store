import { makeStyles, Chip, Card, CardContent, CardActions } from '@material-ui/core';
import { useState } from 'react';
import { Product } from '../models/Product';
// import { CartContext } from '../utils/contexts';
import { urls, useRouting } from '../utils/routing';
import { TechButton } from './TechButton';
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


export const ProductDisplay = (p: {
    product: Product,
    id: string,
}) => {
    const { product, id } = p;
    const { discount, name, price, imageurl } = product;
    // console.log(product);
    const { routeTo } = useRouting();
    const classes = useStyles();
    // const cart = useContext(CartContext);
    let percent = 0;
    if (discount) {
        percent = 100 - Math.round((100 * (price - discount)) / price)
    }
    const [disabled, setDisabled] = useState(false);
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return <div className={classes.productDisplay}>
        <Chip label={`-${percent}%`} className={classes.chipDiscount} style={{ backgroundColor: discount ? "" : "transparent", color: discount ? "" : "transparent" }} variant="default" />
        <Card>
            <CardContent onClick={() => {
                routeTo(urls.product, { id: id.toString() });
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}>
                    <img src={imageurl ?? ""} alt={name} style={{ objectFit: "contain", width: "100%", maxHeight: "100px", height: "100px" }} />
                    <div title={name} style={{ textAlign: "center", userSelect: "none", textOverflow: "ellipsis", minHeight: "55px", maxHeight: "55px", overflow: "hidden" }}>
                        {name}
                    </div>
                    <div title={discount ? `${price} LEI` : ""} style={{ textAlign: "center", userSelect: "none", fontSize: "12px", color: "#f03", textDecoration: "line-through", minHeight: "14.4px", marginTop: "10px" }}>
                        {discount ? `${price} LEI` : ""}
                    </div>
                    <div style={{ textAlign: "center", userSelect: "none", fontFamily: "proxima-nova-bold", color: "#305F72", marginTop: "10px" }}>
                        {price - (discount ?? 0)} LEI
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <TechButton
                    fullWidth
                    size="large"
                    color="primary"
                    disabled={disabled}
                    variant="contained"
                    onClick={async () => {
                        // cart.add(product);

                        setDisabled(true);
                        await sleep(1000);
                        setDisabled(false);
                    }}
                >
                    Adauga in cos
                        </TechButton>
            </CardActions>
        </Card>
    </div>
}
