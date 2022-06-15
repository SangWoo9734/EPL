<template>
	<div class="loading-wrapper">
		<div class="loading-box">
			<img src="../assets/images/PL_biglogo.png" alt="pl_logo" />
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoadingComponent',
};
</script>

<style scoped>
.loading-wrapper {
	height: 60vh;
	position: relative;
}
.loading-box {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.loading-box img {
	width: 50px;
}
</style>
