<template>
    <div>
        <div>
            <q-form>
                <q-input type="email" label="Adresse email" v-model="email"/>
                <q-input type="password" label="Mot de passe" v-model="password"/>
                <q-input type="password" label="Confirmez le mot de passe" v-model="confirmPassword"/>
                <q-btn label="S'inscrire" @click="registerUser"/>
            </q-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register-form",

        data() {
            return {
                user: [],
                email: '',
                password: '',
                confirmPassword: ''
            }
        },

        methods: {
            registerUser() {
                const body = {
                    email: this.email,
                    password: this.password
                };
                fetch('http://localhost:3000/users', {method: "POST", body:JSON.stringify(body)})
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem("token", data.content);
                        //this.$router.push({path: '/events'});
                        //console.log(data.content);
                    });
            }
        }
    }
</script>

<style scoped>

</style>