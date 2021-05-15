import { Card as MuiCard, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { Formik, Form } from "formik"
import { DropzoneArea, } from "material-ui-dropzone";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { SingleSelectAutocomplete } from "components/SingleSelectAutocomplete";
import { TechButton } from "components/TechButton";
import { useState } from "react";
import { useLoadData } from "hooks/useLoadData";
import { addSubcategory, getCategories } from "services/categories.service";
import { Category } from "models/Category";
import { LoadingComponent } from "components/LoadingComponent";
import { isAxiosError } from "utils/utilFunctions";
import { adminUrls, useRouting } from "utils/routing";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    categoryid: Yup.number().required("Required"),
    category: Yup.object().required("Required").typeError("Required")
});

const Card = styled(MuiCard)(spacing);

const initialValues = {
    name: "",
    category: null as Category | null,
    categoryid: 0,
    file: null as File | null
}
export const UserForm = () => {
    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [error, setError] = useState("");
    const {
        routeTo
    } = useRouting();
    const { loading } = useLoadData(async () => {
        const req = await getCategories();
        setSubcategories(req.data);
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }
    return <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            try {
                console.log(values);
                await addSubcategory(values);
                routeTo(adminUrls.subCategories);
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
                                <SingleSelectAutocomplete
                                    renderOption={opt => opt?.name ?? ""}
                                    value={values.category}
                                    InputProps={{
                                        label: "Category",
                                        variant: "outlined",
                                        error: Boolean(errors.category),
                                        helperText: errors.category,
                                    }}
                                    required
                                    options={subcategories}
                                    onChange={value => {
                                        setValues({
                                            ...values,
                                            category: value,
                                            categoryid: value ? value.id : 0,
                                        });
                                    }}
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