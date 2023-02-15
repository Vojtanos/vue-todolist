<template>
    <task-normal 
        v-if="size === 'normal' && show && filter()" 
        @change-size="changeSize"
        :name='name'
        :person='person'
        :priority='priority'
        :initDate='initDate'
        :deadline='deadline'
        :desc='desc'
        :isDone='isDone'
        >
    </task-normal>
    <task-large 
        v-if="size === 'big' && show && filter()" 
        @change-size="changeSize"
        :name='name'
        :person='person'
        :priority='priority'
        :initDate='initDate'
        :deadline='deadline'
        :desc='desc'
        :isDone='isDone'
        :id='id'
        :tasks='tasks'
        >
    </task-large>
</template>

<script>
import TaskNormal from './TaskNormal.vue'
import TaskLarge from './TaskLarge.vue'

export default {
    components:{
        TaskNormal,
        TaskLarge,
    },
    props:['name','person','priority','initDate','deadline','desc','isDone','active','id','tasks','selPerson','selPriority'],
    data() {
        return {
            size: "normal",
            show: false
        }
    },
    emits: ["showHead"],
    methods: {
        changeSize(e){
            this.size = e
        },
        filter(){
            if((this.selPerson == '' || this.selPerson == this.person) && 
                (this.selPriority == '' || this.selPriority == this.priority))
                return true;
            else
                return false
        }

    },
    mounted() {
        const dateNow = new Date().toISOString().slice(0, 10)
        if(this.active){ 
            if(dateNow <= this.deadline && !this.isDone)
                this.show = true
        }
        else{
            if(dateNow > this.deadline || this.isDone)
                this.show = true
        }
        this.$emit('showHead', this.show)
    },              
}
</script>

<style scoped>

</style>