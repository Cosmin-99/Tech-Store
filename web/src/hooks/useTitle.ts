import { useEffect, useState } from "react"

export const useTitle = (title: string) => {
    const [oldTitle, setOldTitle] = useState("");
    useEffect(() => {
        if (!oldTitle) {
            setOldTitle(document.title);
        }
        document.title = title;
        return () => {
            document.title = oldTitle;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);
}