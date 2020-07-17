<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="q-pa-sm">

                <div class="row flex flex-center" style="width: 100%;">

                    <div class="col-3 flex flex-center">
                        <q-btn
                                flat
                                dense
                                round
                                icon="menu"
                                aria-label="Menu"
                                @click="leftDrawerOpen = !leftDrawerOpen"
                        />
                    </div>

                    <div class="col-6">
                        <q-toolbar-title>
                            <q-btn to="/">
                                <img src="~assets/Logo_NationSounds_Blanc.png" style="width: 90%; display: table; margin: auto;">
                            </q-btn>
                        </q-toolbar-title>
                    </div>

                    <div class="col-3 flex flex-center">
                        <q-btn
                                flat
                                dense
                                round
                                icon="person"
                                aria-label="Compte"
                                to="/account"
                        />
                    </div>

                </div>

            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                bordered
                content-class="bg-grey-1"
        >
            <q-list style="height: 100vh;" class="nav text-white">

                <q-item class="q-py-md">
                    <img src="~assets/Logo_NationSounds_Blanc.png" style="width: 90%; display: table; margin: auto;">
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/`">
                    <q-item-section avatar>
                        <q-icon color="white" name="home" />
                    </q-item-section>

                    <q-item-section>Accueil</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/programme`">
                    <q-item-section avatar>
                        <q-icon color="white" name="today" />
                    </q-item-section>

                    <q-item-section>Programmes</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/informations`">
                    <q-item-section avatar>
                        <q-icon color="white" name="info" />
                    </q-item-section>

                    <q-item-section>Informations</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/photo`">
                    <q-item-section avatar>
                        <q-icon color="white" name="add_a_photo" />
                    </q-item-section>

                    <q-item-section>Photonation</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple @click.native="goTickets">
                    <q-item-section avatar>
                        <q-icon color="white" name="style" />
                    </q-item-section>

                    <q-item-section>Billeterie</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/plan`">
                    <q-item-section avatar>
                        <q-icon color="white" name="location_on" />
                    </q-item-section>

                    <q-item-section>Plan</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/partenaires`">
                    <q-item-section avatar>
                        <q-icon color="white" name="dashboard" />
                    </q-item-section>

                    <q-item-section>Partenaires</q-item-section>
                </q-item>

                <q-item class="q-py-lg" clickable v-ripple :to="`/faq`">
                    <q-item-section avatar>
                        <q-icon color="white" name="help" />
                    </q-item-section>

                    <q-item-section>FAQ</q-item-section>
                </q-item>

            </q-list>

            <q-list style="position: absolute; width: 100%; bottom: 0;" class="nav q-pt-lg">

                <div class="text-white">

                    <div class="row flex-center">
                        <p class="text-uppercase text-weight-bold text-subtitle-3 text-center">Retrouvez-nous sur les réseaux sociaux</p>
                    </div>

                    <div class="row q-pa-md flex-center justify-between">
                        <a class="text-no-wrap" v-for="s in social" :key="s.id" :href="s.socialUrl" target="_blank">
                            <q-icon :name="s.path" style="font-size: 24px"/>
                        </a>
                    </div>

                </div>

            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        name: 'MainLayout',

        data () {
            return {
                tab: 'mails',
                leftDrawerOpen: false,
                social: [
                    {
                        socialUrl: "https://www.facebook.com/",
                        path: "fab fa-facebook-f"
                    },
                    {
                        socialUrl: "https://twitter.com/",
                        path: "fab fa-twitter"
                    },
                    {
                        socialUrl: "https://www.instagram.com/",
                        path: "fab fa-instagram"
                    },
                    {
                        socialUrl: "https://www.youtube.com/",
                        path: "fab fa-youtube"
                    },
                    {
                        socialUrl: "https://www.snapchat.com/l/fr-fr/",
                        path: "fab fa-snapchat-ghost"
                    },
                    {
                        socialUrl: "https://fr.linkedin.com/",
                        path: "fab fa-linkedin-in"
                    }
                ]
            }
        },

        methods: {
            goTickets() {
                window.location = "http://nation-sounds.alwaysdata.net/evenements/"
            }
        }
    }
</script>
