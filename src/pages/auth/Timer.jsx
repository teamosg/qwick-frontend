import React from 'react';
import { useEffect } from 'react';

const Timer = ({ timer, setTimer }) => {
    // Countdown effect
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);


    return (
        <>
            {timer > 0 && (
                <span className="ml-2 text-qwick-gray-500 text-sm">
                    ({timer}s)
                </span>
            )}
        </>
    );
};

export default Timer;