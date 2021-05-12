import { Grid, Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { adminUrls, route } from "../../utils/routing";
import { CategoriesList } from "./categories-list";
import { Header } from "./Header";
import { MenuBar } from "./MenuBar"
import { ProductForm } from "./product-form";
import { ProductsList } from "./products-list";
import { SubcategoriesForm } from "./subcategories-form";
import { SubcategoriesList } from "./subcategories-list";


const Dashboard = () => {
    useTitle("Dashboard");
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
                        path={route(adminUrls.users)}
                    >
                        Users
                    </Route>
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
                        path={route(adminUrls.subCategoryAdd)}
                        component={SubcategoriesForm}
                    />
                    <Route
                        exact
                        path={route(adminUrls.subCategoryEdit, ["id"])}
                        component={SubcategoriesForm}
                    />
                </Switch>
            </Container>
        </Grid>
    </Grid>
}
export default Dashboard