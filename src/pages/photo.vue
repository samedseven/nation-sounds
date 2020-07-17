<template>
    <div class="q-px-md">
        <h1 class="text-center text-h5 q-my-lg">Gardez des souvenirs</h1>

        <div v-if="allImages.length < 1">
            <h2 class="text-h6">Vous n'avez aucune photo</h2>
        </div>

        <div v-if="lastImageSrc.length > 1">
            <h2 class="text-h6">Dernière photo</h2>
            <img :src="lastImageSrc">
        </div>

        <div v-if="allImages.length > 1">
            <h2 class="text-h6 block">Mes photos</h2>
            <div class="row">
                <div class="col-auto" v-for="image in allImages" :key="image.id">
                    <img class="q-pa-xs" style="width: 150px;" :src="image.base64" alt="">
                </div>
            </div>
        </div>

        <q-btn style="position: absolute; bottom: 0" class="full-width" color="primary" label="Prendre une photo" @click="captureImage" />

    </div>
</template>

<script>
    import { Plugins, CameraResultType } from '@capacitor/core'

    const { Camera } = Plugins

    export default {
        data () {
            return {
                lastImageSrc: '',
                allImages: []
            }
        },
        methods: {
            async captureImage () {
                const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: true,
                    resultType: CameraResultType.Base64
                })
                // image.webPath will contain a path that can be set as an image src.
                // You can access the original file using image.path, which can be
                // passed to the Filesystem API to read the raw data of the image,
                // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
                this.lastImageSrc = 'data:image/png;base64,'+image.base64String;

                localStorage.setItem('imageBase64', 'data:image/png;base64,'+image.base64String);
            },

            async getImages() {
                const images = this.allImages;

                Object.keys(localStorage).forEach(function(key){
                    console.log(localStorage.getItem(key));
                    images.push({base64: localStorage.getItem(key)})
                });
            }
        },

        mounted() {
            this.getImages();
        }
    }
</script>