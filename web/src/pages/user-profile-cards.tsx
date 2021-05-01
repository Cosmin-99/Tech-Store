import { Button, Grid, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { CreditCard } from '../models/CreditCard';
import CreditCardInput from 'react-credit-card-input';

export const UserProfileCards = (p: {
    onAdd?: (card: CreditCard) => void,
    onModify?: (card: CreditCard) => void,
    initialValues?: CreditCard
}) => {
    const initialValues = p.initialValues ?? {
        cardName: "",
        cardNumber: "",
        cvv: "",
        expDate: "",
    }
    const onSubmit = (obj: CreditCard) => {
        if (p.initialValues) {
            p.onModify!(obj);
        } else {
            p.onAdd!(obj);
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ handleChange, values, setFieldValue, setErrors, errors }) => {
                return <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <TextField required value={values.cardName} onChange={handleChange} id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <CreditCardInput
                                onError={(e) => {
                                    const err = e as any;
                                    setErrors({ ...errors, [err.inputName]: err.error });
                                }}
                                cardNumberInputProps={{
                                    value: values.cardNumber, onChange: (e) => {
                                        setFieldValue("cardNumber", e.target.value);
                                    }
                                }}

                                cardExpiryInputProps={{
                                    value: values.expDate, onChange: e => {
                                        setFieldValue("expDate", e.target.value);
                                    }
                                }}
                                cardCVCInputProps={{
                                    value: values.cvv, onChange: e => {
                                        setFieldValue("cvv", e.target.value);
                                    }
                                }}
                                fieldClassName="input"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="primary" variant="contained">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            }}
        </Formik>
    );
}

