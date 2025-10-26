import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ id, type = 'info', message, onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, onClose, duration]);

    const getStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'from-green-500 to-emerald-600',
                    icon: FaCheckCircle,
                    borderColor: 'border-green-400'
                };
            case 'error':
                return {
                    bg: 'from-red-500 to-red-600',
                    icon: FaExclamationCircle,
                    borderColor: 'border-red-400'
                };
            case 'info':
                return {
                    bg: 'from-blue-500 to-blue-600',
                    icon: FaInfoCircle,
                    borderColor: 'border-blue-400'
                };
            default:
                return {
                    bg: 'from-gray-500 to-gray-600',
                    icon: FaInfoCircle,
                    borderColor: 'border-gray-400'
                };
        }
    };

    const { bg, icon: Icon, borderColor } = getStyles();

    return (
        <div className={`animate-slide-in bg-gradient-to-r ${bg} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 ${borderColor} flex items-center justify-between gap-4 backdrop-blur-md`}>
            <div className="flex items-center gap-3 flex-1">
                <Icon className="text-xl flex-shrink-0" />
                <p className="font-semibold">{message}</p>
            </div>
            <button 
                onClick={() => onClose(id)}
                className="text-white hover:text-gray-200 transition flex-shrink-0"
            >
                <FaTimes />
            </button>
        </div>
    );
};

export default Toast;
