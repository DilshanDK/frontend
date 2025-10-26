import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmDialog = ({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, isDanger = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            ></div>

            {/* Dialog */}
            <div className="relative glass rounded-2xl p-8 max-w-md w-full border border-white/30 shadow-2xl animate-slide-up">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition"
                >
                    <FaTimes size={24} />
                </button>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                    isDanger 
                        ? 'bg-red-500/20 border border-red-400/50' 
                        : 'bg-blue-500/20 border border-blue-400/50'
                }`}>
                    <FaExclamationTriangle className={`text-2xl ${isDanger ? 'text-red-400' : 'text-blue-400'}`} />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-white text-center mb-2">{title}</h2>
                <p className="text-white/70 text-center mb-8">{message}</p>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 glass rounded-lg text-white font-semibold border border-white/30 hover:border-white/50 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition ${
                            isDanger
                                ? 'bg-red-500/80 hover:bg-red-600 border border-red-400/50'
                                : 'bg-blue-500/80 hover:bg-blue-600 border border-blue-400/50'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
