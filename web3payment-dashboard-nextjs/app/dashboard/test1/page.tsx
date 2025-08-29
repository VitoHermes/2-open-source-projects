'use client';

import { useState } from "react";

function fakeSubmit(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.3 ? resolve("✅ Success!") : reject("❌ Failed.");
        }, 500);
    });
}

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (loading) return;
        setLoading(true);
        setMessage("");

        fakeSubmit()
            .then((res) => {
                setMessage(res);
            })
            .catch((err) => {
                setMessage(err);
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
            <p>{message}</p>
        </div>
    );
}
