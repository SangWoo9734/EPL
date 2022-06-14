<template>
	<div class="team-thumb pt-3 pb-3 flex box">
		<div
			v-for="team in teamStatic"
			:key="team"
			class="team-thumb-box"
			@click="setTeamId(team.team.id)"
		>
			<div class="team-thumb-image mb-1">
				<img :src="`${team.team.logo}`" alt="" class="" />
			</div>
			<p>{{ team.team.name }}</p>
		</div>
	</div>
</template>

<script>
import teamStatic from '../../assets/data/team_data.json';

export default {
	name: 'TeamList',
	data() {
		return {
			teamStatic,
		};
	},
	methods: {
		setTeamId(id) {
			this.$emit('setTeamId', id);
		},
	},
};
</script>

<style scoped></style>
