'use client'

import { useState, useEffect } from 'react'

export default function CountUpAnimation({ end, duration = 1000 }: { end: number, duration?: number }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number | null = null;
        const start = count; // Start from current count to animate changes smoothly

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, duration]);

    return <>{count}</>;
}
