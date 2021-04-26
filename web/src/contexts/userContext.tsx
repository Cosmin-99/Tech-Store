import { createContext, Dispatch, FC, useEffect, useState } from "react";
import { User } from "../models/User";
import { userLocalStorageKey } from "../utils/constants";
import { headers } from "../services/config";


type UserValue = Omit<User, "password">;

export const UserContext = createContext<[UserValue, Dispatch<UserValue>]>([null!, () => null!]);


export const UserContextProvider: FC = props => {
    const [user, setUser] = useState<UserValue>(null!);
    const [userChecked, setUserChecked] = useState(false);
    useEffect(() => {
        try {
            const unparsedUser = localStorage.getItem(userLocalStorageKey);
            if (unparsedUser) {
                const parsedUser = JSON.parse(unparsedUser);
                console.log(parsedUser);
                headers.Authorization = `Bearer ${parsedUser.token}`;
                setUser(parsedUser);
            }
        } catch (e) {

        }
        setUserChecked(true);
    }, []);
    return <UserContext.Provider value={[user, setUser]}>
        {userChecked ? props.children : null}
    </UserContext.Provider>;
}