<template>
    <div>

        <q-card>
            <q-tabs
                    v-model="tab"
                    dense
                    class="bg-green-5 text-white"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
            >
                <q-tab name="concerts" label="Concerts" />
                <q-tab name="rencontres" label="Rencontres" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="q-pa-none" name="concerts">

                    <!--

                    *****   CHILD TAB   *****

                    -->

                    <q-card>
                        <q-tabs
                                v-model="childTab"
                                dense
                                class="text-grey"
                                active-color="primary"
                                indicator-color="primary"
                                align="justify"
                                narrow-indicator
                        >
                            <q-tab class="bg-green-3 text-white" v-for="day in days" :name="day" :label="day" :key="day.id" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="childTab" animated>
                            <q-tab-panel v-for="day in days" :name="day" :key="day.id">
                                <div class="row" v-for="programme in programmes" v-if="day === programme.date" :key="programme.id">
                                    <div class="col" v-for="artistPhoto in artistsPhoto" v-if="programme.artiste === artistPhoto.title.rendered" :key="artistPhoto.id">

                                        <img class="roundedImages" :src="artistPhoto.acf.photo.sizes.thumbnail" />

                                    </div>

                                    <div class="col">
                                        <h2 class="q-mt-none text-h4 text-weight-bold">{{ programme.artiste }}</h2>
                                        <strong class="block">À partir de {{ programme.heure }}</strong>
                                        <strong>Scène {{ programme.scene }}</strong>
                                    </div>
                                    <hr style="width:100%; margin-top:15px;" />
                                </div>
                            </q-tab-panel>

                        </q-tab-panels>
                    </q-card>

                    <!--

                    *****   END CHILD TAB   *****

                    -->


                </q-tab-panel>

                <q-tab-panel name="rencontres" class="q-pa-none">
                    <div v-for="rencontre in rencontres" :key="rencontre.id">
                        <q-card>
                            <q-tabs
                                    v-model="childTab2"
                                    dense
                                    class="text-grey"
                                    active-color="primary"
                                    indicator-color="primary"
                                    align="justify"
                                    narrow-indicator
                            >
                                <q-tab class="bg-green-3 text-white" v-for="day in rencontresDates" :name="day" :label="day" :key="day.id" />
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="childTab2" animated>
                                <q-tab-panel v-for="day in rencontresDates" :name="day" :key="day.id">
                                    <div class="row" v-for="rencontre in rencontres" v-if="day === rencontre.date" :key="rencontre.id">
                                        <div class="col" v-for="artistPhoto in artistsPhoto" v-if="rencontre.artiste === artistPhoto.title.rendered" :key="artistPhoto.id">

                                            <img class="roundedImages" :src="artistPhoto.acf.photo.sizes.thumbnail" />

                                        </div>

                                        <div class="col">
                                            <h2 class="q-mt-none text-h4 text-weight-bold">{{ rencontre.artiste }}</h2>
                                            <p>Retrouvez votre artiste <strong>{{ rencontre.artiste }}</strong> le <strong>{{ rencontre.date }}</strong> à <strong>{{ rencontre.heure }}</strong> !</p>
                                        </div>
                                        <hr style="width:100%; margin-top:15px;" />
                                    </div>
                                </q-tab-panel>

                            </q-tab-panels>
                        </q-card>
                    </div>
                </q-tab-panel>

            </q-tab-panels>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "programme",

        data() {
            return {
                tab: 'concerts',
                childTab: '22 juillet',
                childTab2: '22 juillet',
                programmes: [],
                days: [],
                artistsPhoto: [],
                rencontres: [],
                rencontresDates: []
            }
        },

        methods: {
            async getProgrammes() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/evenements');
                const result = await resp.json();

                let dates = [];

                for (let r = 0; r < result.length; r++) {
                    let dateAndHour = result[r].acf.date_et_heure;

                    let date = dateAndHour.substr(0, dateAndHour.indexOf(","));
                    dates.push(date);

                    let hour = dateAndHour.substr(-8, 5);
                    this.programmes.push({
                        "artiste": result[r].acf.choix_de_lartiste[0].post_title,
                        "scene": result[r].acf.choix_de_la_scene[0].post_title,
                        "date": date,
                        "heure": hour
                    })
                }

                let out = Array.from(new Set(dates));

                this.days = out;
            },

            async getRencontres() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/rencontres');
                const result = await resp.json();

                let dates = [];

                for (let r = 0; r < result.length; r++) {
                    let dateAndHour = result[r].acf.date_et_heure;

                    let date = dateAndHour.substr(0, dateAndHour.indexOf(","));
                    dates.push(date);

                    let hour = dateAndHour.substr(-8, 5);

                    this.rencontres.push({
                        "artiste": result[r].acf.artiste[0].post_title,
                        "date": date,
                        "heure": hour
                    })
                }

                let out = Array.from(new Set(dates));
                this.rencontresDates = out
            },

            async getArtistsPhoto() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/artists');
                const result = await resp.json();

                this.artistsPhoto = result
            },
        },



        mounted() {
            this.getProgrammes();
            this.getArtistsPhoto();
            this.getRencontres();
        }
    }
</script>

<style scoped>

</style>