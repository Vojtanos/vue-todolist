<template>
    <div class="container">
        <user-create></user-create>
        <the-users></the-users>
    </div>
</template>

<script>

import UserCreate from '../components/users/UserCreate.vue';
import TheUsers from '../components/users/TheUsers.vue';

export default {
    components:{
        UserCreate,
        TheUsers,
    },
}
</script>

<style scoped>

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:90%;
    max-width:700px;
}
</style>