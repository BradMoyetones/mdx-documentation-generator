import { useEffect, useState } from "react";

const TypewriterEffect = ({ text, speed = 100 }: {text: string, speed: number}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeoutId);
        }
    }, [index, text, speed]);

    return (
        <p className="text-xl font-mono text-muted-foreground">
            {displayedText}
            <span className="animate-blink">|</span> {/* Blinking cursor */}
        </p>
    );
};

export default TypewriterEffect