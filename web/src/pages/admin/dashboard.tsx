import { Grid, Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { adminUrls, route } from "../../utils/routing";
import { Header } from "./Header";
import { MenuBar } from "./MenuBar"


const Dashboard = () => {
    useTitle("Dashboard");
    return <Grid container direction="column" alignItems="center">
        <Grid item container alignItems="stretch" direction="column">
            <Header />
            <MenuBar />
            <Container style={{ maxWidth: "92%", padding: "2rem 0 8rem" }}>

                <Switch>
                    <Route
                        path={route(adminUrls.categories)}
                    >
                        Categories Page
                    </Route>
                    <Route
                        path={route(adminUrls.products)}
                    >
                        Products
                    </Route>
                    <Route
                        path={route(adminUrls.users)}
                    >
                        Users
                    </Route>
                    <Route
                        path={route(adminUrls.subCategories)}
                    >
                        Sub Categories
                    </Route>
                </Switch>
            </Container>
        </Grid>
    </Grid>
}
export default Dashboard