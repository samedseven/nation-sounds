<template>
    <div>
        <div>
            <q-form>
                <q-input type="email" label="Adresse email" v-model="email"/>
                <q-input type="password" label="Mot de passe" v-model="password"/>
                <q-btn label="Se connecter" @click="loginUser"/>
            </q-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login-form",

        data() {
            return {
                email: '',
                password: ''
            }
        },

        methods: {
            loginUser() {
                let user = {
                    email: this.email,
                    password: this.password
                };
                fetch('http://localhost:3000/login', {method: "POST", body:JSON.stringify(user)})
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("token", data.content);
                        console.log(data);
                    });
            }
        }
    }
</script>

<style scoped>

</style>