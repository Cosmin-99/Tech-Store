import { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/userContext";
import { urls } from "../utils/routing";
export const PrivateRoute: FC<RouteProps> = (props) => {
    const { children, ...routeProps } = props;
    const [user,] = useContext(UserContext);
    return <Route
        {...routeProps}
    >
        {user ?
            (children) : (
                <>
                    {toast("You need to be logged in to acces this page")}
                    <Redirect
                        to={urls.shop()}
                    />
                </>)
        }
    </Route>
}
