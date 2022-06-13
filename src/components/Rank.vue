<template>
	<div>
		<div class="menu">
			<div
				@click="state = 0"
				class="board-menu"
				:style="state == 0 ? this.btnDesign : null"
			>
				TEAM
			</div>
			<div
				@click="state = 1"
				class="board-menu"
				:style="state == 1 ? this.btnDesign : null"
			>
				PLAYER
			</div>
		</div>
		<TeamRank v-if="state == 0" />
		<PersonalRank v-if="state == 1" />
	</div>
</template>

<script>
import TeamRank from './TeamRank.vue';
import PersonalRank from './Personalrank.vue';

export default {
	name: 'RankPage',
	data() {
		return {
			btnDesign:
				'font-weight:Bold; border-bottom:3px; border-bottom-style:solid; border-bottom-color:rgb(230, 0, 91);border-radius: 5px;',
			state: 0,
		};
	},
	components: {
		TeamRank: TeamRank,
		PersonalRank: PersonalRank,
	},
};
</script>

<style>
.board-menu {
	width: 49.5%;
	text-align: center;
	padding: 3px;
}

.board-menu:hover {
	cursor: pointer;
}
</style>
