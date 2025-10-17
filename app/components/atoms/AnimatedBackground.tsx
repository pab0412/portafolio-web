import React from "react";

const AnimatedBackground: React.FC<{ gifUrl: string }> = ({ gifUrl }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                backgroundImage: `url(${gifUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

export default AnimatedBackground;
