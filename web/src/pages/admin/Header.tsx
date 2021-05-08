import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { urls, useRouting } from "../../utils/routing";

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#0C69B1",
        color: "white",
        alignItems: "center",
        height: "auto",
        padding: "10px",
        "@media (max-width: 600px)": {
            position: "fixed",
            top: 0,

            padding: "0.5rem 4%",
            zIndex: 100
        }
    },
    siteTitle: {
        verticalAlign: "middle",
        fontSize: "24pt"
    },
    userButtonHeader: {
        marginLeft: "1rem",
        paddingLeft: "0.75rem",
        color: "white",
        display: "inline",
        "@media (max-width: 960px)": {
            marginLeft: "0.25rem",
        }
    },
    siteLogo: {
        textIndent: "-100000px",
        width: "200px",
        height: "50px",
        padding: "0.75rem 0",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        "@media (min-width: 600px) and (max-width: 960px)": {
            width: "150px",
            height: "35px",
        },
        "@media (max-width: 600px)": {
            width: "80px",
            height: "42px",
        }
    },
}));

export const Header = () => {
    const classes = useStyles();

    const { routeTo } = useRouting();
    const goBackToMainSite = () => {
        routeTo(urls.shop);
    }
    return <Grid container className={classes.header}>
        <Grid item xs={8} sm={5} md={4} lg={3} className={classes.siteTitle}>
            <Grid container alignItems="center">
                <Grid item>
                    <Button style={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                    }}
                        onClick={goBackToMainSite}
                        startIcon={<ArrowBack />}
                    >
                        Go Back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
            <Typography variant="h4">
                Dashboard
            </Typography>
        </Grid>

    </Grid>
}