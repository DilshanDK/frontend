import React, { useState, useEffect } from 'react';
import { FaPlus, FaSpinner, FaCheckCircle, FaClock, FaFire } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useToast } from './ToastContainer';
import { useConfirm } from '../hooks/useConfirm';
import Header from './Header';
import StatsCard from './StatsCard';
import ConfirmDialog from './ConfirmDialog';
import TodoController from '../controllers/TodoController';
import TodoForm from '../views/TodoForm';
import TodoItem from '../views/TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [filter, setFilter] = useState('all');
    const [recentTodos, setRecentTodos] = useState([]);
    const { isDark } = useTheme();
    const { success, error } = useToast();
    const { isOpen, confirm, handleConfirm, handleCancel, config } = useConfirm();

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        setRecentTodos(todos.slice(0, 3));
    }, [todos]);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await TodoController.fetchAllTodos();
            setTodos(response.data || []);
        } catch (err) {
            error(err.message || 'Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (todoData) => {
        try {
            await TodoController.addTodo(todoData);
            setShowForm(false);
            success('Task created successfully! 🎉');
            fetchTodos();
        } catch (err) {
            error(err.message || 'Failed to add todo');
        }
    };

    const handleUpdateTodo = async (todoData) => {
        const todoId = editingTodo._id || editingTodo.id || editingTodo['_id'];
        
        if (!editingTodo || !todoId) {
            error('Invalid todo ID. Please try again.');
            console.error('Edit todo missing ID:', { editingTodo, todoId });
            return;
        }
        
        try {
            await TodoController.modifyTodo(todoId, todoData);
            setShowForm(false);
            setEditingTodo(null);
            success('Task updated successfully! ✨');
            fetchTodos();
        } catch (err) {
            error(err.message || 'Failed to update todo');
        }
    };

    const handleDeleteTodo = (id) => {
        confirm({
            title: 'Delete Task?',
            message: 'This action cannot be undone. Are you sure you want to delete this task?',
            confirmText: 'Delete',
            cancelText: 'Keep It',
            isDanger: true,
            onConfirm: async () => {
                try {
                    await TodoController.removeTodo(id);
                    success('Task deleted successfully! 🗑️');
                    fetchTodos();
                } catch (err) {
                    error(err.message || 'Failed to delete todo');
                }
            }
        });
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await TodoController.toggleStatus(id, currentStatus);
            const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
            success(`Task marked as ${newStatus}! ✓`);
            fetchTodos();
        } catch (err) {
            error(err.message || 'Failed to update status');
        }
    };

    const handleEdit = (todo) => {
        console.log('Edit clicked with todo:', todo);
        const todoId = todo._id || todo.id || todo['_id'];
        
        if (!todoId) {
            error('Todo ID is missing. Cannot edit this task.');
            console.error('Todo object missing ID:', todo);
            return;
        }
        
        setEditingTodo(todo);
        setShowForm(true);
    };

    const handleCancel_Form = () => {
        setShowForm(false);
        setEditingTodo(null);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'pending') return todo.status === 'pending';
        return true;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.status === 'completed').length,
        pending: todos.filter(t => t.status === 'pending').length
    };

    return (
        <div className="min-h-screen">
            <Header />

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isOpen}
                title={config.title}
                message={config.message}
                confirmText={config.confirmText}
                cancelText={config.cancelText}
                isDanger={config.isDanger}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard 
                        icon={FaCheckCircle} 
                        label="Total Tasks" 
                        value={stats.total}
                        color="from-purple-500 to-pink-500"
                    />
                    <StatsCard 
                        icon={FaClock} 
                        label="Pending" 
                        value={stats.pending}
                        color="from-yellow-500 to-orange-500"
                    />
                    <StatsCard 
                        icon={FaFire} 
                        label="Completed" 
                        value={stats.completed}
                        color="from-green-500 to-emerald-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Form Section */}
                        {showForm && (
                            <div className="animate-fade-in mb-8">
                                <TodoForm
                                    todo={editingTodo}
                                    onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
                                    onCancel={handleCancel_Form}
                                />
                            </div>
                        )}

                        {/* Add Button & Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
                            {!showForm && (
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
                                >
                                    <FaPlus size={20} />
                                    Add New Task
                                </button>
                            )}
                            
                            <div className="flex gap-2 flex-wrap">
                                {['all', 'pending', 'completed'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                                            filter === f
                                                ? `glass border-white/50 text-white shadow-lg ${isDark ? 'bg-white/20' : 'bg-white/30'}`
                                                : `glass ${isDark ? 'text-gray-300' : 'text-white/70'} hover:text-white`
                                        }`}
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Todos Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <FaSpinner className="text-white text-4xl animate-spin" />
                            </div>
                        ) : (
                            <div>
                                {filteredTodos.length === 0 ? (
                                    <div className="text-center py-20 animate-fade-in">
                                        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-white/70'}`}>
                                            📝 {showForm ? 'Create your first task!' : 'No tasks found'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-fade-in">
                                        {filteredTodos.map((todo, index) => (
                                            <div key={todo._id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                                                <TodoItem
                                                    todo={todo}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDeleteTodo}
                                                    onToggleStatus={handleToggleStatus}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Recent Tasks */}
                    <div className="lg:col-span-1">
                        <div className={`glass rounded-xl p-6 border h-fit sticky top-24 animate-slide-up ${
                            isDark ? 'border-white/20' : 'border-white/30'
                        }`}>
                            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                                isDark ? 'text-gray-100' : 'text-white'
                            }`}>
                                <FaClock /> Recent Tasks
                            </h3>
                            <div className="space-y-3">
                                {recentTodos.length > 0 ? (
                                    recentTodos.map((todo, index) => (
                                        <div 
                                            key={todo._id}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                            className={`glass p-3 rounded-lg border hover:cursor-pointer group animate-slide-up transition ${
                                                isDark 
                                                    ? 'border-white/10 hover:border-white/30' 
                                                    : 'border-white/20 hover:border-white/40'
                                            }`}
                                            onClick={() => handleEdit(todo)}
                                        >
                                            <p className={`text-sm font-semibold group-hover:text-white transition line-clamp-2 ${
                                                isDark ? 'text-gray-200' : 'text-white/90'
                                            }`}>
                                                {todo.title}
                                            </p>
                                            <p className={`text-xs mt-1 ${
                                                isDark ? 'text-gray-400' : 'text-white/50'
                                            }`}>
                                                {todo.status === 'completed' ? '✓' : '○'} {todo.status}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className={`text-sm text-center py-4 ${
                                        isDark ? 'text-gray-500' : 'text-white/50'
                                    }`}>
                                        No recent tasks
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TodoList;
