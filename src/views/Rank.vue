<template>
	<div class="view-wrapper">
		<div class="menu">
			<div
				@click="() => (state = false)"
				class="board-menu"
				:style="state == 0 ? this.btnDesign : null"
			>
				TEAM
			</div>
			<div
				@click="() => (state = true)"
				class="board-menu"
				:style="state == 1 ? this.btnDesign : null"
			>
				PLAYER
			</div>
		</div>
		<TeamRank v-if="!state" />
		<PersonalRank v-else />
	</div>
</template>

<script>
import TeamRank from '../components/Rank/RankTeam.vue';
import PersonalRank from '../components/Rank/RankPersonal.vue';

export default {
	name: 'RankPage',
	data() {
		return {
			btnDesign:
				'font-weight:Bold; border-bottom:3px; border-bottom-style:solid; border-bottom-color:rgb(230, 0, 91);border-radius: 5px;',
			state: false,
		};
	},
	components: {
		TeamRank,
		PersonalRank,
	},
};
</script>

<style>
.view-wrapper {
	height: calc(100% - 45px);
	overflow: auto;
}
.board-menu {
	width: 49.5%;
	text-align: center;
	padding: 3px;
}

.board-menu:hover {
	cursor: pointer;
}
</style>
