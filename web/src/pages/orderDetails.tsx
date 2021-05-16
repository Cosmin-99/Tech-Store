import { RouteComponentProps } from "react-router-dom"
import React, { useMemo, useState } from "react";
import { useLoadData } from "hooks/useLoadData";
import { LoadingComponent } from "components/LoadingComponent";
import { getOrderById } from "services/orders.service";
import { urls, useRouting } from "utils/routing";
import { Order } from "models/Order";
import { Grid, Paper, Box as MuiBox, styled, Avatar, Divider as MuiDivider, Breadcrumbs, Typography, Link } from "@material-ui/core";
import { useTitle } from "hooks/useTitle";
import { spacing } from "@material-ui/system";
import { Address } from "node:cluster";
const Box = styled(MuiBox)(spacing);
const Divider = styled(MuiDivider)(spacing);
export const OrderDetails = (p: RouteComponentProps<{ id: string }>) => {
    useTitle(`Order/${p.match.params.id}`)
    const { routeTo } = useRouting();
    const [order, setOrder] = useState<Order>(null!);
    const { loading } = useLoadData(async () => {
        const id = p.match.params.id;
        if (!id) {
            routeTo(urls.comenzi);
        }
        const req = await getOrderById(id);
        setOrder(req.data);
    }, []);
    const address = useMemo(() => {
        if (order) {
            return JSON.parse(order.address);
        }
        return null;
    }, [order]);
    if (loading || !order) {
        return <LoadingComponent />;
    }
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Breadcrumbs>
                <Link color="inherit" style={{ cursor: "pointer" }} onClick={() => {
                    routeTo(urls.comenzi)
                }}>
                    Comenzile mele
                </Link>
                <Typography color="textPrimary">
                    Detalii Comanda
                </Typography>
            </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
            Comanda nr {p.match.params.id}
        </Grid>
        <Grid item xs={12}>
            <Paper style={{
                padding: "10px",
            }}>
                <div>
                    Plasata pe: {new Date(order.date_of_placement ?? "").toDateString()} {new Date(order.date_of_placement ?? "").toLocaleTimeString()}
                </div>
                <div>
                    Total: {order.subtotal} Lei
                </div>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper style={{ padding: "10px" }}>
                <div>
                    Adresa: {address.address1}
                </div>
                <div>
                    Pentru {`${address.firstName} ${address.lastName}, ${[address.country, address.state, address.city].filter(el => el !== "").join(",")}`}
                </div>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            {(JSON.parse(order.products) as any[]).map((el, i) => (
                <Box mb={6} key={i} style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Avatar variant="square" src={el.imageurl} style={{ height: "100px", width: "100px" }} />
                    {el.name}
                    <div style={{ flexGrow: 1 }}></div>
                    {`${el.price} Lei`}
                </Box>
            ))}
            <Divider mb={4} />
            <Box style={{ display: "flex" }}>
                <div style={{ flexGrow: 1 }}></div>
                Total: {order.subtotal} Lei
            </Box>
        </Grid>
    </Grid>
}