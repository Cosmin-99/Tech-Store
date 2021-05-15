import React, { useContext, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Address } from '../models/Address';
import { useLoadData } from '../hooks/useLoadData';
import { FormControl, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import { UserContext } from 'contexts/userContext';
import { Link } from 'react-router-dom';
import { urls } from 'utils/routing';
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
export const AddressForm = (p: {
    onSelectAddress: (address: Address) => void
}) => {
    const classes = useStyles();
    const [addresess, setAddresses] = useState<Address[]>([]);
    const [user] = useContext(UserContext);
    useLoadData(async () => {
        //TODO GET ADDRESSES
        const adresses = JSON.parse(user?.adresses ?? "[]");
        // const addresses = await getAddresses();
        setAddresses(adresses);
    });
    const AddressDisplay = (p: {
        address: Address
    }) => {
        const { address } = p;
        return <div className={classes.flexColumn}>
            <div className={classes.title}>
                {address.firstName} {address.lastName}
            </div>
            <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "proxima-nova"
                }}>
                    <div>
                        {address.address1}
                    </div>
                    <div>
                        {address.state ? `${address.state},${address.city}` : `${address.city}`}
                    </div>
                </div>
            </div>
        </div>
    }
    const [value, setValue] = React.useState('');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = (event.target as HTMLInputElement).value;
        setValue(index);
        p.onSelectAddress(addresess[+index]);
    };
    return (
        <React.Fragment>
            {addresess.length === 0 && <div>
                Nu aveti adrese adaugate , click <Link to={urls.userDetails()}>aici</Link> pentru a adauga
            </div>}
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="address-select" value={value} onChange={handleRadioChange} >
                    {addresess.map((address, i) => {
                        return <FormControlLabel key={i} value={'' + i} control={<Radio color="primary" />} label={<AddressDisplay address={address} />} />
                    })}
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    );
}