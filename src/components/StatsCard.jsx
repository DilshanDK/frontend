import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const StatsCard = ({ icon: Icon, label, value, color = 'from-blue-500 to-cyan-500' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const { isDark } = useTheme();

    useEffect(() => {
        let current = 0;
        const increment = value / 20;
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, 50);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className={`glass rounded-xl p-6 border transition transform hover:scale-105 group animate-slide-up ${
            isDark 
                ? 'border-white/20 hover:border-white/40' 
                : 'border-white/30 hover:border-white/50'
        }`}>
            <div className={`bg-gradient-to-br ${color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <Icon className="text-white text-2xl" />
            </div>
            <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-white/70'}`}>
                {label}
            </p>
            <p className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-white'}`}>
                {displayValue}
            </p>
        </div>
    );
};

export default StatsCard;
