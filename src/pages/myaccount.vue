<template>
    <div>
        <div>
            <h1>Mon compte : {{ email }}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homepage",

        data() {
            return {
                email: ''
            }
        },

        methods: {

        },

        mounted() {
          //this.getUserLogged();
        },

        created() {
            //User not authorized
            if (localStorage.getItem("token") === null) {
                this.$router.push({path: 'login'})
            }
        }
    }
</script>

<style scoped>

</style>