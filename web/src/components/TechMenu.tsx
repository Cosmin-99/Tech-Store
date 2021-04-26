import React from 'react';
import { Menu, MenuProps, withStyles } from "@material-ui/core";

export const TechMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        width: "300px",
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        disableScrollLock={true}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));