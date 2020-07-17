<template>
    <div>
        <h1 class="text-center text-uppercase">Partenaires</h1>

        <div>
            <q-tabs
                    v-model="tab"
                    dense
                    class="text-white"
                    style="background-color: #00CEAE"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
            >
                <q-tab v-for="categorie in categories" :key="categorie.id" :name="categorie.name" :label="categorie.name" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>

                <q-tab-panel v-for="partenaire in partenaires" :key="partenaire.id" :name="partenaire.categoryName">
                    <div class="col q-pa-xs">
                        <img class="q-pa-sm" v-for="p in partenaires" :key="p.id" v-if="p.categoryName === partenaire.categoryName" :src="`${p.logo}`" style="width: 150px" alt="">
                    </div>
                </q-tab-panel>

            </q-tab-panels>
        </div>
    </div>
</template>

<script>
    export default {
        name: "partenaires",

        data() {
            return {
                tab: null,
                categories: [],
                partenaires: []
            }
        },

        methods: {
            async getPartners() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/partenaires');
                const result = await resp.json();

                let partenaires = [];
                let categories = [];

                let filter = [];

                for (let p = 0; p < result.length; p++) {
                    filter.push(result[p].categories[0]);
                    partenaires.push({idCategory: result[p].categories[0], name: result[p].title.rendered, logo: result[p].acf.logo});
                }

                let Outfilter = Array.from(new Set(filter));

                const resp2 = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/categories');
                const result2 = await resp2.json();

                for (let c = 0; c < result2.length; c++) {

                    if (Outfilter.includes(result2[c].id)) {
                        this.categories.push({name: result2[c].name});
                        categories.push({categoryName: result2[c].name, idCategory: result2[c].id})
                    }

                }

                let contentPartenaires = partenaires.map((partner)=> {
                    let haveEqualId = (category) => category.idCategory === partner.idCategory;
                    let categoryPartner = categories.find(haveEqualId);
                    return Object.assign({}, partner, categoryPartner)
                });

                this.partenaires = contentPartenaires;

                this.tab = this.categories[0].name

            }
        },

        mounted() {
            this.getPartners();
        }
    }
</script>

<style scoped>

</style>