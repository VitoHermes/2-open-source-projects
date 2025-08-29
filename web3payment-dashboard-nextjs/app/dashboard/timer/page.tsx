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
    const [timer, setTimer] = useState(0);
    const [timer1, setTimer1] = useState(1);

    // 合并两个计时器到一个 useEffect
    useEffect(() => {
        const interval1 = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        const interval2 = setInterval(() => {
            setTimer1(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    const handleIncrement = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

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
        handleIncrement();
        debouncedFetch();
    }, [debouncedFetch]);

    useEffect(() => {
        if (count >= 10) {
            setDisable(true);
        }
    }, [count]);

    const debounceClick = useDebounce(handleIncrement, 500, {
        leading: false,   // 不立即执行
        trailing: true    // 延迟后执行
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* 标题 */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Tailwind CSS 测试页面
                </h1>

                {/* 计时器卡片 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md">
                            计时器: {timer} 秒
                        </div>
                        <div className="text-2xl font-bold text-center py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md">
                            计时器2: {timer1} 秒
                        </div>
                    </div>
                </div>

                {/* 计数器卡片 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <p className="text-xl font-semibold text-gray-700 mb-4">
                        Count: <span className="text-blue-600 font-bold">{count}</span>
                    </p>
                    <Button
                        onClick={handleClick}
                        disabled={disable || loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Loading...
                            </div>
                        ) : (
                            'Click Me'
                        )}
                    </Button>
                </div>

                {/* 结果显示 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {result && (
                        <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-green-600 text-xl mr-2">✅</div>
                            <p className="text-green-800 font-medium">{result}</p>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="text-red-600 text-xl mr-2">❌</div>
                            <p className="text-red-800 font-medium">Error: {error}</p>
                        </div>
                    )}
                </div>

                {/* 功能说明 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">功能说明</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            防抖功能：快速点击只有最后一次生效
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            自动计时器：每秒递增显示
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                            响应式设计：适配各种屏幕尺寸
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


