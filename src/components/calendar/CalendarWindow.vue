<template>
    <section class="calendar">
        <div class="calendar_box lines" v-for="i in 7" :key="i">
            <div class="date">{{day[i-1]}}</div>
            <item-select class="calendar_items" v-for="task in tasks" :key="task._id"
                :name='task.name'
                :person='task.person'
                :priority='task.priority'
                :initDate='task.initDate'
                :deadline='task.deadline'
                :desc='task.desc'
                :isDone='task.isDone'
                :id='task._id'
                :date='this.date[i-1]'
                :selectedUser='selectedUser'
                >
            </item-select>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import ItemNormal from './ItemNormal.vue';
import ItemLarge from './ItemLarge.vue';
import ItemSelect from './ItemSelect.vue';

export default {
    components: {
        ItemNormal,
        ItemLarge,
        ItemSelect,
    },
    props:['selectedUser'],
    data() {
        return {
            tasks: [],
            day: [],
            date: [],
        }
    },
    methods:{
        currentDate(){
            var date = new Date()
            this.date.push(date.toISOString().slice(0, 10))
            this.day.push(date.toLocaleString('cz', {  weekday: 'short' }).toUpperCase())
            for (let i = 0; i < 6; i++) {
                date.setDate(date.getDate() + 1);
                this.date.push(date.toISOString().slice(0, 10))
                this.day.push(date.toLocaleString('cz', {  weekday: 'short' }).toUpperCase());
            }
        },
        loadTasks() {
            this.error = null;

            axios.get(`http://localhost:4000/tasks`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.tasks = response.data
                })
                .catch(e => {
                    console.log(e)
                    this.error = 'data nelze načíst, zkuste to prosím později'
                })
        },
    },
    mounted(){
        this.currentDate()
        this.loadTasks()
    }
}
</script>

<style scoped>
.date{
    margin: 10px 0px 20px 0px;
}
.calendar_box{
    display: flex;
    align-items: center;
    flex-direction:column;
    width: 100%;
    height: 100%;
    min-width:150px;
    background: #d6eefb;
}
.calendar_items{
    display: flex;
    align-items: center;
    flex-direction:column;
    width: 100%;
    min-width:150px;
    background: none;
}
.lines{
    border-left: 3px solid rgb(255, 255, 255);
    margin-left:-1.5px
}
.calendar{
    display: flex;
    min-height:700px;
    border-radius: 10px;
    margin: 20px 20px 20px 20px;
    overflow-x: auto;
}
</style>