import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Address } from '../models/Address';

export const UserProfileAddress = (p: {
    onAdd?: (address: Address) => void,
    onModify?: (address: Address) => void,
    initialValues?: Address,
}) => {
    const [valuesChecked, setValuesChecked] = useState(false);
    const [initialValues, setInitialValues] = useState<Address>(null!);
    useEffect(() => {
        if (p.initialValues) {
            setInitialValues(p.initialValues);
        }
        else {
            setInitialValues({
                address1: "",
                city: "",
                country: "",
                firstName: "",
                lastName: "",
                zip: "",
                address2: "",
                state: ""
            })
        }
        setValuesChecked(true);
        //eslint-disable-next-line
    }, [])


    const onSubmit = (obj: Address) => {
        if (p.initialValues) {
            p.onModify!(obj);
        } else {
            p.onAdd!(obj);
        }
    }

    if (!valuesChecked) {
        return <div>

        </div>
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ handleChange, values }) => {
                return <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={values.firstName}
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={values.lastName}
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={values.address1}
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.address2}
                                id="address2"
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={values.city}
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="state" value={values.state} name="state" label="State/Province/Region" fullWidth onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                value={values.zip}
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                value={values.country}
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                onChange={handleChange}
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