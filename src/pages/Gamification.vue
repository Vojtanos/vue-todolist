<template>
    <div class="main">
        <section>
            <the-leaderboard></the-leaderboard>
        </section>
        <section>
            <user-profile></user-profile>
        </section>
    </div>
</template>

<script>

import TheLeaderboard from '../components/gamification/TheLeaderboard.vue';
import UserProfile from '../components/gamification/UserProfile.vue';
export default {
    components:{
        TheLeaderboard,
        UserProfile
    }
}

</script>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 700px;
    }
</style>