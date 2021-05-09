import { Card as MuiCard, CardContent, Grid, TextField, Typography, Paper } from "@material-ui/core";
import { Formik, Form } from "formik"
import { DropzoneArea, } from "material-ui-dropzone";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { SingleSelectAutocomplete } from "components/SingleSelectAutocomplete";
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0),
    discount: Yup.number().required("Required").min(0),
    subcategoryid: Yup.number().required("Required"),
});

const Card = styled(MuiCard)(spacing);

export const ProductForm = () => {
    return <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={values => {
            console.log(values);
        }}
    >
        {({ values }) => {
            return <Form>
                <Card mb={6}>
                    <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined"
                                    label="Name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Price"
                                    type="numeric"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Discount"
                                    type="numeric"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SingleSelectAutocomplete
                                    renderOption={opt => opt}
                                    InputProps={{
                                        label: "Subcategory",
                                        variant: "outlined"
                                    }}
                                    options={["asd", "asd"]}
                                    onChange={value => {
                                        console.log(value);
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
                                                console.log(e);
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Form>
        }}
    </Formik>
}