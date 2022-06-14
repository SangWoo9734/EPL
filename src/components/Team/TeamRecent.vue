<template>
	<div class="team-recent-detail">
		<p class="team-desc box">Recent Games</p>
		<div class="team-recent-play flex">
			<p
				v-for="(matchResult, index) in recentResult"
				:key="index"
				:style="`background : ${wdl(matchResult)}`"
			>
				{{ matchResult }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TeamRecent',
	props: {
		recentResult: { type: String, default: '' },
	},
	methods: {
		wdl(matchResult) {
			if (matchResult == 'W') {
				return '#13CF00';
			} else if (matchResult == 'L') {
				return '#D81920';
			} else {
				return '#76766F';
			}
		},
	},
};
</script>

<style scoped></style>
