import { useState, useEffect } from "react";
import AppIcon from "utils/app-icon";
const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState("light");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setCurrentTheme(theme);
            if (theme === "dark") {
                document.documentElement.classList.toggle("dark");
            }
        } else {
            localStorage.setItem('theme', 'light');
        }
        setLoading(false);
    }, [])
    const handleThemeChange = () => {
        const value = currentTheme === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark");
        localStorage.setItem('theme', value);
        setCurrentTheme(value);
    }
    return (
        !loading
            ?
            <div className="theme-switcher">
                <div onClick={handleThemeChange} className="mode-button">
                    <AppIcon iconName={`${currentTheme === "light" ? "icon-light-mode" : "icon-dark-mode"}`} />
                </div>
            </div>
            :
            null
    )
}
export default ThemeSwitcher
