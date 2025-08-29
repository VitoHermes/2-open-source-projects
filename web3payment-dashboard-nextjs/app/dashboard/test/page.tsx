'use client';

import { useDebounce } from '@/app/hooks/useDebounce';
import { Button } from '@/app/ui/button';
import { useCallback, useEffect, useState } from 'react';

function fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve("Fetched data") : reject("Something went wrong!");
        }, 1000);
    });
}

export default function Page() {
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);


    // handle increment
    const handleIncrement = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);
    const debounceClick = useDebounce(handleIncrement, 500, {
        leading: false,   // 不立即执行
        trailing: true    // 延迟后执行
    });
    useEffect(() => {
        if (count >= 10) {
            setDisable(true);
        }
    }, [count]);


    // fetch data
    const fetchDataWithLoading = useCallback(async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await fetchData();
            setResult(data);
        } catch (err) {
            setError(err as string);
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetch = useDebounce(fetchDataWithLoading, 500);

    const handleClick = useCallback(() => {
        debouncedFetch();
        debounceClick();
    }, [debouncedFetch]);

    return (
        <div>
            <p>Count: {count}</p>
            <Button
                onClick={handleClick}
                disabled={disable || loading}
            >
                {loading ? 'Loading...' : 'Click Me'}
            </Button>
            <div>
                {result && <p>✅ {result}</p>}
                {error && <p>❌ Error: {error}</p>}
            </div>
        </div>
    );
}


