<template>
    <form @submit.prevent="updateUser()">
        <input type="text" 
            v-model="nameNew" 
            @dblclick="activateInput" 
            :readonly="notEditable" 
            :class="{ 'input_focused' : !notEditable}"
        >
        <input type="text" 
            v-model="surNameNew" 
            @dblclick="activateInput" 
            :readonly="notEditable" 
            :class="{ 'input_focused' : !notEditable}"
        >
        <input type="email" 
            v-model="emailNew" 
            @dblclick="activateInput" 
            :readonly="notEditable" 
            :class="{ 'input_focused' : !notEditable}"
        >
        <input type="tel" pattern="^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$"
            v-model="phoneNumberNew" 
            @dblclick="activateInput" 
            :readonly="notEditable" 
            :class="{ 'input_focused' : !notEditable}"
        >
        <div class="modifier">
            <button v-if="!notEditable">Uložit</button>
            <button @click="deleteUser()">Smazat</button>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            notEditable: true,
            nameNew: this.name,
            surNameNew: this.surName,
            emailNew: this.email,
            phoneNumberNew: this.phoneNumber,
        }
    },
    props: ['name', 'surName','email','phoneNumber','users','id'],
    methods: {
        deleteUser(){
            if (window.confirm("Vážně chcete uživatel vymazat?")) {
                this.$store.dispatch('users/deleteUser', this.id);
            }
        },
        activateInput(){
            this.notEditable = false
        },
        updateUser(){
            var user = {
                _id: this.id,
                name: this.nameNew,
                surName: this.surNameNew,
                email: this.emailNew,
                phoneNumber: this.phoneNumberNew   
            }
            this.$store.dispatch('users/updateUser', user);
            this.notEditable = true
        }

    },
}
</script>

<style scoped>
input{
    outline: none;
    border: none;
    width: 95%;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none; 
    font-size:15px; 
    margin: 0;
    color: white;
}
.input_focused:focus{
    border: solid 1px;
    border-radius: 6px;
}
.item{
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.394);
    align-items: center;
    width:100%;
    font-size:15px;
    height:3rem;
    border-radius: 12px;
    background: #921b1b;
    margin-bottom: 8px;
    padding-left: 10px;
}
button{
    font-size:11px;
    height:1rem;
    border-radius: 8px;
    color: #ffffff;
    border: 0px;
    padding:2px;
    background: #a01a5800;
    cursor: pointer;
}
button:hover{
    color:#e5e5e5;
}
.modifier{
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-right: 5px;
}
</style>