<template>
    <div class="container">
        <task-create @push-task="pushTask"></task-create>
        <task-filter @filter-user="filterUser"></task-filter>
        <the-tasks 
            :taskCreated="taskCreated"
            :selPerson="selPerson"
            :selPriority="selPriority"
            >
        </the-tasks>
    </div>
</template>

<script>
import TaskCreate from '../components/tasks/TaskCreate.vue';
import TheTasks from '../components/tasks/TheTasks.vue';
import TaskFilter from '../components/tasks/TaskFilter.vue';

export default {
    components:{
        TaskCreate,
        TheTasks,
        TaskFilter,
    },
    data() {
        return {
            taskCreated:{},
            selPerson:'',
            selPriority:'',
        }
    },
    methods: {
        pushTask(e){
            this.taskCreated = e;
        },
        filterUser(e){
            console.log(e.person.length)
            this.selPerson = e.person
            this.selPriority = e.priority
        }
    },
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:90%;
    max-width:650px;
}

</style>