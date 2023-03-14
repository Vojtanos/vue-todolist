<template>
    <h1>
        Uživatelé
        <!-- <pre>{{ users[0] }}</pre> -->
    </h1>
    <div class="main-card" v-for="user in users" :key="user._id">
        <div style="margin-bottom: 20px;">
            <div class="profile" v-if="user.level">
                <h1>{{ user.username }}</h1> 
                <h1>{{ user.level.level_number}} lvl</h1>
            </div>
            <div class="stats"  v-if="user.level && user.xp && user.kp && user.rp">
                <div class="point_type">
                    <circle-progress :percent="
                        ( (user.xp.points_earned / user.level.level_points_required[0].points_required)) * 100
                        " 
                        style="height: 100px; width: 100px;"
                    />
                    <h3 class="point_name">XP</h3> 
                    <h3 class="point_score">{{ user.xp.points_earned }}</h3>
                </div>
                <div class="point_type">
                    <circle-progress 
                        :percent="
                        ( (user.kp.points_earned / user.level.level_points_required[1].points_required)) * 100
                        " 
                        fill-color="green" 
                        style="height: 100px; width: 100px;"
                        />
                    <h3 class="point_name">KP</h3> 
                    <h3 class="point_score">{{ user.kp.points_earned  }}</h3>
                </div>
                <div class="point_type">
                    <circle-progress 
                        :percent="
                        ( (user.rp.points_earned / user.level.level_points_required[2].points_required)) * 100
                        "
                        fill-color="red" 
                        style="height: 100px; width: 100px;"
                        />
                    <h3 class="point_name">RP</h3> 
                    <h3 class="point_score">{{ user.rp.points_earned }}</h3>
                </div>
            </div>
        </div>
        <div class="challenges">
            <h1>Výzvy
            </h1> 
            <div class="challenges_grid">
                <div class="card" v-for="item in user.challenges" :key="item.challenge.id">
                    <img :src="!item.done ? 'public/images/challenge.png' : 'public/images/challenge-done.png' " :class="{'faded': !item.done}" style="width:100%">
                    <div class="container" :class="{'faded': !item.done}">
                        <h4><b>{{ item.challenge.title }}</b></h4>
                        <p>{{ item.challenge.description }}</p> 
                    </div>
                </div>
            </div>
            
        </div>
        <div class="badges">
           <h1>Odznaky</h1> 
           <div class="badges_grid">
                <div v-show="item.done" class="card" v-for="item in user.challenges" :key="item.challenge.id">
                    <img :src="!item.done ? 'public/images/badge.png' : 'public/images/badge-done.png'" :class="{'faded': !item.done}" alt="" style="width:100%">
                    <div class="container" :class="{'faded': !item.done}">
                        <h4><b>{{item.challenge.custom.badge.title}}</b></h4>
                        <p>{{item.challenge.custom.badge.description}}</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

    export default {
        components: {CircleProgress},
        data() {
            return {
                users: [],
            }
        },
        methods: {
            async loadUsers() {
                await axios.get(`http://localhost:5001/user`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.users = response.data
                })
                .catch(e => {
                    console.log(e)
                }) 
            },
            async loadLevels() {
                for(let [index, user] of this.users.entries()){
                    await axios.get(`http://localhost:5001/user/`+user.id+`/level/next`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        let res = response.data
                        this.users[index] = {...user, level: res}
                    })
                    .catch(e => {
                        console.log(e)
                    }) 
                }
            },
            async loadPoints() {
                for(let [index, user] of this.users.entries()){
                    await axios.get(`http://localhost:5001/user/`+user.id+`/point`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        let res = response.data
                        let xp_index = res.map(function(e) { return e.point.id; }).indexOf('xp')
                        let kp_index = res.map(function(e) { return e.point.id; }).indexOf('kp')
                        let rp_index = res.map(function(e) { return e.point.id; }).indexOf('rp')
                        let xp = res[xp_index]
                        let kp = res[kp_index]
                        let rp = res[rp_index]
                        this.users[index] = {...user, xp: xp, kp: kp, rp: rp}
                    })
                    .catch(e => {
                        console.log(e)
                    }) 
                }
            },
            async loadChallenges() {
                for(let [index, user] of this.users.entries()){
                    await axios.get(`http://localhost:5001/user/`+user.id+`/challenge`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        let res = response.data
                        this.users[index] = {...user, challenges: res }
                    })
                    .catch(e => {
                        console.log(e)
                    }) 
                }
            },
        },
        async mounted() {
            await this.loadUsers()
            await this.loadLevels()
            await this.loadPoints()
            await this.loadChallenges()
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
