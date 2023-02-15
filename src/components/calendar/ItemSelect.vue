<template>
    <div>
        <item-normal 
            v-if="size === 'normal' && show && (person == selectedUser || !selectedUser)" 
            @change-size="changeSize"
            :name='name'
            :person='person'
            :priority='priority'
            :initDate='initDate'
            :deadline='deadline'
            :desc='desc'
            :isDone='isDoneNew'
            >
        </item-normal>
        <item-large 
            v-if="size === 'big' && show"
            @change-size="changeSize"
            @update-task="updateTask"
            :name='name'
            :person='person'
            :priority='priority'
            :initDate='initDate'
            :deadline='deadline'
            :desc='desc'
            :isDone='isDoneNew'
            :id='id' 
            >
        </item-large>
    </div>  
</template>

<script>
import ItemNormal from './ItemNormal.vue'
import ItemLarge from './ItemLarge.vue'

export default {
    components:{
        ItemNormal,
        ItemLarge,
    },
    props:['name','person','priority','initDate','deadline','desc','isDone','active','id','date','tasks','selectedUser'],
    data() {
        return {
            size: "normal",
            show: false,
            isDoneNew: this.isDone
        }
    },
    methods: {
        changeSize(e){
            this.size = e
        },
        updateTask(e){
            this.isDoneNew = e;
        },
    },
    mounted() {
        if(this.deadline === this.date){
            this.show = true
        }
    },              
}
</script>

<style scoped>
</style>