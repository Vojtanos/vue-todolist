<template>
    <section class="users_list">
        <div class="user_header" v-if="users.length !== 0">
            <div>Jméno</div>
            <div>Příjmení</div>
            <div>Email</div>
            <div>Telefon</div>
        </div>
        
        <user-normal v-for="user in users" class="item" 
            :key="user._id"
            :name="user.name"
            :email="user.email"
            :surName="user.surName"
            :phoneNumber="user.phoneNumber"
            :id="user._id"
            :users="users"
            >
        </user-normal>

    </section>
</template>

<script>
import UserNormal from './UserNormal.vue';
export default {
    components: {
        UserNormal,
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
.edit_button{
    font-size:11px;
    height:1rem;
    border-radius: 8px;
    border: 0px;
    background: #ffffff00;
    padding:2px rgb(255, 255, 255);
    cursor: pointer;
}
.user_header{
    margin-left: 18px;
    display: grid;
    margin-top: 10px;
    width:100%;
    grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
}
.users_list{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

</style>