import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../components/ToastContainer';
import DatePicker from '../components/DatePicker';

const TodoForm = ({ todo, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'pending'
    });
    const { isDark } = useTheme();
    const { error } = useToast();

    useEffect(() => {
        if (todo) {
            const startDate = todo.start_time ? todo.start_time.split(' ')[0] : '';
            const endDate = todo.end_time ? todo.end_time.split(' ')[0] : '';
            
            setFormData({
                title: todo.title || '',
                description: todo.description || '',
                start_date: startDate || '',
                end_date: endDate || '',
                status: todo.status || 'pending'
            });
        }
    }, [todo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.start_date || !formData.end_date) {
            error('Please select both start and end dates');
            return;
        }

        const startDateObj = new Date(formData.start_date);
        const endDateObj = new Date(formData.end_date);

        if (startDateObj > endDateObj) {
            error('Start date cannot be after end date');
            return;
        }

        const submitData = {
            ...formData,
            start_time: `${formData.start_date} 00:00:00`,
            end_time: `${formData.end_date} 23:59:59`
        };

        delete submitData.start_date;
        delete submitData.end_date;

        onSubmit(submitData);
    };

    const inputClass = `w-full px-4 py-3 rounded-lg glass text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition ${
        isDark ? 'bg-gray-700/20' : 'bg-white/10'
    }`;

    return (
        <div className={`glass rounded-xl p-8 shadow-2xl border animate-slide-up ${
            isDark ? 'border-white/20' : 'border-white/30'
        }`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-white'}`}>
                {todo ? '✏️ Edit Task' : '➕ Add New Task'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className={`block font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-white'}`}>
                        Task Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter task title"
                        className={inputClass}
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className={`block font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-white'}`}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter task description (optional)"
                        className={`${inputClass} resize-none`}
                    />
                </div>

                {/* Date Selection with Custom Picker */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker
                        value={formData.start_date}
                        onChange={(value) => handleDateChange('start_date', value)}
                        label="Start Date"
                        min={new Date().toISOString().split('T')[0]}
                    />

                    <DatePicker
                        value={formData.end_date}
                        onChange={(value) => handleDateChange('end_date', value)}
                        label="End Date"
                        min={formData.start_date || new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Date Range Summary */}
                {formData.start_date && formData.end_date && (
                    <div className={`p-4 rounded-lg border ${
                        isDark 
                            ? 'bg-purple-500/10 border-purple-400/30' 
                            : 'bg-purple-500/10 border-purple-400/50'
                    }`}>
                        <p className={`text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-purple-100'}`}>
                            ✓ Duration: {Math.ceil((new Date(formData.end_date) - new Date(formData.start_date)) / (1000 * 60 * 60 * 24))} days
                        </p>
                    </div>
                )}

                {/* Status */}
                <div>
                    <label htmlFor="status" className={`block font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-white'}`}>
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="pending">⏳ Pending</option>
                        <option value="completed">✓ Completed</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg transition font-semibold text-lg transform hover:scale-105 shadow-lg"
                    >
                        <FaSave size={20} />
                        {todo ? 'Update' : 'Add'} Task
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={`flex-1 flex items-center justify-center gap-2 glass text-white py-3 rounded-lg transition font-semibold text-lg border transform hover:scale-105 ${
                            isDark ? 'border-white/20 hover:border-white/40' : 'border-white/30 hover:border-white/50'
                        }`}
                    >
                        <FaTimes size={20} />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
               