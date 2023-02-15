<template>
    <div class="container">
        <calendar-filter @filter-user="filterUser"></calendar-filter>
        <calendar-window :selectedUser="selectedUser"></calendar-window>
        <completed-tasks></completed-tasks>
    </div>
</template>

<script>
import CalendarFilter from '../components/calendar/CalendarFilter.vue';
import CalendarWindow from '../components/calendar/CalendarWindow.vue';
import CompletedTasks from '../components/calendar/CompletedTasks.vue';

export default {
    components: {
        CalendarFilter,
        CalendarWindow,
        CompletedTasks
    },
    data() {
        return {
            selectedUser: ''
        }
    },
    methods: {
        filterUser(e){
            this.selectedUser = e;
        }
    },
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    width:100%;
}
@media only screen and (min-width: 1200px) {
    .container {
        max-width: 1500px;
    }
}
</style>