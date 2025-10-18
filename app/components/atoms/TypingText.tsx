import React, { useEffect, useState } from "react";

interface TypingTextProps {
    text: string;
    speed?: number;
    style?: React.CSSProperties;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, style }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1));
            index++;
            if (index === text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span
        style={style}
        dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default TypingText;
