<template>
    <section class="filter_bar">
            <div class="title">
                Filtr uživatelů
            </div>
            <div class="filters">
                <v-select class="select_style" v-model="person" :options="users"></v-select>
                <button @click="filterUser">OK</button>
            </div>
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
        };
    },
    methods: {
        filterUser(){
            console.log(this.person)
            this.$emit('filterUser', this.person)
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
    width:220px;
    --vs-dropdown-min-width: 180px;
    margin: 0px 5px 0px 0px;
    font-size:15px;
}
.title{
    height:100%;
    margin-left: 25px;
    font-size:20px;
    display: flex;
    align-items: end;
}
.filter_bar{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
}
.filters {
    display: flex;
    align-items: center;
    margin-top: 10px; 
    height:auto;
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