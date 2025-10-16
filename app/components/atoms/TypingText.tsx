import React, { useEffect, useState } from "react";

interface TypingTextProps {
    text: string;
    speed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50 }) => {
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

    return <span dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default TypingText;
