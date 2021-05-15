import React, { useEffect, useState } from "react"

export const useTitle = (title: string): [string, React.Dispatch<string>] => {
    const [oldTitle, setOldTitle] = useState("");

    //is this a good aproach? idk , it gets the job done
    const [modTitle, setModTitle] = useState(title);
    useEffect(() => {
        if (!oldTitle) {
            setOldTitle(document.title);
        }
        document.title = modTitle;
        return () => {
            document.title = oldTitle;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, modTitle]);
    return [modTitle, setModTitle];
}