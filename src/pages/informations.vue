<template>
    <div>
        <h1 class="text-center">Informations</h1>
        <q-card v-for="info in infos" :key="info.id" class="my-card">
            <q-img :src="`${info.acf.image}`" :ration="16/9" />

            <q-card-section>
                <div class="text-h6" v-html="info.title.rendered"></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <p v-html="info.content.rendered"></p>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "informations",

        data() {
            return {
                infos: []
            }
        },

        methods: {
            async getInfos() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/actu');
                const result = await resp.json();

                this.infos = result;
            }
        },

        mounted() {
            this.getInfos();
        }
    }
</script>

<style scoped>

</style>