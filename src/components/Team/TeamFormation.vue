<template>
	<div class="team-recent-detail">
		<div class="team-desc box">Line Ups</div>
		<div
			v-for="info in formationInfo"
			:key="info.foramtion"
			class="team-lineups flex"
		>
			<p>{{ info.formation }}</p>
			<p>{{ info.played }}</p>
		</div>
		<div style="clear: both"></div>
	</div>
</template>

<script>
export default {
	name: 'TeamFormation',
	props: {
		formationInfo: { type: Array, default: null },
	},
};
</script>

<style scoped></style>
