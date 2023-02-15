<template>
    <div class="calendar_item" :class="itemClass" @click="changeSize">
        <div class="calendar_element text_strong">{{name}}</div>
        <div class="calendar_element">{{person}}</div>
        <div class="calendar_element">{{deadline}}</div>
        <div class="calendar_element">{{desc.slice(0, 12)+"..."}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                itemClass:'',
            }
        },
        props:['name','person','priority','initDate','deadline','desc','isDone','id','date'],
        methods: {
            setStyle(){
                if(this.priority === 'Nízká')
                    this.itemClass = 'small'
                else if(this.priority === 'Střední')
                    this.itemClass = 'medium'
                else if(this.priority === 'Vysoká')
                    this.itemClass = 'big'
                
                if(this.isDone === true)
                    this.itemClass = 'done'
            },
            changeSize(){
                this.$emit('changeSize', 'big')
        },
        },
        mounted() {
            this.setStyle()
        },
    }
</script>

<style scoped>
.calendar_item{
    display: flex;
    flex-direction: column;
    width:90%;
    font-size:15px;
    border-radius: 12px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.394);
    background: #2E6F95;
    margin-bottom: 8px;
    padding-left: 10px;
    color: #fff;
    cursor: pointer;
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
.text_strong{
    font-weight: 700;
}
.calendar_element{
    margin-bottom: 7px;
    margin-top: 5px;
}
</style>