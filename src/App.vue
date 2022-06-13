<template>
	<div class="mainbg">
		<nav class="navbar navbar-light bg-light epl-nav">
			<div class="container-fluid" style="padding: 0">
				<a class="navbar-brand nav-image" href="#"
					><img src=".\assets\images\PL_logo.png"
				/></a>
			</div>
		</nav>
		<Container />
	</div>
</template>

<script>
import Container from './components/Container.vue';

export default {
	name: 'App',
	components: {
		Container: Container,
	},
};
</script>

<style>
@import './assets/styles/main.css';
</style>
