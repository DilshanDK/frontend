import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const DatePicker = ({ value, onChange, label, min, isDanger = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        return value ? new Date(value) : new Date();
    });
    const { isDark } = useTheme();

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onChange(formattedDate);
        setIsOpen(false);
    };

    const isDateDisabled = (day) => {
        const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const minDate = min ? new Date(min) : null;
        if (minDate) {
            return checkDate < minDate;
        }
        return false;
    };

    const isDateSelected = (day) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear()
        );
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === currentMonth.getMonth() &&
            today.getFullYear() === currentMonth.getFullYear()
        );
    };

    const days = [];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const displayDate = value ? new Date(value).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : 'Select date';

    return (
        <div className="relative">
            <label className={`block font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-white'}`}>
                <FaCalendarAlt size={16} />
                {label} <span className="text-red-400">*</span>
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-left flex items-center justify-between border-2 ${
                    isDark 
                        ? 'bg-gray-800/70 border-purple-500/50 hover:bg-gray-800/90' 
                        : 'bg-white/20 border-purple-400/60 hover:bg-white/30'
                } ${isDanger ? 'ring-2 ring-red-400/50' : ''}`}
            >
                <span className={isOpen ? 'text-white font-semibold' : 'text-gray-100'}>
                    📅 {displayDate}
                </span>
                <FaCalendarAlt className={`transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Calendar Portal - Renders at document root */}
            {isOpen && ReactDOM.createPortal(
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Calendar */}
                    <div className={`fixed z-50 rounded-xl shadow-2xl border-2 animate-slide-up ${
                        isDark 
                            ? 'bg-gray-900/95 border-purple-500/60' 
                            : 'bg-white/95 border-purple-400/60'
                    } backdrop-blur-md`}
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <div className="p-5 min-w-80">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    className={`p-2 hover:bg-purple-500/30 rounded-lg transition font-semibold ${
                                        isDark ? 'text-gray-100' : 'text-gray-800'
                                    }`}
                                >
                                    <FaChevronLeft size={18} />
                                </button>
                                <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    className={`p-2 hover:bg-purple-500/30 rounded-lg transition font-semibold ${
                                        isDark ? 'text-gray-100' : 'text-gray-800'
                                    }`}
                                >
                                    <FaChevronRight size={18} />
                                </button>
                            </div>

                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-2 mb-3">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className={`text-center text-xs font-bold ${
                                        isDark ? 'text-purple-300' : 'text-purple-700'
                                    }`}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {days.map((day, index) => (
                                    <div key={index}>
                                        {day ? (
                                            <button
                                                type="button"
                                                onClick={() => handleDateClick(day)}
                                                disabled={isDateDisabled(day)}
                                                className={`w-full aspect-square rounded-lg transition font-semibold text-sm border ${
                                                    isDateSelected(day)
                                                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg border-purple-400'
                                                        : isToday(day)
                                                        ? `bg-blue-500/60 text-white border-2 border-blue-400 font-bold ${isDark ? 'hover:bg-blue-600/70' : 'hover:bg-blue-600/70'}`
                                                        : isDateDisabled(day)
                                                        ? `${isDark ? 'text-gray-600 bg-gray-800/30' : 'text-gray-400 bg-gray-200/30'} cursor-not-allowed opacity-40 border-gray-400/20`
                                                        : `${isDark ? 'text-gray-200 bg-gray-800/40 hover:bg-gray-700/60 border-gray-700' : 'text-gray-900 bg-white/30 hover:bg-white/50 border-gray-300/50'}`
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className={`w-full py-2 rounded-lg transition font-semibold text-sm border-2 ${
                                    isDark
                                        ? 'bg-purple-600/60 text-white hover:bg-purple-700/70 border-purple-500'
                                        : 'bg-purple-500/60 text-white hover:bg-purple-600/70 border-purple-400'
                                }`}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Display selected date info */}
            {value && (
                <p className={`text-xs mt-2 font-semibold ${isDark ? 'text-purple-300' : 'text-purple-400'}`}>
                    ✓ Selected: {new Date(value).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            )}
        </div>
    );
};

export default DatePicker;
