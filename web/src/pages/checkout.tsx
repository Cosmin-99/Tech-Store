import { Button, makeStyles, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AddressForm } from '../components/AdressForm';
import { PaymentForm } from '../components/PaymentForm';
import { Review } from '../components/Review';
import { Address } from '../models/Address';
import { CreditCard } from '../models/CreditCard';
import { CartContext } from 'contexts/cartContext';
import { LoadingComponent } from '../components/LoadingComponent';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        minHeight: "100vh",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));
export const Checkout = () => {
    const classes = useStyles();

    const steps = ['Shipping address', 'Payment details', 'Review your order'];
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<Address>(null!);
    const [card, setCard] = useState<CreditCard>(null!);
    const cart = useContext(CartContext);
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm onSelectAddress={(address) => {
                    setAddress(address);
                }} />;
            case 1:
                return <PaymentForm onSelectCard={card => {
                    setCard(card);
                }} />;
            case 2:
                return <Review address={address} card={card} />;
            default:
                throw new Error('Unknown step');
        }
    }
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        if (activeStep === 0 && !address) {
            alert("Trebuie sa selectezi o locatie!");
        } else if (activeStep === 1 && !card) {
            alert("Trebuie sa selectezi un card!");
        } else {
            setActiveStep(activeStep + 1);
            if (activeStep === steps.length - 1) {
                setLoading(true);
                const order = {
                    card,
                    address,
                    items: cart.cart,
                    date: new Date().toISOString(),
                }
                console.log(order);
                // db.collection("comenzi");
                // const res = await db.collection("comenzi").add(order);
                // await addOrder(res.id);
                // await db.collection("comenzi").doc(res.id).set({
                //     ...order, id: res.id
                // })
                cart.emptyCart();
                // setOrderId(res.id);
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    if (loading) {
        return <LoadingComponent />;
    }
    return <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
      </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is {orderId}. We have emailed your order confirmation, and will
                            send you an update when your order has shipped.
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        </Paper>
    </main>
}