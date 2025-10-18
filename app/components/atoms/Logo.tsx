import React, { useEffect, useState } from "react";
import { Flex } from "antd";

interface LogoProps {
    title?: string;
    speed?: number;
    pause?: number;
}

const Logo: React.FC<LogoProps> = ({ title = "", speed = 150, pause = 1000 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayedText(title.slice(0, index + 1));
            setIndex(prev => prev + 1);
        }, speed);

        if (index > title.length) {
            clearInterval(timer);

            const timeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, pause);
            return () => clearTimeout(timeout);
        }

        return () => clearInterval(timer);
    }, [index, title, speed, pause]);

    return (
        <Flex align="center" style={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
      <span role="img" aria-label="logo" style={{ marginRight: 6 }}>
        ⭐
      </span>
            {displayedText}
        </Flex>
    );
};

export default Logo;
