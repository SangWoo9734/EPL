<template>
	<div
		class="team-detail"
		:style="`background-image : url(${teamDetail.ven_image})`"
	>
		<div class="team-detail-blur flex">
			<div class="team-detail-image">
				<img :src="`${teamDetail.logo}`" alt="" class="" />
			</div>
			<div class="team-detail-text text-center">
				<p class="team-name">{{ teamDetail.name }}</p>
				<p>Founded - {{ teamDetail.founded }}</p>
				<br />
				<p>
					{{ teamDetail.ven_name }} /
					{{ teamDetail.ven_city }}
				</p>
				<p>Capacity - {{ teamDetail.capacity }} seats</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TeamInfo',
	data() {
		return {
			count: 1,
		};
	},
	props: {
		teamDetail: { type: Object, default: null },
	},
};
</script>

<style scoped></style>
