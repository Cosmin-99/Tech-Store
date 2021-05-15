import React, { useContext, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import { CreditCard } from '../models/CreditCard';
import { useLoadData } from '../hooks/useLoadData';
// import { getCards } from '../services/user.service';
import { Link } from 'react-router-dom';
import { route, urls } from '../utils/routing';
import { UserContext } from 'contexts/userContext';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(2)
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #CCC",
        width: "100%"
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
export const PaymentForm = (p: {
    onSelectCard: (card: CreditCard) => void
}) => {
    const classes = useStyles();
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [checked, setChecked] = useState(false);
    const [user,] = useContext(UserContext);
    useLoadData(async () => {
        const cards = JSON.parse(user?.cards ?? "[]")
        setCards(cards);
        setChecked(true);
    }, []);
    const CardDisplay = (p: {
        card: CreditCard
    }) => {
        const { card } = p;

        return <div className={classes.flexColumn}>
            <div className={classes.title}>
                {card.cardName}
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "proxima-nova"
                }}>
                    <div>
                        **** **** **** {card.cardNumber.split(" ")[3]}
                    </div>
                    <div>
                        {card.expDate}
                    </div>
                </div>
            </div>
        </div>
    }
    const [value, setValue] = React.useState('');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = (event.target as HTMLInputElement).value;
        setValue(index);
        p.onSelectCard(cards[+index]);
    };
    if (!checked) {
        return <div>

        </div>
    }
    return (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                {cards.length === 0 && <div>
                    Nu ai carduri adaugate , poti adauga un card <Link to={route(urls.userDetails)}>
                        aici
                    </Link>
                </div>}
                <RadioGroup aria-label="address-select" value={value} onChange={handleRadioChange} >
                    {cards.map((card, i) => {
                        return <FormControlLabel key={i} value={'' + i} control={<Radio color="primary" />} label={<CardDisplay card={card} />} />
                    })}
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    );
}