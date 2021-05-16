import { Grid, Container } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "utils/utilFunctions";
import { useTitle } from "../../hooks/useTitle";
import { adminUrls, route } from "../../utils/routing";
import { CategoriesForm } from "./categories-form";
import { CategoriesList } from "./categories-list";
import { Header } from "./Header";
import { MenuBar } from "./MenuBar"
import { ProductForm } from "./product-form";
import { ProductsList } from "./products-list";
import { SubcategoriesForm } from "./subcategories-form";
import { SubcategoriesList } from "./subcategories-list";
import { UserForm } from "./users-form";
import { UsersList } from "./users-list";


const Dashboard = () => {
    useTitle("Dashboard");
    useEffect(() => {
        const id = axios.interceptors.response.use(
            r => {
                return r;
            },
            e => {
                console.log("Some error has occured and axios intercepted it");
                if (isAxiosError<{ message: any }>(e)) {
                    console.log(e.response);
                    if (e.response?.data.message) {
                        const errorResponse = e.response?.data.message;

                        let message = "Default Error Message";
                        if ("detail" in errorResponse) {
                            message = errorResponse.detail;
                        }
                        else if (typeof errorResponse === "string") {
                            message = errorResponse;
                        } else {
                            message = JSON.stringify(errorResponse);
                        }
                        toast(message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
                if (typeof e.response.data === "string") {
                    toast(e.response.data, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }

                return Promise.reject(e);
            }
        )
        return () => axios.interceptors.response.eject(id);
    }, []);
    return <Grid container direction="column" alignItems="center">
        <Grid item container alignItems="stretch" direction="column">
            <Header />
            <MenuBar />
            <Container style={{ maxWidth: "92%", padding: "2rem 0 8rem" }}>
                <Switch>
                    <Route
                        exact
                        path={route(adminUrls.categories)}
                        component={CategoriesList}
                    />
                    <Route
                        exact
                        path={route(adminUrls.products)}
                        component={ProductsList}
                    />
                    <Route
                        exact
                        path={route(adminUrls.subCategories)}
                        component={SubcategoriesList}
                    />

                    <Route
                        exact
                        path={route(adminUrls.productAdd)}
                        component={ProductForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.productEdit, ["id"])}
                        component={ProductForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.users)}
                        component={UsersList}
                    />
                    <Route
                        exact
                        path={route(adminUrls.userAdd)}
                        component={UserForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.subCategoryAdd)}
                        component={SubcategoriesForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.subCategoryEdit, ["id"])}
                        component={SubcategoriesForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.categoriesAdd)}
                        component={CategoriesForm}
                    />
                </Switch>
            </Container>
        </Grid>
    </Grid>
}
export default Dashboard