import api from '../services/api';

class TodoModel {
    async getAllTodos() {
        try {
            const response = await api.get('/todos');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async getTodoById(id) {
        try {
            const response = await api.get(`/todos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async createTodo(todoData) {
        try {
            const response = await api.post('/todos', todoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async updateTodo(id, todoData) {
        try {
            if (!id) throw new Error('Todo ID is required');
            const response = await api.put(`/todos/${id}`, todoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async changeStatus(id, status) {
        try {
            if (!id) throw new Error('Todo ID is required');
            const response = await api.patch(`/todos/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async deleteTodo(id) {
        try {
            if (!id) throw new Error('Todo ID is required');
            const response = await api.delete(`/todos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}

export default new TodoModel();
