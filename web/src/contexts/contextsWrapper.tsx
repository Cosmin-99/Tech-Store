import { FC } from "react";
import { UserContextProvider } from "./userContext"
import { CartProvider } from "./cartContext"
// put here every context instead of nesting them in App.tsx
const ContextsWrapper: FC = (p) => {
    return <UserContextProvider>
        <CartProvider>
            {p.children}
        </CartProvider>
    </UserContextProvider>
}
export default ContextsWrapper;