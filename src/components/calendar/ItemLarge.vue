<template>
    <div class="calendar_item" :class="itemClass" @click="changeSize">
        <div class="calendar_element text_strong">{{name}}</div>
        <div class="calendar_element">{{person}}</div>
        <div class="calendar_element">{{deadline}}</div>
        <div class="calendar_element">{{desc}}</div>
        <button type="button" @click.stop="toogleIsDone">{{isDoneNew ? "Splněno" : "Nesplněno"}}</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            itemClass:'small',
            isDoneNew: this.isDone,
            isDoneDate: null
        }
    },
    props:['name','person','priority','initDate','deadline','desc','isDone','id','date'],
    methods: {
        toogleIsDone(){
            this.isDoneNew = !this.isDoneNew 
            if(this.isDoneNew)
                this.isDoneDate = new Date()
            this.setStyle()
            this.updateTask(this.id)
        },
        changeSize(){
            this.$emit('changeSize', 'normal')
        },
        setStyle(){
            if(this.priority === 'Nízká')
                this.itemClass = 'small'
            else if(this.priority === 'Střední')
                this.itemClass = 'medium'
            else if(this.priority === 'Vysoká')
                this.itemClass = 'big'
            
            if(this.isDoneNew === true){
                this.itemClass = 'done'
            }     
        },
        updateTask(id){
            console.log(id)
            let apiURL = `http://localhost:4000/tasks/${id}`;
            const task = {
                _id: this.id,
                name: this.name,
                person: this.person,
                priority: this.priority,
                initDate: this.initDate,
                deadline: this.deadline,
                desc: this.desc,
                isDone: this.isDoneNew,
                isDoneDate: this.isDoneDate,
            }
            
            axios.post(apiURL, task)
            .then((response) => {
                this.$emit('updateTask', this.isDoneNew)
            })
            .catch(error => {
                console.log(error)
            });
        },
    },
    mounted() {
        this.setStyle()
    },
}
</script>

<style scoped>
button{
    margin: 5px 10px 8px 0px;
    align-self: center;
    font-size:15px;
    height:1.5rem;
    width:90px;
    border-radius: 7px;
    color: rgb(235, 235, 235);
    border: 0.5px solid rgb(218, 218, 218);
    background: #0091AD;
    cursor: pointer;
    place-self: center;
}
.calendar_item{
    display: flex;
    flex-direction: column;
    width:90%;
    font-size:15px;
    border-radius: 12px;
    background: #2E6F95;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.394);
    margin-bottom: 8px;
    padding-left: 10px;
    padding-right: 5px;
    color:white;
    cursor: pointer;
}
.text_strong{
    font-weight: 700;
}
.calendar_element{
    margin-bottom: 5px;
    margin-top: 5px;
}
.done{
    background: #007e2c;
}
.small{
    background: #2E6F95;
}
.medium{
    background: #723C70;
}
.big{
    background: #B7094C;
}
</style>