import { AppBar, Toolbar, Typography, InputBase, makeStyles, fade, Badge, CircularProgress } from "@material-ui/core";
import React, { useContext, useRef, useState } from "react"
import { TechButton } from "./TechButton";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { urls, useRouting } from "../utils/routing";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import { CartContext } from "contexts/cartContext";
import { searchProducts } from "services/categories.service";
import { useLoadData } from "hooks/useLoadData";
import { Product } from "models/Product";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#568EA6",
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: "block"
        },
    },
    smAppBar: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(3),
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        userSelect: "none",
        cursor: "pointer"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: "inherit",
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '55ch',
            '&:focus': {
                width: '60ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));


export const SearchBarMenu = () => {
    const classes = useStyles();
    const { routeTo } = useRouting();
    const cartHook = useContext(CartContext);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const timeout = useRef<any>(null!);

    const { loading } = useLoadData(async () => {
        const req = await searchProducts({
            searchString: search
        });
        setProducts(req.data);
    }, [search]);
    return <div>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.title} variant="h5" noWrap onClick={() => {
                    routeTo(urls.shop);
                }}>
                    TechStore
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <div className={classes.search}>
                    <Autocomplete
                        id="country-select-demo"
                        options={products}
                        autoHighlight
                        onChange={(e, value) => {
                            if (value) {
                                setSearch("");
                                routeTo(urls.product, { id: value.id })
                                //maybe some routing here
                            }
                        }}

                        onInputChange={(_, value, reason) => {
                            if (timeout.current) {
                                clearTimeout(timeout.current);
                            }
                            timeout.current = setTimeout(() => {
                                timeout.current = null!;
                                if (reason === "input")
                                    setSearch(value);
                            }, 500);
                        }}
                        noOptionsText="Nu s-a gasit nici un rezultat pentru textul cautat"
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(e, v) => e.id === v.id}
                        loading={loading}
                        renderOption={(option) => (
                            <React.Fragment>
                                {option.name}
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    endAdornment={(
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    )}
                                />
                            </>
                        )}
                    />
                </div>
                <div>
                    <TechButton title="Cos de cumparaturi" onClick={() => routeTo(urls.cart)}>
                        <Badge badgeContent={cartHook.cart.length} color="secondary">
                            <ShoppingCartIcon style={{ color: "white" }} />
                        </Badge>
                    </TechButton>
                </div>
            </Toolbar>
        </AppBar>
    </div>
}