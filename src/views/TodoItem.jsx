import React, { useState } from 'react';
import { FaCheckCircle, FaCircle, FaEdit, FaTrash, FaClock, FaFileAlt } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { formatDisplayDate } from '../utils/dateFormatter';

const TodoItem = ({ todo, onEdit, onDelete, onToggleStatus }) => {
    // Handle both _id and id properties
    const todoId = todo._id || todo.id || todo['_id'];
    const isCompleted = todo.status === 'completed';
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const { isDark } = useTheme();

    const handleEditClick = () => {
        console.log('Todo object:', todo);
        console.log('Todo ID:', todoId);
        if (!todoId) {
            console.error('No todo ID found');
            return;
        }
        onEdit(todo);
    };

    return (
        <div className={`glass rounded-xl p-6 border transition transform hover:scale-105 hover:shadow-2xl group animate-slide-up ${
            isCompleted
                ? isDark ? 'border-green-400/30 bg-green-500/5' : 'border-green-400/50 bg-green-500/10'
                : isDark ? 'border-white/20 hover:border-white/40' : 'border-white/30 hover:border-white/50'
        }`}>
            <div className="flex items-start gap-4">
                {/* Status Toggle */}
                <button
                    onClick={() => onToggleStatus(todoId, todo.status)}
                    className="text-3xl hover:scale-110 transition mt-1 flex-shrink-0"
                >
                    {isCompleted ? (
                        <FaCheckCircle className="text-green-400 animate-pulse-glow" />
                    ) : (
                        <FaCircle className={isDark ? 'text-gray-500 hover:text-purple-400' : 'text-gray-300 hover:text-purple-400'} />
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className={`text-lg font-bold flex-1 ${
                            isCompleted
                                ? isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                                : isDark ? 'text-gray-100' : 'text-white'
                        }`}>
                            {todo.title}
                        </h3>
                        <div className="relative">
                            <button
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                                    isCompleted
                                        ? 'bg-green-500/80 text-white hover:bg-green-600'
                                        : 'bg-yellow-500/80 text-white hover:bg-yellow-600'
                                }`}
                            >
                                {todo.status}
                            </button>
                            
                            {showStatusMenu && (
                                <div className={`absolute right-0 mt-2 w-32 glass rounded-lg shadow-xl z-10 ${
                                    isDark ? 'bg-gray-800/80' : 'bg-white/20'
                                }`}>
                                    <button
                                        onClick={() => {
                                            onToggleStatus(todoId, 'pending');
                                            setShowStatusMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 transition text-sm ${
                                            isDark 
                                                ? 'text-gray-100 hover:bg-white/20' 
                                                : 'text-white hover:bg-white/20'
                                        }`}
                                    >
                                        ○ Pending
                                    </button>
                                    <button
                                        onClick={() => {
                                            onToggleStatus(todoId, 'completed');
                                            setShowStatusMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 transition text-sm border-t ${
                                            isDark 
                                                ? 'text-gray-100 hover:bg-white/20 border-white/10' 
                                                : 'text-white hover:bg-white/20 border-white/20'
                                        }`}
                                    >
                                        ✓ Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {todo.description && (
                        <div className={`flex gap-2 mb-3 p-2 rounded-lg border ${
                            isDark 
                                ? 'bg-white/5 border-white/10' 
                                : 'bg-white/10 border-white/20'
                        }`}>
                            <FaFileAlt className={`mt-1 flex-shrink-0 text-sm ${isDark ? 'text-purple-300' : 'text-purple-200'}`} />
                            <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-100'}`}>
                                {todo.description}
                            </p>
                        </div>
                    )}

                    {/* Times */}
                    <div className={`space-y-1 mb-4 p-2 rounded-lg border ${
                        isDark 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-white/5 border-white/20'
                    }`}>
                        <div className={`flex gap-2 items-center text-xs ${isDark ? 'text-gray-300' : 'text-gray-200'}`}>
                            <FaClock className={isDark ? 'text-purple-300' : 'text-purple-300'} />
                            <span>Start: {formatDisplayDate(todo.start_time)}</span>
                        </div>
                        <div className={`flex gap-2 items-center text-xs ${isDark ? 'text-gray-300' : 'text-gray-200'}`}>
                            <FaClock className={isDark ? 'text-purple-300' : 'text-purple-300'} />
                            <span>End: {formatDisplayDate(todo.end_time)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleEditClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500/70 hover:bg-blue-600 text-white py-2 rounded-lg transition font-semibold group-hover:shadow-lg"
                >
                    <FaEdit size={16} />
                    <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                    onClick={() => onDelete(todoId)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/70 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold group-hover:shadow-lg"
                >
                    <FaTrash size={16} />
                    <span className="hidden sm:inline">Delete</span>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
