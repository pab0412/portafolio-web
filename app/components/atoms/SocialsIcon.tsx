import React from "react";

interface SocialIconProps {
    icon: React.ElementType;
    link: string;
    size?: number;
    color?: string;
    hoverColor?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
                                                   icon: Icon,
                                                   link,
                                                   size = 24,
                                                   color = "#555",
                                                   hoverColor = "#1890ff",
                                               }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: hovered ? hoverColor : color,
                fontSize: size,
                transition: "color 0.3s ease",
                margin: "0 8px",
            }}
        >
            <Icon size={size} />
        </a>
    );
};

export default SocialIcon;
