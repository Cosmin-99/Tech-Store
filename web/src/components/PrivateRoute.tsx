import { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { UserContext } from "../contexts/userContext";
import { urls } from "../utils/routing";
export const PrivateRoute: FC<RouteProps> = (props) => {
    const { children, ...routeProps } = props;
    const [user,] = useContext(UserContext);
    return <Route
        {...routeProps}
        render={({ location }) => (
            user ? (
                children
            ) : (
                <>
                    <Redirect
                        to={{
                            pathname: urls.shop(),
                            state: location
                        }}

                    />
                </>
            )
        )}
    />

}
