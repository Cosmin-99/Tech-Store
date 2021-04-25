import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { AppForm } from '../components/AppForm';
import { TechButton } from '../components/TechButton';
import { urls, useRouting } from '../utils/routing';
import { TechInput } from '../components/TechInput';
import { Formik, Form } from 'formik';
import { FormFeedback } from '../components/Feedback';
import { sendResetEmail } from '../services/user.service';
const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    form: {
        marginTop: theme.spacing(6),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },

}));
export const ForgotPassword = () => {
    const classes = useStyles();
    const { routeTo } = useRouting();
    const [errorMessage, setErrorMessage] = useState<string>(null!);
    const handleSubmit = async (obj: { email: string }) => {
        try {
            await sendResetEmail(obj);
            routeTo(urls.shop);
            // toast.dark('An email has been sent to reset your password', {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        } catch (e) {
            setErrorMessage(e.message);
        }
    }
    return <AppForm>
        <React.Fragment>
            <Typography variant="h3" gutterBottom align="left">
                Forgot Password
            </Typography>
            <Formik<{ email: string }> onSubmit={handleSubmit} initialValues={{ email: '' }}>
                {({ isSubmitting, handleChange }) => (<Form>
                    <TechInput
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        type="email"
                        fullWidth
                        required />
                    {errorMessage && <FormFeedback className={classes.feedback} error>
                        {errorMessage}
                    </FormFeedback>}

                    <TechButton
                        className={classes.button}
                        disabled={isSubmitting}

                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        {isSubmitting ? "Loading ..." : "Trimite mail de resetare"}
                    </TechButton>
                </Form>)}
            </Formik>
        </React.Fragment>
    </AppForm >
}