<template>
    <div>

        <q-carousel
                v-model="slideAlert"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                padding
                arrows
                navigation
                autoplay
                infinite
                height="150px"
                class="text-white shadow-1"
                style="background-color: #00CEAE"
        >
            <q-carousel-slide v-for="info in infos" :key="info.id" :name="info.slug" class="column no-wrap flex-center">
                <q-icon name="warning" size="48px" style="color: #20313A" />
                <div class="q-mt-md text-center">
                    <p v-html="info.content.rendered"></p>
                </div>
            </q-carousel-slide>

        </q-carousel>

        <q-carousel
                v-model="slideInfo"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                padding
                arrows
                navigation
                autoplay
                infinite
                height="300px"
                class="text-white shadow-1"
                style="background-color: #20313A"
        >
            <q-carousel-slide v-for="info in infosG" :key="info.id" :name="info.slug" class="column no-wrap flex-center">
                <q-icon name="info" size="56px" style="color: #00CEAE" />
                <div class="q-mt-md text-center">
                    <p v-html="info.content.rendered"></p>
                </div>
            </q-carousel-slide>

        </q-carousel>

        <div class="q-py-lg" style="background-color: #E8F7E7">

            <div class="row">
                <div class="text-center q-pa-md" v-for="artiste in artistes" :key="artiste.id">
                    <img class="roundedImages" :src="`${artiste.acf.photo.sizes.thumbnail}`">
                    <h2 class="q-ma-none text-h5">{{ artiste.title.rendered }}</h2>
                </div>
            </div>

            <div>
                <q-btn class="float-right q-my-md q-mx-md" color="secondary" label="Voir le programme" :to="`/programme`"/>
            </div>

            <div class="full-width flex flex-center">
                <q-btn style="background: #497787; color: white; width: 85%;" label="Billeterie !" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homepage",

        data() {
            return {
                homepage:[],
                artistes: [],
                infos: [],
                infosG: [],
                slideAlert: null,
                slideInfo: null
            }
        },

        methods: {
            async getArtistes() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/artists');
                const result = await resp.json();

                this.artistes = result
            },

            async getInfos() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/actu');
                const result = await resp.json();

                for (let a = 0; a < result.length; a++) {
                    if (result[a].categories[1] === 7 || result[a].categories[1] === 16) {
                        this.infos.push(result[a])

                    }
                    if (result[a].categories[1] === 15 || result[a].categories[1] === 14) {
                        this.infosG.push(result[a])
                    }
                }

                this.slideAlert = this.infos[0].slug;
                this.slideInfo = this.infosG[0].slug
            }
        },

        mounted() {
            this.getArtistes();
            this.getInfos();
        }
    }
</script>

<style scoped>

</style>