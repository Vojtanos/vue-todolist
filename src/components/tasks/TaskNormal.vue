<template>
    <div class="items" :class="itemClass">
        <div class="item">{{name}}</div>
        <div class="item">{{person}}</div>
        <div class="item">{{deadline}}</div>
        <div class="item">{{desc.slice(0, 8)+"..."}}</div>
        <button @click="changeSize">více</button>
    </div>
</template>

<script>
    export default {
        props:['name','person','priority','initDate','deadline','desc','isDone'],
        data() {
            return {
                itemClass:'small',
            }
        },
        methods: {
            changeSize(){
                 this.$emit('changeSize', 'big')
            }, 
            itemPriority(){
                if(this.priority === 'Nízká')
                    this.itemClass = 'small'
                else if(this.priority === 'Střední')
                    this.itemClass = 'medium'
                else if(this.priority === 'Vysoká')
                    this.itemClass = 'big'
                
                if(this.isDone === true)
                    this.itemClass = 'done'
            }
        },
        mounted() {
            this.itemPriority()
        },
    }
</script>

<style scoped>
.item{
    color: white;
    padding-right: 10px;
}
.items{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.394);
    align-items: center;
    width:100%;
    font-size:15px;
    height:3rem;
    border-radius: 12px;
    background: #f7eeff;
    margin-bottom: 8px;
    padding-left: 10px;
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
button{
    height:2rem;
    width:50%;
    border-radius: 8px;
    border: 0px;
    color:white;
    background: #ffffff00;
    padding:2px rgb(255, 255, 255);
    cursor: pointer;
}
button:hover{
    color:#e5e5e5;
}
</style>