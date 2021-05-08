import React, { useContext, useState } from 'react';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, Grid, makeStyles, TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { TechButton } from '../components/TechButton';
import { UserProfileAddress } from './user-profile-address';
import { UserProfileCards } from './user-profile-cards';
import { Address } from '../models/Address';
import { useLoadData } from '../hooks/useLoadData';
import { LoadingComponent } from '../components/LoadingComponent';
import { CreditCard } from '../models/CreditCard';
import { UserContext } from '../contexts/userContext';
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            padding: "10px",
        }
    },
    button: {
        marginRight: theme.spacing(2)
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #CCC",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row"
    },
    title: {
        fontFamily: "proxima-nova-bold",
        marginBottom: theme.spacing(1),
    }

}));

export const UserDetails = () => {
    const classes = useStyles();
    const [user] = useContext(UserContext);

    const [addresses, setCurrentAddresses] = useState<Address[]>([]);
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [modifyCard, setModifyCard] = useState<CreditCard>(null!);
    const [modifyAddress, setModifyAddress] = useState<Address>(null!);
    const [open, setOpen] = React.useState(false);
    const [userIsChecked, setUserIsChecked] = React.useState(false);
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleOpenDialog = () => {
        setOpen(true);
    }
    const { loading } = useLoadData(async () => {
        // const addresses = await getAddresses();
        setCurrentAddresses(addresses);
        // const cards = await getCards();
        setCards(cards);
        setUserIsChecked(true);
    });
    const [componentRender, setComponent] = React.useState("");
    const saveUserDetails = (obj: {
        firstName: string;
        lastName: string;
    }) => {
        //TODO save in db user
    }
    const handleAddressView = () => {
        setOpen(true);
        setComponent("address")
        setModifyAddress(null!);
    }
    const handleAddCard = () => {
        setOpen(true);
        setComponent("cards");
    }
    function renderSwitch() {
        switch (componentRender) {
            case 'cards':
                return <UserProfileCards
                    initialValues={modifyCard}
                    onAdd={async card => {
                        // await addCard(card);
                        setCards([...cards, card]);
                        setOpen(false);
                    }}
                    onModify={async card => {
                        const index = cards.findIndex(c => c === modifyCard);
                        if (index !== -1) {
                            const newCards = cards.map((c, i) => i === index ? card : c);
                            setCards(newCards);
                            // await setDBCards(newCards);
                        }

                        setOpen(false);
                    }}
                />;
            case 'address':
                return <UserProfileAddress
                    initialValues={modifyAddress}
                    onModify={async addr => {
                        const index = addresses.findIndex(address => address === modifyAddress);
                        if (index !== -1) {
                            const newAddresses = addresses.map((address, i) => i === index ? addr : address);
                            setCurrentAddresses(newAddresses);
                            // await setAddresses(newAddresses);
                        }
                        setOpen(false);
                    }}
                    onAdd={async addr => {
                        // await addAddress(addr);
                        setCurrentAddresses([...addresses, addr]);
                        setOpen(false);
                    }} />;
            default:
                return <div />
        }
    }
    const CardDisplay = (p: {
        card: CreditCard
    }) => {
        const { card } = p;

        const onDeleteCard = async () => {
            const newAddresses = cards.filter(s => s !== card);
            setCards(newAddresses);
            // await setDBCards(newAddresses);
        }
        const onModifyCard = () => {
            handleOpenDialog();
            setModifyCard(card);
            setComponent("cards")
        }
        return <div className={classes.flexColumn}>
            <div className={classes.title}>
                {card.cardName}
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div>
                        **** **** **** {card.cardNumber.split(" ")[3]}
                    </div>
                    <div>
                        {card.expDate}
                    </div>
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <div className={classes.flexRow}>
                    <TechButton variant="outlined" color="primary" size="small" className={classes.button} onClick={onModifyCard}>
                        Modifica
                </TechButton>
                    <TechButton variant="outlined" color="primary" size="small" onClick={onDeleteCard}>
                        Sterge
                </TechButton>
                </div>
            </div>
        </div>
    }

    const AddressDisplay = (p: {
        address: Address
    }) => {
        const { address } = p;

        const onDeleteAddress = async () => {
            const newAddresses = addresses.filter(s => s !== address);
            setCurrentAddresses(newAddresses);
            // await setAddresses(newAddresses);
        }
        const onModifyAddress = () => {
            handleOpenDialog();
            setModifyAddress(address);
            setComponent("address")
        }
        return <div className={classes.flexColumn}>
            <div className={classes.title}>
                {address.firstName} {address.lastName}
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div>
                        {address.address1}
                    </div>
                    <div>
                        {address.state ? `${address.state},${address.city}` : `${address.city}`}
                    </div>
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <div className={classes.flexRow}>
                    <TechButton variant="outlined" color="primary" size="small" className={classes.button} onClick={onModifyAddress}>
                        Modifica
                    </TechButton>
                    <TechButton variant="outlined" color="primary" size="small" onClick={onDeleteAddress}>
                        Sterge
                    </TechButton>
                </div>
            </div>
        </div>
    }
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    if (loading || !userIsChecked) {
        return <LoadingComponent />
    }
    return <div className={classes.root}>
        <Dialog

            fullWidth={true}
            maxWidth={'xs'}
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogContent style={{ overflow: "hidden" }}>
                {renderSwitch()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Grid container spacing={sm ? 4 : 0}>
            <Grid item xs={12}>
                <Formik
                    initialValues={user}
                    onSubmit={saveUserDetails}
                >
                    {({ values, handleChange }) => {
                        return (<Form>
                            <Typography gutterBottom>
                                Datele mele
                            </Typography>
                            <Card>
                                <CardContent style={{ overflow: "auto" }}>
                                    <Grid container spacing={2}>
                                        <Grid container item xs={12} direction="row" alignItems="center">
                                            <Grid item xs={2}>
                                                <Typography>First Name</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField value={values.firstName} id="firstName" variant="outlined" placeholder="First Name" size="small" fullWidth onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} direction="row" alignItems="center">
                                            <Grid item xs={2}>
                                                <Typography>Last Name</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField value={values.lastName} id="lastName" variant="outlined" placeholder="Last Name" size="small" fullWidth onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} direction="row" alignItems="center">
                                            <Grid item xs={2}>
                                                <Typography>Email</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField disabled={true} value={values.email} id="email" variant="outlined" placeholder="Email" type="email" size="small" fullWidth onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" type="submit" color="primary">
                                        Salveaza
                                     </Button>
                                </CardActions>
                            </Card>
                        </Form>)
                    }}
                </Formik>
            </Grid>
            <Grid item xs={12}>
                <Typography gutterBottom>
                    Adrese de livrare
                </Typography>
                <Card>
                    <CardContent>
                        {addresses.length === 0 && <div>
                            Inca nu ai nici o adresa adaugata , apasa mai jos pentru a adauga o adresa
                        </div>}
                        {addresses.map((address, i) => <AddressDisplay address={address} key={i} />)}
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleAddressView}>
                            Adauga Adresa
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Typography gutterBottom>
                    Carduri
                </Typography>
                <Card>
                    <CardContent>
                        {cards.length === 0 && <div >
                            Inca nu ai nici un card adaugat , apasa mai jos pentru a adauga un card
                        </div>}
                        {cards.map((card, i) => <CardDisplay card={card} key={i} />)}
                        {/* {addresses.map((address, i) => <AddressDisplay address={address} key={i} />)} */}
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleAddCard}>
                            Adauga Card
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </div >
}