import { makeStyles, List, ListItemText, ListItem } from '@material-ui/core';
import clsx from 'clsx';
import { useLoadData } from 'hooks/useLoadData';
import { Category } from 'models/Category';
import React, { useState } from 'react';
import { getCategories } from 'services/categories.service';
import { urls, useRouting } from 'utils/routing';
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        zIndex: 1,
        backgroundColor: "#568EA6",
        overflowX: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: "100%",
        height: "400px",
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "0px",
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing(0),
        },
    },
    openPaper: {
        borderTop: "1px solid rgba(0,0,0,.2)", boxShadow: "0 2px 3px 0 rgba(0,0,0,.3)"
    },
    whiteText: {
        color: "white",
        userSelect: "none",
    },
    title: {
        color: "white",
        userSelect: "none",
        fontFamily: "proxima-nova-bold",
        paddingLeft: "16px",
        paddingTop: "10px",
    },
}))

export const MenuDrawer = (p: {
    open: boolean
}) => {
    const { open } = p;
    const { routeTo } = useRouting();
    const classes = useStyles();
    const [data, setData] = useState<Category[]>([]);
    useLoadData(async () => {
        const req = await getCategories();
        const categories = req.data;
        setData(categories);
    }, []);
    return <div className={clsx(classes.drawerPaper, !open && classes.drawerPaperClose, open && classes.openPaper)}>
        <div className={classes.title}>
            Shop
        </div>

        <List component="nav" className={classes.whiteText} >
            {data.map((category, i) => <ListItem button onClick={() => {
                routeTo(urls.subcategory, { id: category.id.toString() })
            }} key={i}>
                <ListItemText primary={category.name} />
            </ListItem>)}
        </List>
    </div>
}