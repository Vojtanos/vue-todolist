<template>
    <form @submit.prevent="updateTask(id)" class="item" :class='itemClass'>
        <div>Název:</div>
        <div class="edit">
            <input type="text" 
                v-model="nameNew" 
                @click="activateInput" 
                :readonly="notEditable" 
                :class="{ 'input_focused' : !notEditable}"
            >
            <div>
                <button class="smaller" v-if="!notEditable">
                    uložit
                </button>
                <button type="button" class="smaller" @click="deleteTask(id)">
                    smazat
                </button>
                <button type="button" class="smaller" @click="changeSize">
                    zmenšit
                </button>
            </div>
        </div>
        <div>Provádí:</div>
        <v-select class="select_style"
            v-model="personNew"  
            :options="users" 
            @click="activateInput">
        </v-select>
        <div>Deadline:</div>
        <input type="date" class="calendar" 
            v-model="deadlineNew" 
            @click="activateInput" 
            :readonly="notEditable" 
            :class="{ 'input_focused' : !notEditable}"  
        required>
        <div>Vytvořeno:</div>
        <input type="date" 
            v-model="initDate" 
            readonly="true">
        <div>Priorita:</div>
        <v-select class="select_style" 
            v-model="priorityNew" 
            :options="['Nízká', 'Střední', 'Vysoká']" 
            @click="activateInput">
        </v-select>
        <div class="desc" 
            :contentEditable="!notEditable" 
            @input="setDesc" ref="desc" 
            @click="activateInput">
            {{descNew}}
        </div>
        <button class="state_button" 
            type="button" 
            @click="toogleIsDone">
            {{isDoneNew ? "Splněno" : "Nesplněno"}}
        </button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    props:['name','person','priority','initDate','deadline','desc','isDone','id','tasks'],
    data() {
        return {
            nameNew: this.name,
            personNew: this.person,
            priorityNew: this.priority,
            initDateNew: this.initDate,
            deadlineNew: this.deadline,
            descNew: this.desc,
            isDoneNew: this.isDone,
            isDoneDate: null,
            notEditable: true,
            users: [],
            itemClass:'small',
        }
    },
    methods: {
        toogleIsDone(){
            this.activateInput()
            this.isDoneNew = !this.isDoneNew 
            if(this.isDoneNew)
                this.isDoneDate = new Date()
            this.setStyle()
        },
        setDesc(){
            this.descNew = this.$refs.desc.innerText
        },
        changeSize(){
            this.$emit('changeSize', 'normal')
        },
        deleteTask(id){
            console.log(id)
            let apiURL = `http://localhost:4000/tasks/${id}`;
            let indexOfArrayItem = this.tasks.findIndex(i => i._id === id);

            if (window.confirm("Vážně chcete úkol vážně smazat?")) {
                axios.delete(apiURL).then(() => {
                    this.tasks.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        setStyle(){
            if(this.priority === 'Nízká')
                this.itemClass = 'small'
            else if(this.priority === 'Střední')
                this.itemClass = 'medium'
            else if(this.priority === 'Vysoká')
                this.itemClass = 'big'
            
            if(this.isDoneNew === true)
                this.itemClass = 'done'
        },
        activateInput(){
            this.notEditable = false
        },
        updateTask(id){
            if (this.name === '' || this.person === '' || this.deadline === '' || this.priority === '') {
                return;
            }
            let apiURL = `http://localhost:4000/tasks/${id}`;
            const task = {
                _id: this.id,
                name: this.nameNew,
                person: this.personNew,
                priority: this.priorityNew,
                initDate: this.initDateNew,
                deadline: this.deadlineNew,
                desc: this.descNew,
                isDone: this.isDoneNew,
                isDoneDate: this.isDoneDate,
            }

            axios.post(apiURL, task).then((res) => {
                console.log(res)
                this.notEditable = true
                let indexOfArrayItem = this.tasks.findIndex(i => i._id === id);
                this.tasks[indexOfArrayItem] = task
                
            }).catch(error => {
                console.log(error)
            });
            
            console.log(this.person)
            if(this.isDoneNew){
                axios.put('http://localhost:5001/user/'+this.person+'/action/done-task')
            }
        },
        loadUsers() {
            this.error = null;
            axios.get(`http://localhost:4000/users`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    for (const person of response.data) {
                        this.users.push(person.name + " " + person.surName);
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.error = 'data nelze načíst, zkuste to prosím později'
                })
        },
    },
    mounted() {
        this.loadUsers()
        this.setStyle()
    },
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    margin-right:40px;
    filter: invert(1);
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
.select_style {
    --vs-selected-color: white;
    --vs-controls-color: #664cc300;
    --vs-border-radius: 10px;
    
    --vs-border-color: rgba(228, 228, 228, 0);
    --vs-selected-border-color: var(--vs-border-color);
    --vs-line-height: 1.27;
    --vs-dropdown-option--active-bg: #aeaeae;
    --vs-dropdown-option--active-color: #000000;

    --vs-dropdown-option-color: #000000;

    width:220px;
    --vs-dropdown-min-width: 180px;
    margin: -6px 0px -3px -7px;
    font-size:15px;
    
}
input{
    font-family:'Open Sans', sans-serif;
    outline: none;
    border: none;
    max-width: 150px;
    min-width: 100px;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none; 
    font-size:15px; 
    margin: 0;
    color:white;
}
.input_focused:focus{
    border: solid 1px;
    border-radius: 6px;
}
.state_button{
    font-size:15px;
    height:1.5rem;
    width:90px;
    border-radius: 7px;
    color: rgb(235, 235, 235);
    border: 0.5px solid rgb(218, 218, 218);
    background: #0091AD;
    cursor: pointer;
    place-self: center;
    grid-column: 1 / 3;
    margin: 10px 0px 6px 0px;
}
.smaller{
    font-size:13px;
    border: 0px;
    color:white;
    background: #ffffff00;
    padding:2px rgb(255, 255, 255);
    cursor: pointer;
}
.edit{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.desc{
    grid-column: 1/3;
    margin-top: 20px;
    border-radius:7px;
    padding:3px;
}
.delete_buttons{
    font-size:15px;
    height:1.5rem;
    width:80px;
    border-radius: 10px;
    color: rgb(235, 235, 235);
    border: 1px solid rgb(228, 228, 228);
    background: #e62f2f;
    cursor: pointer;
    margin: 8px 0px 0px 0px;
}
.item{
    display: grid;
    grid-template-columns: 100px 1fr;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.394);
    width:100%;
    font-size:15px;
    height:auto;
    padding:15px;
    border-radius: 12px;
    margin-bottom: 8px;
    padding-left: 10px;
    padding-bottom: 7px;
    color:white;
}
button:hover{
    color:#e5e5e5;
}
</style>