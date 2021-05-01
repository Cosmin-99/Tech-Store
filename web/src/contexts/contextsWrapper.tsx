import { FC } from "react";
import { UserContextProvider } from "./userContext"
// put here every context instead of nesting them in App.tsx
const ContextsWrapper: FC = (p) => {
    return <UserContextProvider>
        {p.children}
    </UserContextProvider>
}
export default ContextsWrapper;