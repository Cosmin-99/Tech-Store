import { Typography, Link, FormControlLabel, Checkbox, IconButton, SvgIcon, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { AppForm } from '../components/AppForm';
import { TechButton } from '../components/TechButton';
import { TechInput } from '../components/TechInput';
import { FormFeedback } from '../components/Feedback';
import FacebookIcon from '@material-ui/icons/Facebook';
import { User } from '../models/User';
import { getKeys } from '../utils/utilFunctions';
import { urls, useRouting } from '../utils/routing';
import { userLogin } from '../endpoints/login';
import GoogleLogin, { GoogleLoginResponse, } from 'react-google-login';
import { loginWithGoogle } from '../services/user.service';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        // borderRadius: 16,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    form: {
        marginTop: theme.spacing(6),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
}));
const responseGoogle = async (response: GoogleLoginResponse) => {
    if ((response as any).error) {

    } else {
        await loginWithGoogle(response.tokenId);
        // console.log(response);
    }
}
export const Login = () => {
    type LoginUser = Pick<User, "email" | "password">;
    const classes = useStyles();
    const { routeTo } = useRouting();
    const [user,] = useState<LoginUser>({ password: "", email: "" });
    const [error, setError] = useState(false);
    const [stringError, setStringError] = useState("");

    const keys = getKeys<LoginUser>({
        email: 1,
        password: 1,
    });

    const handleSubmit = async (o: LoginUser) => {
        try {
            await userLogin(o.email, o.password)
            routeTo(urls.shop);
        }
        catch (error) {
            setError(true);
            setStringError(error.message);
        }
    }

    const validate = (values: LoginUser) => {
        const errors = {} as LoginUser;
        if (!values.email) {
            errors.email = 'Required'
        }
        if (!values.password) {
            errors.password = 'Required'
        }
        return errors
    }
    return <AppForm>
        <React.Fragment>
            <Typography variant="h3" gutterBottom align="center">
                Sign In
      </Typography>
            <Typography variant="body2" align="center">
                {'Not a member yet? '}
                <Link align="center" underline="always" onClick={() => { routeTo(urls.register) }}>
                    Sign Up here
                 </Link>
            </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} initialValues={user} validate={validate}>
            {({ handleSubmit, submitting, form }) => (

                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Field name={keys.email}>
                        {({ input, meta }) => (
                            <div>
                                <TechInput {...input} label="Email" meta={meta} fullWidth required />
                            </div>
                        )}
                    </Field>
                    <Field name={keys.password}>
                        {({ input, meta }) => (
                            <>
                                <TechInput {...input} label="Password" meta={meta} type="password" autoComplete="none" fullWidth />
                            </>
                        )}
                    </Field>

                    {error && <FormFeedback className={classes.feedback} error>
                        {/* {submitError} */}
                        {stringError}
                    </FormFeedback>}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                // className={classes.checkSquare}
                                />
                            }
                            label="Remember me"
                            style={{ fontSize: "1rem", color: "black" }}
                        />
                    </div>
                    <TechButton
                        className={classes.button}
                        disabled={submitting}
                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >

                        {submitting ? "Loading ..." : "Sign In"}


                    </TechButton>
                    <Typography variant="body2" gutterBottom align="center">
                        or join with the following
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "20px", paddingBottom: "20px" }}>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                            onSuccess={responseGoogle as any}
                            onFailure={responseGoogle}

                            render={props => <IconButton style={{ backgroundColor: "#dd4b39" }} title="Google" onClick={props.onClick}> <SvgIcon fontSize="large" style={{ color: "white" }}>
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google icon</title><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" /></svg>
                            </SvgIcon></IconButton>}
                        />
                        {/* <SvgIcon fontSize="large" style={{ color: "white" }}>
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google icon</title><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" /></svg>
                            </SvgIcon> */}
                        <IconButton
                            style={{ backgroundColor: "#3b5998" }} title="Facebook">
                            <FacebookIcon fontSize="large" style={{ color: "white" }} />
                        </IconButton>
                    </div>
                </form>
            )}
        </Form>
        <Typography align="center">
            <Link underline="always" style={{ cursor: "pointer" }} onClick={() => {
                routeTo(urls.forgotPassword);
            }}>
                Forgot password?
            </Link>
        </Typography>
    </AppForm>
}
