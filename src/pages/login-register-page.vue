<template>
    <div>
        <div>
            <div>
                <q-btn label="Connexion" @click="showFormLogin"/>
                <q-btn label="Inscription" @click="showFormRegister"/>
            </div>
            <register-form v-if="formRegister"/>
            <login-form v-if="formLogin"/>
        </div>
    </div>
</template>

<script>
    import RegisterForm from "../components/register-form";
    import LoginForm from "../components/login-form";
    export default {
        name: "login-page",

        components: {LoginForm, RegisterForm},

        data() {
          return {
              formLogin: true,
              formRegister: false,
          }
        },

        methods: {
            showFormLogin() {
                this.formLogin = true;
                this.formRegister = false;
            },
            showFormRegister() {
                this.formLogin = false;
                this.formRegister = true;
            }
        },

        created() {
            //User not authorized
            if (localStorage.getItem("token") != null) {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>

</style>