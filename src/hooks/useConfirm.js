import { useState } from 'react';

export const useConfirm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        isDanger: false,
        onConfirm: () => {},
        onCancel: () => {}
    });

    const confirm = (options) => {
        setConfig({
            title: options.title || 'Confirm Action',
            message: options.message || 'Are you sure?',
            confirmText: options.confirmText || 'Confirm',
            cancelText: options.cancelText || 'Cancel',
            isDanger: options.isDanger || false,
            onConfirm: options.onConfirm || (() => {}),
            onCancel: options.onCancel || (() => {})
        });
        setIsOpen(true);
    };

    const handleConfirm = () => {
        config.onConfirm();
        setIsOpen(false);
    };

    const handleCancel = () => {
        config.onCancel();
        setIsOpen(false);
    };

    return {
        isOpen,
        confirm,
        handleConfirm,
        handleCancel,
        config
    };
};
