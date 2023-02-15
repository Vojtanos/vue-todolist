<template>
    <section class="tasks_list">
            <div class="title" v-if="displayActive && tasks.length != 0 ">Aktivní úkoly</div>
            <div class="task_header" v-if="displayActive && tasks.length != 0">
                <div>Název</div>
                <div>Provádí</div>
                <div>Deadline</div>
                <div>Popis</div>
            </div>
            <task-select v-for="task in tasks" :key="task._id" :active='true' @show-head="showActive"
                :name='task.name'
                :person='task.person'
                :priority='task.priority'
                :initDate='task.initDate'
                :deadline='task.deadline'
                :desc='task.desc'
                :isDone='task.isDone'
                :id='task._id'
                :tasks='tasks'
                :selPerson="selPerson"
                :selPriority="selPriority"
                >
            </task-select>

            <div class="title" v-if="displayHist && tasks.length != 0">Historické úkoly</div>
            <div class="task_header" v-if="displayHist && tasks.length != 0">
                <div>Název</div>
                <div>Provádí</div>
                <div>Deadline</div>
                <div>Popis</div>
            </div>
            <task-select v-for="task in tasks" :key="task._id" :active='false' @show-head="showHist"
                :name='task.name'
                :person='task.person'
                :priority='task.priority'
                :initDate='task.initDate'
                :deadline='task.deadline'
                :desc='task.desc'
                :isDone='task.isDone'
                :id='task._id'
                :tasks='tasks'
                :selPerson="selPerson"
                :selPriority="selPriority"
                >
            </task-select>
    </section>
</template>

<script>
import TaskSelect from './TaskSelect.vue';
import axios from 'axios';

export default {
    components:{
        TaskSelect,
    },
    data() {
        return {
            isLoading: false,
            error: null,
            tasks: [],
            displayHist: false,
            displayActive: false,
        };
    },
    props: ['taskCreated','selPerson','selPriority'],
    watch:{
        taskCreated(){
            this.tasks.push(this.taskCreated);
        }
    },
    methods: {
        loadTasks() {
            axios.get(`http://localhost:4000/tasks`)
                .then(response => {
                    this.tasks = response.data
                })
                .catch(e => {
                    console.log(e)
                    this.error = 'data nelze načíst, zkuste to prosím později'
                })
        },
        showHist(e){
            if(e === true) 
                this.displayHist = e;
        },
        showActive(e){
            if(e === true)
                this.displayActive = e;
        },
    },
    mounted() {
        this.loadTasks()
    },
}
</script>

<style scoped>
.title {
    margin-top: 25px;
    margin-left: 7px;
    font-size:20px;
    align-self: start;
}
.task_header{
    margin-left: 18px;
    display: grid;
    margin-top: 10px;
    width:100%;
    padding-right: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
}
.tasks_list{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    width: 100%;
}

</style>