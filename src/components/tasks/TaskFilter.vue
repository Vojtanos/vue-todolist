<template>
    <section class="filter_bar">
            <div class="title">Filtry:</div> 
            <v-select class="select_style" v-model="person" :options="users"></v-select>
            <v-select class="select_style" v-model="priority" :options="['Nízká', 'Střední', 'Vysoká']"></v-select>  
            <button @click="filter">OK</button>
        </section>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            person: '',
            priority: ''
        };
    },
    methods: {
        filter(){
            this.person = this.person == null ? '' : this.person
            this.priority = this.priority == null ? '' : this.priority
            this.$emit('filterUser', {person: this.person, priority: this.priority})
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

    min-width:120px;
    --vs-dropdown-min-width: 120px;
    margin-right:3px;
    margin-bottom: 8px;
    font-size:15px;
    background:white;
    border-radius:10px;
    margin: 0px 5px 0px 0px;
    font-size:15px;
}
.title{
    font-size:20px;
    margin-right: 10px;
}
.filter_bar{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    width:100%;
    margin-bottom: -20px;
}
button{
    font-size:15px;
    height:2rem;
    width:50px;
    border-radius: 10px;
    color: rgb(235, 235, 235);
    border: 1px solid rgb(228, 228, 228);
    background: #0091AD;
    cursor: pointer;
}
</style>