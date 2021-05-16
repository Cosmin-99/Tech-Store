import { Card as MuiCard, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { Formik, Form } from "formik"
import { DropzoneArea, } from "material-ui-dropzone";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { TechButton } from "components/TechButton";
import { useState } from "react";
import { addCategory, getCategoryById, updateCategory } from "services/categories.service";
import { isAxiosError } from "utils/utilFunctions";
import { adminUrls, useRouting } from "utils/routing";
import { RouteComponentProps } from "react-router-dom";
import { useLoadData } from "hooks/useLoadData";
import { LoadingComponent } from "components/LoadingComponent";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
});

const Card = styled(MuiCard)(spacing);

export const CategoriesForm = (p: RouteComponentProps<{ id: string }>) => {
    const [error, setError] = useState("");
    const [initialValues, setInitialValues] = useState<{
        name: string;
        file: File | null;
    }>();
    useLoadData(async () => {
        if (p.match.params.id) {
            const req = await getCategoryById(p.match.params.id);
            setInitialValues(req.data as any);
        } else {
            setInitialValues({
                name: "",
                file: null as File | null
            })
        }
    })
    const {
        routeTo
    } = useRouting();
    if (!initialValues) {
        return <LoadingComponent />;
    }
    return <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            try {
                if (p.match.params.id) {
                    const { file, name, } = values;
                    let submitValues = file ? {
                        name,
                        file
                    } : { name };
                    await updateCategory(submitValues, p.match.params.id);
                } else {
                    await addCategory(values);
                }
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