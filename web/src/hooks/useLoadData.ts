import { useEffect, useState } from 'react';
export function useLoadData(fn: () => Promise<void>, deps: readonly any[] = []) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                await fn();
            } catch (e) {
                //maybe some error handling in here
                console.log(e);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line
    }, deps);

    return { loading };
}