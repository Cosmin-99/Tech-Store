import { Button, Card as MuiCard, CardContent, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik"
import { DropzoneArea, } from "material-ui-dropzone";
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import * as Yup from "yup";
import { SingleSelectAutocomplete } from "components/SingleSelectAutocomplete";
import { TechButton } from "components/TechButton";
import { useState } from "react";
import { useLoadData } from "hooks/useLoadData";
import { getAllSubcategories } from "services/categories.service";
import { Category } from "models/Category";
import { LoadingComponent } from "components/LoadingComponent";
import { addProduct } from "services/products.service";
import { isAxiosError } from "utils/utilFunctions";
import { adminUrls, useRouting } from "utils/routing";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0).typeError("Number is required in this field!"),
    discount: Yup.number().required("Required").min(0).typeError("Number is required in this field!"),
    subcategoryid: Yup.number().required("Required"),
    subcategory: Yup.object().required("Required").typeError("Required")
});

const Card = styled(MuiCard)(spacing);

const initialValues = {
    name: "",
    price: 0,
    file: null as File | null,
    discount: 0,
    subcategoryid: 0,
    subcategory: null as (Category | null),
    description: [] as Array<[string, string]>
}
export const ProductForm = () => {
    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [error, setError] = useState("");
    const { routeTo } = useRouting();
    const { loading } = useLoadData(async () => {
        const req = await getAllSubcategories();
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
                const stringifedDetails = JSON
                    .stringify(values
                        .description
                        .reduce((acc, current) => ({ ...acc, [current[0]]: current[1] }), {}));
                console.log(stringifedDetails);
                await addProduct({ ...values, description: stringifedDetails });
                routeTo(adminUrls.products);
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
                                <Typography variant="h4" style={{ color: "#ff0033" }}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Price"
                                    type="numeric"
                                    id="price"
                                    required
                                    fullWidth
                                    value={values.price}
                                    error={Boolean(touched.price && errors.price)}
                                    helperText={touched.price && errors.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    label="Discount"
                                    type="numeric"
                                    id="discount"
                                    required
                                    fullWidth
                                    value={values.discount}
                                    error={Boolean(touched.discount && errors.discount)}
                                    helperText={touched.discount && errors.discount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SingleSelectAutocomplete
                                    renderOption={opt => opt?.name ?? ""}
                                    value={values.subcategory}
                                    InputProps={{
                                        label: "Subcategory",
                                        variant: "outlined",
                                        error: Boolean(errors.subcategory),
                                        helperText: errors.subcategory,
                                    }}
                                    required
                                    options={subcategories}
                                    onChange={value => {
                                        setValues({
                                            ...values,
                                            subcategory: value,
                                            subcategoryid: value ? value.id : 0,
                                        });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FieldArray
                                    name="description"
                                    render={arrayHelpers => (
                                        <Grid container spacing={3}>
                                            {values.description.length === 0 && <Grid item xs={12}>
                                                <Button color="primary" variant="contained" onClick={() => arrayHelpers.push(["", ""])}>
                                                    Add Details
                                                </Button>
                                            </Grid>}
                                            {values.description.length > 0 && values.description.map((detail, index) => (
                                                <Grid container item xs={12} spacing={3} key={index}>
                                                    <Grid item xs={5}>
                                                        <TextField label="Key" value={values.description[index][0]} onChange={handleChange} id={`description.${index}.0`} variant="outlined" fullWidth />
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <TextField label="Value" value={values.description[index][1]} onChange={handleChange} id={`description.${index}.1`} variant="outlined" fullWidth />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton onClick={() => arrayHelpers.push(["", ""])}>
                                                            <AddIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => arrayHelpers.remove(index)}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
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
                                            showFileNames={true}
                                            filesLimit={1}
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