<template>
    <div>
        <h1 class="text-center">FAQ</h1>
        <div id="faq" class="row">
            <q-list class="full-width">
                <q-item
                        class="roundedImages bg-green flex flex-center justify-center faq"
                        v-for="post in faq" :key="post.id"
                        clickable
                        v-ripple
                        :to="`/faq/${post.id}`"

                >
                    <h2 class="text-h6 text-white">{{ post.name }}</h2>

                </q-item>
            </q-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "faq",

        data() {
            return {
                faq: []
            }
        },

        methods: {
            async getFaqCategories() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/categories');
                const result = await resp.json();

                let categoriesNames = [];

                for(let c = 0; c < result.length; c++) {
                    if (result[c].parent === 2) {
                        categoriesNames.push({id: result[c].id, name: result[c].name, slug: result[c].slug})
                    }
                }

                let outCategoriesName = Array.from(new Set(categoriesNames));

                this.faq = outCategoriesName;
            }
        },

        mounted() {
            this.getFaqCategories();
        }
    }
</script>