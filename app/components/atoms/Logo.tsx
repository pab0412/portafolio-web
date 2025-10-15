// src/components/atoms/Logo.tsx
import React from "react";
import { Flex } from "antd";

interface LogoProps {
    title?: string; // permite personalizar el texto del logo
}

const Logo: React.FC<LogoProps> = ({ title = "PABO.dev" }) => {
    return (
        <Flex
            align="center"
            style={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
        >
      <span
          role="img"
          aria-label="logo"
          style={{ marginRight: 6 }}
      >
        💼
      </span>
            {title}
        </Flex>
    );
};

export default Logo;
