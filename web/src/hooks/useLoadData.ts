import { useEffect, useState } from 'react';
export function useLoadData(fn: () => Promise<void>, deps: readonly any[] = []) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                await fn();
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        })();
        fn().catch(e => {
            console.log(e);
        });
        // eslint-disable-next-line
    }, deps);

    return { loading };
}