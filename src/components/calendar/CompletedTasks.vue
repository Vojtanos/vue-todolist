<template>
    <section>
        <div class="title">Podledních 5 splněných</div>
        <div class="calendar">
            <item-normal class="box" v-for="item in last5" :key="item._id"
                :name='item.name'
                :person='item.person'
                :priority='item.priority'
                :initDate='item.initDate'
                :deadline='item.deadline'
                :desc='item.desc'
                :isDone='item.isDone'
                :id='item._id' 
                >
            </item-normal>
        </div>
    </section>
</template>

<script>
import ItemNormal from './ItemNormal.vue';
import axios from 'axios';

export default {
    data() {
        return {
            last5: []
        }
    },
    props:['name','person','deadline','desc','isDone','id'],
    components: {
        ItemNormal,
    },
    methods: {
        loadLast5() {
            this.error = null;
            axios.get(`http://localhost:4000/tasks/last5`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.last5 = response.data;
                })
                .catch(e => {
                    console.log(e)
                    this.error = 'data nelze načíst, zkuste to prosím později'
                })
        },
    },
    mounted() {
        this.loadLast5()
    },
}
</script>

<style scoped>
.title {
    margin-top: 50px;
    margin-left: 25px;
    font-size:20px;
    display: flex;
    align-items: end;
}
.box{
    margin: 10px;
    padding: 10px 10px 20px 10px;
    max-width:155px;
    min-width: 155px;
    background: #007e2c;
    border: none;
}
.calendar{
    display: flex;
    border-radius: 10px;
    margin: 20px 20px 20px 20px;
    flex-wrap: wrap;
}
</style>