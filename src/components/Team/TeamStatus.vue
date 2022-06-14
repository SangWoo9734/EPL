<template>
	<div class="team-recent-detail">
		<p class="team-desc box">Status</p>
		<div class="team-grade flex">
			<p>{{ fixtures[0] }} <span>G</span></p>
			<p>{{ fixtures[1] }} <span>W</span></p>
			<p>{{ fixtures[2] }} <span>D</span></p>
			<p>{{ fixtures[3] }} <span>L</span></p>
			<p>{{ goals[0] }} <span>GF</span></p>
			<p>{{ goals[1] }} <span>GA</span></p>
			<p>{{ cleanSheet }} <span>CS</span></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TeamStatus',
	props: {
		fixtures: { type: Array, default: null },
		goals: { type: Array, default: null },
		cleanSheet: { type: Number, default: 0 },
	},
};
</script>

<style scoped></style>
