import React, { useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { ToastProvider } from './components/ToastContainer';
import TodoList from './components/TodoList';
import './index.css';

function AppContent() {
    const { isDark } = React.useContext(ThemeContext);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDark]);

    return (
        <div className="App min-h-screen">
            <TodoList />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <AppContent />
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
