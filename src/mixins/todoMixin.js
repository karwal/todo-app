const axios = require('axios');
const apiUrl = 'http://localhost:3000';
export const todoMixin = {
    methods: {
        getTodos() {
            return axios.get(`${apiUrl}/todos`);
        },
        addTodo(data) {
            return axios.post(`${apiUrl}/todos`, data);
        },
        editTodo(data) {
            return axios.put(`${apiUrl}/todos/${data.id}`, data);
        },
        deleteTodo(id) {
            return axios.delete(`${apiUrl}/todos/${id}`);
        }
    }
}
