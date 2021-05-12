import { Typography, Link, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { AppForm } from '../components/AppForm';
import { TechButton } from '../components/TechButton';
import { TechInput } from '../components/TechInput';
import { FormFeedback } from '../components/Feedback';
import { User } from '../models/User';
import { getKeys } from '../utils/utilFunctions';
import { urls, useRouting } from '../utils/routing';
import { userRegister } from '../services/user.service';
import { useTitle } from '../hooks/useTitle';
const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(6),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
}));

export const Register = () => {
    useTitle("Register");
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [stringError, setStringError] = useState("");

    const { routeTo } = useRouting();
    const keys = getKeys<Omit<User, "adresses" | "cards" | "cart">>({
        email: 1,
        firstName: 1,
        lastName: 1,
        password: 1,
        token: 1,
        role: 1,
    })
    const handleSubmit = async (o: User) => {
        try {
            await userRegister(o);
            routeTo(urls.shop);
        } catch (error) {
            setError(true);
            setStringError(error.message);
        }

    }
    const validate = (values: User) => {
        const errors = {} as User;
        if (!values.email) {
            errors.email = 'Required'
        }
        if (!values.password) {
            errors.password = 'Required'
        }
        if (!values.firstName) {
            errors.firstName = 'Required'
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        return errors
    }
    return <AppForm>
        <React.Fragment>
            <Typography variant="h3" gutterBottom align="center">
                Sign Up
            </Typography>
            <Typography variant="body2" align="center">
                <Link underline="always" onClick={() => routeTo(urls.login)}>
                    Already have an account?
                </Link>
            </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
            {({ handleSubmit, submitting, submitError }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <Field name={keys.firstName}>
                                {({ input, meta }) => (
                                    <div>
                                        <TechInput {...input} label="First Name" meta={meta} fullWidth required />
                                    </div>
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name={keys.lastName}>
                                {({ input, meta }) => (
                                    <div>
                                        <TechInput {...input} label="Last Name" meta={meta} fullWidth required />
                                    </div>
                                )}
                            </Field>
                        </Grid>
                    </Grid>
                    <Field name={keys.email}>
                        {({ input, meta }) => (
                            <div>
                                <TechInput {...input} label="Email" meta={meta} type="email" fullWidth required />
                            </div>
                        )}
                    </Field>
                    <Field name={keys.password}>
                        {({ input, meta }) => (
                            <div>
                                <TechInput {...input} label="Password" type="password" meta={meta} fullWidth required />
                            </div>
                        )}
                    </Field>
                    {error && <FormFeedback className={classes.feedback} error>
                        {stringError}
                    </FormFeedback>}
                    <TechButton
                        className={classes.button}
                        disabled={submitting}
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Sign Up
                    </TechButton>
                </form>
            )}
        </Form>
    </AppForm>
}