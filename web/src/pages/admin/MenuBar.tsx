import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core"

import { Category, Dashboard, AccountCircle, Store } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminUrls, route } from "../../utils/routing";

const useStyles = makeStyles(theme => ({
    label: {
        display: "none"
    },
    MainMenu: {
        backgroundColor: "#0287C0",
        "& div div": {
            margin: "0 auto"
        },
        "& div div div a": {
            transition: "background-color 0.5s ease-in-out"
        },
        "& div div div a[aria-selected='true']": {
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
        "& div div div a:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white"
        },
        "@media (max-width: 600px)": {
            position: "fixed",
            bottom: 0,
        }
    },
    tab: {
        "@media (max-width: 1220px)": {
            minWidth: "48px"
        }
    },
    textLabel: {
        "@media (max-width: 1220px)": {
            display: "none"
        }
    }
}));

export const MenuBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const [path, setPath] = useState("");
    useEffect(() => {
        const path = location.pathname.split("/")[2];
        setPath(path);
    }, [location]);
    const tabs = useCallback(() => [
        <Tab className={classes.tab}
            icon={<Category />}
            label={<p className={classes.textLabel}>Categories</p>}
            component={Link}
            to={route(adminUrls.categories)}
            // to={route(urls.categories)}
            value="categories"
            key="Categories -v"
        />,
        <Tab className={classes.tab}
            icon={<Dashboard />}
            label={<p className={classes.textLabel}>Subcategories</p>}
            component={Link}
            to={route(adminUrls.subCategories)}
            // to={route(urls.artistTiles)}
            value="sub-categories"
            key="SubCategories -v"

        />,
        <Tab className={classes.tab}
            icon={<AccountCircle />}
            label={<p className={classes.textLabel}>Users</p>}
            component={Link}
            to={route(adminUrls.users)}
            // to={route(urls.artistTiles)}
            value="users"
            key="Users -v"

        />,
        <Tab className={classes.tab}
            icon={<Store />}
            label={<p className={classes.textLabel}>Products</p>}
            component={Link}
            to={route(adminUrls.products)}
            // to={route(urls.artistTiles)}
            value="products"
            key="Products -v"

        />
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    return <AppBar position="static" className={classes.MainMenu}>
        <Tabs
            variant="fullWidth"
            value={path}
        >
            {tabs()}
        </Tabs>
    </AppBar>
}