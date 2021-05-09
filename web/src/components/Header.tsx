import React, { useContext, useMemo } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { AppBar, Dialog, DialogContent, Grid, IconButton, MenuItem, Slide, Toolbar, Typography } from '@material-ui/core';
import { Login } from '../pages/login';
import { MenuDrawer } from './MenuDrawer';
import { TechButton } from './TechButton';
import { MobileHeader } from './MobileHeader';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { SearchBarMenu } from './SearchBarMenu';
import { useLocation } from 'react-router-dom';
import { IsAuth, IsUnauth } from './IsAuth';
import { TechMenu } from './TechMenu';
import { UserContext } from '../contexts/userContext';
import { clearUserInStorage } from '../utils/utilFunctions';
import { adminUrls, urls, useRouting } from '../utils/routing';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#305F72",
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
    savedProducts: {
        cursor: "pointer",
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    userGrid: {
        width: "fit-content",
    },
}));
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
type AnchorElement = null | HTMLElement;
export const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useContext(UserContext);
    const canAccesDashboard = useMemo(() => user?.role === "admin", [user]);
    const [anchorEl, setAnchorEl] = React.useState<AnchorElement>(null);
    const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
    const { routeTo } = useRouting();
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleToggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleViewProfile = () => {
        routeTo(urls.userProfile);
        handleCloseMenu();
    }

    const handleLogout = async () => {
        clearUserInStorage();
        setUser(null!);
        handleCloseMenu();
    }
    const handleDashboardClick = () => {
        routeTo(adminUrls.categories);
    }
    const location = useLocation<Location>();
    React.useEffect(() => {
        // close modal on location change to avoid visuals
        handleClose();
        setOpenDrawer(false);
        window.scrollTo(0, 0);
    }, [location]);
    return <div className={classes.root}>
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogContent id="login-dialog">
                <Login />
            </DialogContent>
        </Dialog>


        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleToggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    Meniu
                </Typography>
                <div>
                    <IsAuth>
                        <Grid container alignItems="center" className={classes.userGrid}>
                            <Typography variant="caption" className={classes.savedProducts} onClick={() => {
                                // routeTo(urls.favorite);
                            }}>
                                {`Produse Favorite (${5})`}
                            </Typography>
                            {canAccesDashboard && <TechButton
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleDashboardClick}
                                color="inherit"
                                disableRipple
                                startIcon={<DashboardIcon />}
                            >
                                Dashboard
                            </TechButton>}
                            <TechButton
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                disableRipple
                                startIcon={<AccountCircle />}
                            >
                                Profile
                            </TechButton>
                            <TechMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={handleViewProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </TechMenu>
                        </Grid>
                    </IsAuth>
                    <IsUnauth>
                        <TechButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpen}
                            color="inherit"
                            disableRipple
                            startIcon={<AccountCircle />}
                        >
                            Login
                        </TechButton>
                    </IsUnauth>
                </div>
            </Toolbar>
        </AppBar>
        <SearchBarMenu />

        <MenuDrawer open={openDrawer} />


        {/* Small devices render  */}
        <MobileHeader />
    </div>
}