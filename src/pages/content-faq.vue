<template>
    <div>
        <h1 class="text-center text-capitalize text-h3">{{ categoryName }}</h1>

        <q-list bordered class="rounded-borders">
            <q-expansion-item
                    v-for="post in posts"
                    :key="post.id"
                    expand-separator
                    icon="perm_identity"
                    :label="`${post.title}`"
                    caption="date"
            >
                <q-card>
                    <q-card-section>
                        <p v-html="post.content"></p>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<script>
    export default {
        name: "content-faq",

        data() {
            return {
                categoryName: null,
                posts: []
            }
        },

        methods: {
            async getFaq() {
                const resp = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/faq');
                const result = await resp.json();

                const id = this.$route.params.id;

                for (let p = 0; p < result.length; p++) {
                    if (result[p].categories.some(x => x == id)) {
                        this.posts.push({title: result[p].title.rendered, content: result[p].content.rendered})
                    }
                }

                const resp2 = await fetch('http://nation-sounds.alwaysdata.net/wp-json/wp/v2/categories/' + id);
                const result2 = await resp2.json();

                this.categoryName = result2.name

            }
        },

        mounted() {
            this.getFaq();
        }
    }
</script>

<style scoped>

</style>