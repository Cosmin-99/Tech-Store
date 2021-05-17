import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { AppForm } from '../components/AppForm';
import { TechButton } from '../components/TechButton';
import { urls, useRouting } from '../utils/routing';
import { TechInput } from '../components/TechInput';
import { Formik, Form } from 'formik';
import { FormFeedback } from '../components/Feedback';
import { resetPassword } from '../services/user.service';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { isAxiosError } from 'utils/utilFunctions';
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
export const ChangePassword = (p: RouteComponentProps<{ key: string }>) => {
    const classes = useStyles();
    const { routeTo } = useRouting();
    const [errorMessage, setErrorMessage] = useState<string>(null!);
    const handleSubmit = async (obj: { password: string }) => {
        try {
            if (!p.match.params.key) {
                return routeTo(urls.shop);
            }
            console.log(obj);
            await resetPassword(p.match.params.key, {
                newpassword: obj.password
            })
            toast.success('Your password has been changed', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            routeTo(urls.shop);
        } catch (e) {
            if (isAxiosError<any>(e)) {
                setErrorMessage(e.response?.data.message);
            } else {
                if ("message" in e) {
                    setErrorMessage(e.message);
                } else {
                    setErrorMessage(e);
                }
            }
        }
    }
    return <AppForm>
        <React.Fragment>
            <Typography variant="h3" gutterBottom align="left">
                Reset Password
            </Typography>
            <Formik<{ password: string }> onSubmit={handleSubmit} initialValues={{ password: '' }}>
                {({ isSubmitting, handleChange }) => (<Form>
                    <TechInput
                        label="New Password"
                        name="password"
                        placeholder="Type new password in here..."
                        onChange={handleChange}
                        type="password"
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
                        {isSubmitting ? "Loading ..." : "Schimba Parola"}
                    </TechButton>
                </Form>)}
            </Formik>
        </React.Fragment>
    </AppForm >
}