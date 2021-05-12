import { createContext, Dispatch, FC, useEffect, useState } from "react";
import { User } from "../models/User";
import { userLocalStorageKey } from "../utils/constants";
import { headers } from "../services/config";
import { getCurrentSession, verifyToken } from "../services/user.service";
import { storeUserInStorage } from "utils/utilFunctions";


type UserValue = Omit<User, "password"> | null;

export const UserContext = createContext<[UserValue, Dispatch<UserValue>]>([null!, () => null!]);


export const UserContextProvider: FC = props => {
    const [user, setUser] = useState<UserValue>(null!);
    const [userChecked, setUserChecked] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const unparsedUser = localStorage.getItem(userLocalStorageKey);
                if (unparsedUser) {
                    const parsedUser = JSON.parse(unparsedUser);
                    console.log(parsedUser);
                    headers.Authorization = `Bearer ${parsedUser.token}`;
                    const token = await verifyToken();
                    if (token.data.passed) {
                        const req = await getCurrentSession();
                        headers.Authorization = `Bearer ${req.data.token}`;
                        storeUserInStorage(req.data);
                        setUser(req.data);
                        // setUser(parsedUser);
                    } else {
                        headers.Authorization = ``;
                        setUser(null!);
                    }
                }
            } catch (e) {
                headers.Authorization = ``;
                setUser(null!);
            }
            setUserChecked(true);
        })();
    }, []);
    return <UserContext.Provider value={[user, setUser]}>
        {userChecked ? props.children : null}
    </UserContext.Provider>;
}