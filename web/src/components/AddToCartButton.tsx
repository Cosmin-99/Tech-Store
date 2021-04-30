import { ButtonProps } from '@material-ui/core';
import React, { useState } from 'react';
import { TechButton } from './TechButton';


export const AddToCartButton = (p: ButtonProps) => {
    const [disabled, setDisabled] = useState(false);
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return <TechButton
        {...p}
        disabled={disabled}
        onClick={async (e) => {
            if (p.onClick) {
                p.onClick(e)
                setDisabled(true);
                await sleep(1000);
                setDisabled(false);
            }
        }}
    >
        Adauga in cos
    </TechButton>
}