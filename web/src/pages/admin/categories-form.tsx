import { Card as MuiCard, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { Formik, Form } from "formik"
import { DropzoneArea, } from "material-ui-dropzone";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { TechButton } from "components/TechButton";
import { useState } from "react";
import { addCategory } from "services/categories.service";
import { isAxiosError } from "utils/utilFunctions";
import { adminUrls, useRouting } from "utils/routing";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
});

const Card = styled(MuiCard)(spacing);

const initialValues = {
    name: "",
    file: null as File | null
}
export const CategoriesForm = () => {
    const [error, setError] = useState("");
    const {
        routeTo
    } = useRouting();

    return <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            try {
                console.log(values);
                await addCategory(values);
                routeTo(adminUrls.categories);
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
                                <Typography variant="h1">
                                    {error}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    label="Name"
                                    id="name"
                                    required
                                    fullWidth
                                    value={values.name}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Upload Picture
                                </Typography>
                                        <DropzoneArea

                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            showFileNamesInPreview={true}
                                            showFileNames={true}
                                            filesLimit={1}
                                            showPreviewsInDropzone={true}
                                            onChange={e => {
                                                setValues({
                                                    ...values,
                                                    file: e[0],
                                                })
                                            }}
                                        />
                                    </CardContent>

                                </Card>
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