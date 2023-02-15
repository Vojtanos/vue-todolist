<template>
    <form @submit.prevent="postTask">
        <div class="title">
            Přidat Úkol
        </div>
        <div class="fields">
            <input class="input" type="text" placeholder="Název" v-model="name">
            <input class="input" type="date" placeholder="Deadline" v-model="deadline">
            
            <v-select v-model="priority" class="select_style" :options="['Nízká', 'Střední', 'Vysoká']"></v-select>
        </div>
        <textarea rows="8" v-model="desc"></textarea>
        <div v-if="invalidInput" class="error">Musí být vyplněna všechna pole!</div>
        <div class="fields2">  
            <v-select v-model="person" class="select_style" :options="users"></v-select>
            <button>
                Přidat
            </button>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import 'vue-select/dist/vue-select.css';

export default {
    data() {
        return {
            name: '',
            person: '',
            deadline: '',
            priority: 'Nízká',
            desc: '',
            invalidInput: false,
            error: null,
            users: [],
        };
    },
    methods: {
        postTask() {
            this.error = null;
            if (this.name === '' || this.person === '' || this.deadline === '' || this.priority === '') {
                this.invalidInput = true;
                return;
            }
            
            const task = {
                name: this.name,
                person: this.person,
                priority: this.priority,
                initDate: new Date().toISOString().slice(0, 10),
                deadline: this.deadline,
                desc: this.desc,
                isDone: false,
                isDoneDate: null,
            }

            this.invalidInput = false;
            this.name = ''
            this.person = ''
            this.deadline = ''
            this.priority = 'Nízká'
            this.desc = ''

            axios.post(`http://localhost:4000/tasks/new`, task)
            .then(response => {
                this.$emit('pushTask', response.data)
            })
            .catch(e => {
                console.log(e)
                this.error = 'data nelze odeslat, zkuste to prosím později'
            })
        },
        loadUsers() {
            this.error = null;
            axios.get(`http://localhost:4000/users`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    for (const person of response.data) {
                        this.users.push(person.name + " " + person.surName);
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.error = 'data nelze načíst, zkuste to prosím později'
                })
        },
    },
    mounted() {
            this.loadUsers()
    },
}
</script>

<style scoped>
.select_style {
    --vs-selected-color: #000000;
    --vs-border-radius: 10px;

    --vs-dropdown-min-width: 160px;
    
    --vs-border-color: rgb(228, 228, 228);
    --vs-selected-border-color: var(--vs-border-color);
    --vs-line-height: 1.27;
    --vs-dropdown-option--active-bg: #0091AD;

    min-width:180px;
    --vs-dropdown-min-width: 180px;
    margin-right:3px;
    margin-bottom: 8px;
    font-size:15px;
    background:white;
    border-radius:10px;
}
form{
    display: flex;
    flex-direction: column;
}
textarea{
    font-size:15px;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
    padding:10px;
    margin-bottom: 8px;
}
.input{
    font-size:15px;
    height:2rem;
    width:180px;
    border-radius: 10px;
    border: 1px solid rgb(228, 228, 228);
    background: white;
    padding-left: 9px;
    margin-right:3px;
    margin-bottom: 8px;
}
button{
    font-size:15px;
    height:2rem;
    width:80px;
    border-radius: 10px;
    color: rgb(235, 235, 235);
    border: 1px solid rgb(228, 228, 228);
    background: #0091AD;
    cursor: pointer;
    margin: 0px 0px 0px -3px;
    margin-bottom: 8px;
}
.fields {
    display: flex;
    align-items: center;
    margin-top: 10px; 
    width:100%;
    }
.fields2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title{
    margin-left: 25px;
    font-size:20px;
    display: flex;
    justify-content: center;
}
.input:focus,textarea:focus
{
    border: 2px solid #0091AD;
    outline-offset: 0px;
    outline: none;
}

@media only screen and (max-width: 620px) {
    form{
        align-items: center;
        width:100%;
    }
    .fields, .fields2, textarea {
        flex-direction: column;
        width:100%;
    } 
    button,.input {
        width:100%;
    }
    .select_style {
        width: 100%;
    }
}
</style>