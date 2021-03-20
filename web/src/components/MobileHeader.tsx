import { AppBar, Toolbar, Typography, IconButton, makeStyles, Slide, Dialog, List, ListItem, ListItemText, InputBase, fade, Badge } from '@material-ui/core';
import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { TransitionProps } from '@material-ui/core/transitions';
import { TechButton } from './TechButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
// import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
// import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import { urls, useRouting } from '../utils/routing';
// import BuildIcon from '@material-ui/icons/Build';
// import PrintIcon from '@material-ui/icons/Print';
import { MobileSearchDrawer } from './MobileSearchDrawer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#305F72",
        fontFamily: "proxima-nova"
    },
    smAppBar: {
        backgroundColor: "#305F72",
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
    smAppBarShop: {
        backgroundColor: "#568EA6",
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
    },
    title: {
        cursor: "pointer",
        userSelect: "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    whiteText: {
        color: "white",
    },
    shopBar: {
        height: "60px",
        backgroundColor: "#568EA6",
        alignItems: "center",
        fontWeight: "bold",
        display: "flex",
        padding: "0 20px",
        color: "white"
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
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
        // width: '100%',
        transition: theme.transitions.create(['display', 'width']),
    },
    openInput: {
        // transition: theme.transitions.create(['display', 'width']),
        // display: "block",
        width: "100%",
    },
    closeInput: {
        width: "0px",
        // display: "none",
        transition: theme.transitions.create(['display', 'width']),
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

}));
const TransitionDetails = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const MobileHeader = () => {
    const classes = useStyles();
    const { routeTo } = useRouting();
    const [open, setOpen] = React.useState(false);
    const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [focus, setFocus] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const handleDetailsClose = () => {
        setDetailsOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (focus) {
            document.querySelector("body")!.style.overflow = "hidden";
        } else {
            document.querySelector("body")!.style.overflow = "scroll";
        }
    }, [focus]);
    const focusInput = () => {
        setFocus(!focus);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return <>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <div className={classes.dialogContainer}>
                <div style={{ flexGrow: 1 }}>
                    <Toolbar style={{ margin: "1em" }}>
                        <TechButton
                            autoFocus
                            color="inherit"
                            onClick={() => {
                                handleClose();
                                routeTo(urls.login);
                            }}
                            style={{ color: "white", backgroundColor: "#568EA6", borderRadius: "5px" }}
                            disableRipple
                            startIcon={<AccountCircle />}>
                            Login
                             </TechButton>
                        <div style={{ flexGrow: 1 }} />
                        <IconButton size="small" color="inherit" style={{ backgroundColor: "#568EA6", color: "white" }} onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </div>
                <div className={classes.shopBar} onClick={() => {
                    handleClose();
                    handleDetailsClose();
                    routeTo(urls.shop);
                }}>
                    SHOP
                 </div>
                {/* <List component="nav" className={classes.whiteText}>
                    <ListItem button>
                        <ListItemIcon className={classes.whiteText}>
                            <LaptopChromebookIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Cauta laptop"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.whiteText}>
                            <CardGiftcardIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Card cadou"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.whiteText}>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Asamblor PC"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.whiteText}>
                            <PrintIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Cauta consumabile"} />
                    </ListItem>
                </List> */}
            </div>
        </Dialog>
        <Dialog fullScreen open={detailsOpen} onClose={handleDetailsClose} TransitionComponent={TransitionDetails}>
            <div className={classes.dialogContainer}>
                <div style={{ flexGrow: 1 }}>
                    <Toolbar style={{ margin: "1em" }}>
                        <TechButton
                            autoFocus
                            color="inherit"
                            onClick={() => {
                                handleClose();
                                routeTo(urls.login);
                            }}
                            style={{ color: "white", backgroundColor: "#568EA6", borderRadius: "5px" }}
                            disableRipple
                            startIcon={<AccountCircle />}>
                            Login
                        </TechButton>
                        <div style={{ flexGrow: 1 }} />
                        <IconButton size="small" color="inherit" style={{ backgroundColor: "#568EA6", color: "white" }} onClick={handleDetailsClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </div>
                <div className={classes.shopBar} onClick={() => {
                    handleClose();
                    handleDetailsClose();
                    routeTo(urls.shop);
                }}>
                    SHOP
                 </div>
                <List
                    component="nav" className={classes.whiteText}>
                    <ListItem button onClick={() => {
                        setDetailsOpen(false);
                        setOpen(false);
                    }}>
                        <ListItemText primary={"Comenzi"} />
                    </ListItem>
                    <ListItem button onClick={() => {
                        setDetailsOpen(false);
                        setOpen(false);
                    }}>
                        <ListItemText primary={"Favorite"} />
                    </ListItem>
                    <ListItem button onClick={() => {
                        setDetailsOpen(false);
                        setOpen(false);
                    }}>
                        <ListItemText primary={"Date Personale"} />
                    </ListItem>
                </List>
            </div>
        </Dialog>

        <AppBar position="static" className={classes.smAppBar}>
            <Toolbar>
                <div className={clsx(classes.search, focus && classes.openInput, !focus && classes.closeInput)}>
                    {focus && <>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            autoFocus
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </>}
                </div>
                {focus && <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={focusInput}
                >
                    <CloseIcon />
                </IconButton>}
                {!focus && <>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={focusInput}
                    >
                        <SearchIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1 }} />
                    <Typography variant="h6" noWrap className={classes.title} onClick={() => {
                        routeTo(urls.shop);
                    }}>
                        Tech Store
                 </Typography>

                    <div style={{ flexGrow: 1 }} />
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClickOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </>}
            </Toolbar>
        </AppBar>
        <AppBar position="static" className={classes.smAppBarShop}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap onClick={() => {
                    routeTo(urls.shop);
                }}>
                    Shop
                </Typography>
                {focus && <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={focusInput}
                >
                </IconButton>}

                <div style={{ flexGrow: 1 }} />
                <div>
                    <TechButton title="Cos de cumparaturi" >
                        <Badge badgeContent={5} color="secondary">
                            <ShoppingCartIcon style={{ color: "white" }} />
                        </Badge>
                    </TechButton>
                </div>
            </Toolbar>
        </AppBar>
        <MobileSearchDrawer open={focus} searchText={search} onClickProduct={() => {
            setFocus(false);
            setSearch("");
        }} />
    </>
}