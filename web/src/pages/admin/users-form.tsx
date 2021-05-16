import { Card as MuiCard, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { Formik, Form } from "formik"
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { SingleSelectAutocomplete } from "components/SingleSelectAutocomplete";
import { TechButton } from "components/TechButton";
import { useMemo, useState } from "react";
import { isAxiosError } from "utils/utilFunctions";
import { adminUrls, useRouting } from "utils/routing";
import { addUser } from "services/user.service";
import { User } from "models/User";
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const Card = styled(MuiCard)(spacing);

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    role: "user" as User["role"],
}
export const UserForm = () => {
    const [error, setError] = useState("");
    const {
        routeTo
    } = useRouting();
    const roles = useMemo(() => ["user", "admin", "provider"], []);
    return <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            try {
                console.log(values);
                await addUser(values);
                routeTo(adminUrls.users);
            } catch (e) {
                if (isAxiosError<any>(e)) {
                    const message = e.response!.data.message
                    setError(message);
                }
            }
        }}
    >
        {({
            values,
            setValues,
            errors,
            handleChange,
            handleBlur,
            touched,
            isSubmitting,
            isValid
        }) => {
            return <Form>
                <Card mb={6}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    *password will be generated on server
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h1">
                                    {error}
                                </Typography>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="First Name"
                                    id="firstName"
                                    required
                                    fullWidth
                                    value={values.firstName}
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Last Name"
                                    id="lastName"
                                    required
                                    fullWidth
                                    value={values.lastName}
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Email"
                                    id="email"
                                    required
                                    fullWidth
                                    value={values.email}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <SingleSelectAutocomplete
                                    renderOption={opt => opt}
                                    value={values.role}
                                    AutoCompleteProps={{
                                        disableClearable: true
                                    }}
                                    InputProps={{
                                        label: "Subcategory",
                                        variant: "outlined",
                                        error: Boolean(errors.role),
                                        helperText: errors.role,
                                    }}
                                    required
                                    options={roles}
                                    onChange={value => {
                                        console.log(value);
                                        if (value) {
                                            setValues({
                                                ...values,
                                                role: value as any,
                                            });
                                        }
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12}>
                                <TechButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Save changes
                                </TechButton>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Form>
        }}
    </Formik>
}