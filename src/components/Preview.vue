<template>
    <div ref="previewContainer" id="previewContainer" v-html="html">
    </div>
</template>

<script>
export default {
    name:'preview',
    data(){
        return{

        }
    },
    computed:{
        html(){
            return this.$store.state.html;
        }
    }
}
</script>