import React, { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaCog, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
    const [greeting, setGreeting] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [time, setTime] = useState(new Date());
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) setGreeting('Good Morning');
            else if (hour < 18) setGreeting('Good Afternoon');
            else setGreeting('Good Evening');
        };

        updateGreeting();
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="glass sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">✓ TaskFlow</h1>
                    <p className="text-white/70 text-sm">{greeting} 👋</p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
                    <span>{time.toLocaleTimeString()}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="relative text-white/70 hover:text-white transition text-xl transform hover:scale-110"
                        title={isDark ? 'Light Mode' : 'Dark Mode'}
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>

                            
                </div>
            </div>
        </header>
    );
};

export default Header;
