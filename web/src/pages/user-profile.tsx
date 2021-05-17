import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import { Button, CardMedia, Grid } from '@material-ui/core';

import { deepPurple } from '@material-ui/core/colors';

import { urls, useRouting } from '../utils/routing';
import { UserContext } from '../contexts/userContext';
import { useTitle } from 'hooks/useTitle';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            padding: "10px",
        }
    },
    data: {
        display: 'grid',
        gridTemplateColumns: '65% 35%',
        gridColumnGap: '1em'

    },
    data_info: {
        display: 'grid',
        gridTemplateColumns: '30% 60%',

    },
    avatar: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: 'auto'
    },

    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },

    media: {
        width: 156,
        height: 134,
        margin: 'auto'
    },
    typography: {
        minHeight: "40px",
    }
}));


export const UserProfile = () => {
    useTitle("My Profile");
    const { routeTo } = useRouting();
    const classes = useStyles();
    const [user] = useContext(UserContext);

    const handelOrdersView = () => {
        routeTo(urls.comenzi);
    }
    const handelFavoritesView = () => {
        routeTo(urls.favorite);
    }
    const handelCardsView = () => {
        routeTo(urls.userDetails);
    }
    const handelAddressView = () => {
        routeTo(urls.userDetails);
    }
    if (user === null) {
        return <div></div>
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <Card>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Typography align='center' variant='h6' >Datele Contului</Typography>
                                <CardMedia
                                    style={{
                                        width: 180,
                                        height: 150,
                                        margin: 'auto'
                                    }}
                                    image={process.env.PUBLIC_URL + "/user.png"}
                                    title="cards"
                                /></Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" > Prenume: {user.firstname} </Typography>
                                <Typography variant="body1" > Nume: {user.lastname} </Typography>
                                <Typography variant="body1" > Email: {user.email} </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" style={{ width: "100%" }} onClick={() => {
                                    routeTo(urls.userDetails);
                                }}>administreaza datele tale</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Card>
                        <Typography align='center' variant='h6'>Cardurile mele</Typography>
                        <CardMedia
                            className={classes.media}
                            image={process.env.PUBLIC_URL + "/card.png"}
                            title="cards"
                        />
                        <Typography align='center' variant="body2" className={classes.typography}>Adauga un card pentru a plati comenzile viitoare fara sa reintroduci toate datele.</Typography>
                        <Button onClick={handelCardsView} variant="contained" color="primary" style={{ width: "100%" }} >administreaza carduri</Button>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card>
                        <Typography align='center' variant='h6'>Adresele mele</Typography>
                        <CardMedia
                            className={classes.media}
                            image={process.env.PUBLIC_URL + "/location.png"}
                            title="address"
                        />
                        <Typography align='center' variant="body2" className={classes.typography}>Adauga o adresa si o persoana de contact pentru a comanda mult mai rapid pe TechStore</Typography>
                        <Button onClick={handelAddressView} variant="contained" color="primary" style={{ width: "100%" }}>adauga adresa</Button>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card>
                        <Typography align='center' variant='h6'>Produse Favorite</Typography>
                        <CardMedia
                            className={classes.media}
                            image={process.env.PUBLIC_URL + "/favorite.png"}
                            title="favorites products"
                        />
                        <Typography align='center' variant="body2" className={classes.typography}>Adauga produsele favorite, profita de reducerile noastre, si nu ezita sa le comanzi</Typography>
                        <Button onClick={handelFavoritesView} variant="contained" color="primary" style={{ width: "100%" }}>produse favorite</Button>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card>
                        <Typography align='center' variant='h6'>Comenzi plasate</Typography>
                        <CardMedia
                            className={classes.media}
                            image={process.env.PUBLIC_URL + "/orders.png"}
                            title="orders"
                        />
                        <Typography align='center' variant="body2" className={classes.typography}>Vezi comenzile plasate, cele pe care le-ai primit deja si cele care sunt in drum spre tine</Typography>
                        <Button onClick={handelOrdersView} variant="contained" color="primary" style={{ width: "100%" }}>comenzi plasate</Button>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
// template-id: d-7cfd72dd77f74277a7334d4f297b11e3
// api key: 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