<template>
    <div class="menu">
        <div @click="display = 1" class="menu-block" :style="display == 1 ? 'font-weight:Bold; background:rgb(255, 80, 124);' : null"> Schedules </div>
        <div @click="display = 2" class="menu-block" :style="display == 2 ? 'font-weight:Bold; background:rgb(255, 80, 124);' : null">Rank / Records</div>
        <div @click="display = 3" class="menu-block" :style="display == 3 ? 'font-weight:Bold; background:rgb(255, 80, 124);' : null">TEAM</div>
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