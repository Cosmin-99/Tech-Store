import { FC, useContext } from "react";
import { UserContext } from "../contexts/userContext";

export const IsAuth: FC = (props) => {
    const [user] = useContext(UserContext);
    return <>
        {user ? props.children : null}
    </>
}
export const IsUnauth: FC = (props) => {
    const [user] = useContext(UserContext);
    return <>
        {user ? null : props.children}
    </>
}