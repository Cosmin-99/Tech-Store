import { ButtonProps } from '@material-ui/core';
import { CartContext } from 'contexts/cartContext';
import { useContext } from 'react';
import { TechButton } from './TechButton';


export const AddToCartButton = (p: ButtonProps) => {
    const cartHook = useContext(CartContext);
    // const [disabled, setDisabled] = useState(false);
    // function sleep(ms: number) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    return <TechButton
        {...p}
        disabled={cartHook.updatingUser}
        onClick={async (e) => {
            if (p.onClick) {
                p.onClick(e)
            }
        }}
    >
        Adauga in cos
    </TechButton>
}