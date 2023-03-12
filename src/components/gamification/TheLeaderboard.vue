<template>
    <h1>
        Žebříček uživatelů
    </h1>

    <table class="styled-table">
    <thead>
        <tr>
            <th>Jméno</th>
            <th>XP</th>
            <th>KP</th>
            <th>RP</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{user.name + " " + user.surName}}</td>
            <td>6000</td>
            <td>6000</td>
            <td>6000</td>
        </tr>
    </tbody>
</table>
</template>

<script>
    export default {
        data() {
            return {
                itemClass:'small',
            }
        },
        computed:{
            users() {
                return this.$store.getters['users/users'];
            },
        },
        methods: {
            loadUsers() {
                this.$store.dispatch('users/loadUsers')
            },
        },
        mounted() {
            this.loadUsers()
        },
    }
</script>

<style scoped>
.styled-table {
    border-collapse:separate;
    border-radius:20px;
    background: #dddddd;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    border-radius: 20px;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}
.styled-table tbody tr:nth-of-type(odd) {
    background-color: #ffffff;
}

th:first-of-type {
  border-top-left-radius: 20px;
}
th:last-of-type {
  border-top-right-radius: 20px;
}
tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 20px;
}
tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 20px;
}
</style>
