import axios from 'axios';

export default {
    loadUsers(context) {
        axios.get(`http://localhost:4000/users`)
            .then(response => {
                // JSON responses are automatically parsed.
                return response.data
            })
            .then(users => {
                context.commit('setUsers', users);
            })
            .catch(e => {
                console.log(e)
            }) 
    },
    postUser(context, user) {
        axios.post(`http://localhost:4000/users/new`, user)
        .then(response => {
            return response.data
        })
        .then(async user => {
            let username = user.name + " " + user.surName
            await axios.post('http://localhost:5001/user', { id: username, username: username } )
            await axios.put('http://localhost:5001/user/'+username+'/action/create-user')
            context.commit('addUser', user);
        })
        .catch(e => {
            console.log(e)
        })
    },
    deleteUser(context, id){        
        axios.delete(`http://localhost:4000/users/${id}`)
        .then(() => {
            context.commit('removeUser', id);
        }).catch(error => {
            console.log(error)
        })
    },
    updateUser(_, data){
        axios.post(`http://localhost:4000/users/${data._id}`, data)
        .then((res) => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        });
    }
};
