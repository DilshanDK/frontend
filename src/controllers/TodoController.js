import TodoModel from '../models/TodoModel';

class TodoController {
    async fetchAllTodos() {
        return await TodoModel.getAllTodos();
    }

    async fetchTodoById(id) {
        return await TodoModel.getTodoById(id);
    }

    async addTodo(todoData) {
        // Validation
        if (!todoData.title || !todoData.start_time || !todoData.end_time) {
            throw new Error('Title, start time, and end time are required');
        }

        const formattedData = {
            ...todoData,
            status: todoData.status || 'pending'
        };

        return await TodoModel.createTodo(formattedData);
    }

    async modifyTodo(id, todoData) {
        return await TodoModel.updateTodo(id, todoData);
    }

    async toggleStatus(id, currentStatus) {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        return await TodoModel.changeStatus(id, newStatus);
    }

    async removeTodo(id) {
        return await TodoModel.deleteTodo(id);
    }
}

export default new TodoController();
