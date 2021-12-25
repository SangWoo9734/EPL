<template>
    <div class="menu">
        <div @click="display = 1" class="menu-block" :style="display == 1 ? btnDesign : null">FIXTURES</div>
        <div @click="display = 2" class="menu-block" :style="display == 2 ? btnDesign : null">RECORDS</div>
        <div @click="display = 3" class="menu-block" :style="display == 3 ? btnDesign : null">CLUBS</div>
    </div>

    <Schedule v-if="display == 1"/>
    <Rank v-if="display == 2"/>
    <Team v-if="display == 3"/>

</template>

<script>
import Team from './Team.vue';
import Rank from './Rank.vue';
import Schedule from './Schedule.vue';

export default {
    name : 'container',
    data() {
        return {
            btnDesign : 'font-weight:Bold; border-bottom:3px; border-bottom-style:solid; border-bottom-color:rgb(230, 0, 91);border-radius: 5px;',
            display : 1,
        }
    },
    components : {
        Team,
        Rank,
        Schedule,
    },
    methods :{
    },
}
</script>

<style>

</style>