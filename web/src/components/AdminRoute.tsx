import { FC, useContext, useMemo } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { UserContext } from "../contexts/userContext";
import { urls } from "../utils/routing";
export const AdminRoute: FC<RouteProps> = (props) => {
    const { children, ...routeProps } = props;
    const [user,] = useContext(UserContext);
    const isAdmin = useMemo(() => user?.role === "admin", [user]);
    return <Route
        {...routeProps}
        render={({ location }) => (
            isAdmin ? (
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
