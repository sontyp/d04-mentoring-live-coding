import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Counter() {
    const { start } = useParams();
    const [countdown, setCountdown] = useState<number>(parseInt(start+''));

    useEffect(() => {
        const interval = setInterval(() => setCountdown(prev => prev-1), 1000);

        if (countdown === 0) clearInterval(interval);

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div>
            <h2>It's the final countdown!</h2>
            <h3>Seconds left: {countdown}</h3>
        </div>
    );
}