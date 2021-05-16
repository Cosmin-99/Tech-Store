import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';
import { useLoadData } from '../hooks/useLoadData';
import { Order } from 'models/Order';
import { getCurrentOrders } from 'services/orders.service';
import { TechButton } from 'components/TechButton';
import { urls, useRouting } from 'utils/routing';
export const UserOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { loading } = useLoadData(async () => {
        const orders = await getCurrentOrders();
        setOrders(orders.data);
    });
    const { routeTo } = useRouting();
    const OrderDisplay = (p: {
        order: Order
    }) => {
        const { order } = p;
        return <Paper style={{
            padding: "20px",
            marginBottom: "20px",
        }}>
            <div style={{
                borderBottom: "1px solid #cecece",
                marginBottom: "20px",
            }}>
                <div style={{ fontFamily: "proxima-nova-bold", fontSize: "20px", color: "#005596", display: "flex", alignItems: "center" }}>
                    <div>
                        Comanda cu id-ul: {order.id}
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <TechButton variant="outlined" color="primary" size="small" onClick={() => { routeTo(urls.orderDetails, { id: order.id }) }}>
                        Detalii comanda
                    </TechButton>
                </div>
                <div style={{ fontFamily: "proxima-nova", marginBottom: "20px" }}>
                    Plasata pe: {new Date(order.date_of_placement ?? "").toDateString()} {new Date(order.date_of_placement ?? "").toLocaleTimeString()}
                </div>
            </div>
            <div style={{ fontFamily: "proxima-nova" }}>
                <div>
                    Adresa: {JSON.parse(order.address).address1}
                </div>
                <div>
                    Subtotal: {order.subtotal} Lei
                </div>
            </div>
        </Paper>
    }
    if (loading) {
        return <LoadingComponent />;
    }
    return <div>
        {orders.map(order => <OrderDisplay key={order.id} order={order} />)}
    </div>
}