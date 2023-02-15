<template>
    <form @submit.prevent="postUser">
        <div class="title">
            Přidat uživatele
        </div>
        <div class="fields">
            <input type="text" placeholder="Jméno" v-model="name">
            <input type="text" placeholder="Příjmení" v-model="surName">
            <input type="email" placeholder="Email" v-model="email">
            <input type="tel" placeholder="Telefon" pattern="^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$"
                     v-model="phoneNumber">
            <button>Přidat</button>
        </div>
        <div v-if="invalidInput" class="error">Musí být vyplněna všechna pole!</div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            surName: '',
            email: '',
            phoneNumber: '',
            invalidInput: false,
            error: null,
        };
    },
    methods: {
        postUser() {
            if (this.firstName === '' || this.secondName === '' || this.email === '' || this.phoneNumber === '') {
                this.invalidInput = true;
                return;
            }
            const user = {
                name: this.name,
                surName: this.surName,
                email: this.email,
                phoneNumber: this.phoneNumber
            }

            this.$store.dispatch('users/postUser', user);

            this.invalidInput = false;
            this.name = ''
            this.surName = ''
            this.email = ''
            this.phoneNumber = ''
        }
  }
}
</script>

<style scoped>
.error {
    display: flex;
    align-items: center;
    width:250px;
    font-size:15px;
    height:2rem;
    border-radius: 10px;
    margin-bottom: 8px;
    padding-left: 10px;
}
.title{
    margin-left: 25px;
    font-size:20px;
    display: flex;
    align-items: end;
}
form{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width:100%;
}
.fields {
    display: flex;
    align-items: center;
    margin-top: 10px; 
    }
input{
    font-size:15px;
    height:2rem;
    width:130px;
    border-radius: 10px;
    border: 1px solid rgb(228, 228, 228);
    background: white;
    padding-left: 15px;
    margin-right:3px;
    margin-bottom: 8px;
}
button{
    font-size:15px;
    height:2rem;
    width:70px;
    border-radius: 10px;
    color: rgb(235, 235, 235);
    border: 1px solid rgb(228, 228, 228);
    background: #0091AD;
    cursor: pointer;
    margin-bottom: 8px;
}
input:focus
{
    border: 2px solid #0091AD;
    outline-offset: 0px;
    outline: none;
}
@media only screen and (max-width: 670px) {
    .fields {
        flex-direction: column;
        width:100%;
    }
    button,input {
        width:100%;
    }
}
</style>