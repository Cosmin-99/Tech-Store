import { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
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
                    <Redirect
                        to={urls.shop()}
                    />
                </>)
        }
    </Route>
}
