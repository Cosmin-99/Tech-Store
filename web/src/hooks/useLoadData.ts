import { useEffect, useState } from 'react';
export function useLoadData(fn: () => Promise<void>, deps: readonly any[] = []) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
        fn().catch(e => {
            console.log(e);
        });
        setLoading(true);
        // eslint-disable-next-line
    }, deps);

    return { loading };
}