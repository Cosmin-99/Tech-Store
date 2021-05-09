import { createContext, Dispatch, FC, useEffect, useState } from "react";
import { User } from "../models/User";
import { userLocalStorageKey } from "../utils/constants";
import { headers } from "../services/config";
import { verifyToken } from "../services/user.service";


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
                        setUser(parsedUser);
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