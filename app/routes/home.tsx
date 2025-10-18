import type { Route } from "./+types/home";
import HomeLayout from "../components/templates/HomeLayout";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 animated-bg dark:animated-bg-dark -z-10"></div>
            <div className="relative z-10 text-white">
                <HomeLayout />
            </div>
        </div>
    );
}
