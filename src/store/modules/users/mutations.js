export default {
    setUsers(state, payload) {
        state.users = payload;
    },
    addUser(state, payload) {
        state.users.push(payload);
    },
    removeUser(state, id) {
        const indexOfArrayItem = state.users.findIndex(i => i._id === id);
        state.users.splice(indexOfArrayItem, 1);
    },
};