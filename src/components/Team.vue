<template>
    <div class="board-season flex mt-3 mb-3">
        <button @click="this.season = changeSeason(this.season - 1)">&lt;</button>
        <p>{{ this.season }} - {{this.season % 100 + 1}}</p>
        <button @click="this.season = changeSeason(this.season + 1)">&gt;</button>
    </div>
</template>

<script>
export default {
    name : 'Team',
    data() {
        return {
            season : 2021,
        }
    }
}
</script>

<style>

</style>