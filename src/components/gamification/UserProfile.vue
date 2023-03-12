<template>
    <h1>
        Uživatelé
    </h1>
    <div class="main-card" v-for="user in users" :key="user._id">
        <div style="margin-bottom: 20px;">
            <div class="profile">
                <h1>{{user.name + " " + user.surName}}</h1> 
                <h1>7 lvl</h1>
            </div>
            <div class="stats">
                <div class="point_type">
                    <circle-progress :percent="40" style="height: 100px; width: 100px;"/>
                    <h3 class="point_name">XR</h3> 
                    <h3 class="point_score">3435</h3>
                </div>
                <div class="point_type">
                    <circle-progress :percent="40" fill-color="green" style="height: 100px; width: 100px;"/>
                    <h3 class="point_name">RP</h3> 
                    <h3 class="point_score">3435</h3>
                </div>
                <div class="point_type">
                    <circle-progress :percent="40" fill-color="red" style="height: 100px; width: 100px;"/>
                    <h3 class="point_name">KP</h3> 
                    <h3 class="point_score">3435</h3>
                </div>
            </div>
        </div>
        <div class="challenges">
            <h1>Výzvy
            </h1> 
            <div class="challenges_grid">
                <div class="card">
                    <img src="public/images/challenge.png" class="faded" alt="" style="width:100%">
                    <div class="container faded">
                        <h4><b>Title</b></h4>
                        <p>desc</p> 
                    </div>
                </div>
                <div class="card">
                    <img src="public/images/challenge-done.png" alt="" style="width:100%">
                    <div class="container">
                        <h4><b>Title</b></h4>
                        <p>desc</p> 
                    </div>
                </div>
            </div>
            
        </div>
        <div class="badges">
           <h1>Odznaky</h1> 
           <div class="badges_grid">
                <div class="card">
                    <img src="public/images/badge.png" class="faded" alt="" style="width:100%">
                    <div class="container faded">
                        <h4><b>Title</b></h4>
                        <p>desc</p> 
                    </div>
                </div>
                <div class="card">
                    <img src="public/images/badge-done.png" alt="" style="width:100%">
                    <div class="container">
                        <h4><b>Title</b></h4>
                        <p>desc</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
    export default {
        components: {CircleProgress},
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
.challenges{
    margin: -10px;
    padding: 20px;
    border-top: 1px solid #0000003d;
    margin-bottom: 10px;
}
.badges{
    margin: -10px;
    padding: 20px;
    border-top: 1px solid #0000003d;
}
.point_score{
    display: flex;
    justify-content: center;
}
.point_type {
    position: relative;
}
.point_name {
    position: absolute;
    top: 20px;
    left: 37px;
}
.main-card {
    border-radius: 20px;
    padding: 10px;
    border: 1px solid #0000003d;
}
.profile {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30px;
}

.stats {
    display: flex;
    justify-content: space-around;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 10px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}

.container.faded {
  color: gray;
}

.badges_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 30px;
}

.challenges_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
    gap: 30px;
}

img {
    padding: 30px;
}
img.faded{
    filter: contrast(0%);
}
</style>
