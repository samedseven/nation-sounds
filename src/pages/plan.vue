<template>
    <div>
        <q-form>
            <q-select v-model="model" :options="options" label="Standard" />
        </q-form>
        GPS position: <strong>latitude : {{ position.latitude }}</strong> & <strong>longitude : {{ position.longitude }}</strong>
        <gmap-map
                :center="{lat:position.latitude, lng:position.longitude}"
                :zoom="17"
                map-type-id="terrain"
                style="width: 500px; height: 300px"
        >
            <gmap-marker
                v-for="marker in markers" :key="marker.id"
            >

            </gmap-marker>

        </gmap-map>
    </div>
</template>

<script>
    import Vue from 'vue'
    import * as VueGoogleMaps from 'vue2-google-maps'

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyBwlo6uvnAjQ3rRvjxpV2fgGkltQO0E3OI'
        },
    });

    import { Plugins } from '@capacitor/core';

    const { Geolocation } = Plugins;

    export default {
        data () {
            return {
                position: {
                    latitude: '',
                    longitude: ''
                },
                markers: {

                },
                scenes: [],
                options: [
                    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
                ],
                model: null,
            }
        },
        methods: {
            getCurrentPosition() {
                Geolocation.getCurrentPosition().then(position => {
                    console.log('Current', position);
                    this.position.latitude = position.coords.latitude
                    this.position.longitude = position.coords.longitude
                },
                error => {
                    console.log("Error", error)
                });
            },

            async getScenes() {
                const resp = await fetch('http://localhost/live-events/wp-json/wp/v2/scenes');
                const result = await resp.json();

                for (let r = 0; r < result.length; r++) {
                    this.scenes.push({label: "Scène n°" + result[r].acf.numero_de_scene, value: result[r].acf.numero_de_scene});
                }

                console.log(result)
            }
        },
        mounted () {
            this.getCurrentPosition();
            this.getScenes();
        }
    }
</script>

<style>

    .vue-map-container {
        width: 100%!important;
        height: 500px!important;
    }

</style>