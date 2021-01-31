<template>
	<header>
		<TopNav msg="test"/>
	</header>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNav from '_c/TopNav.vue';

export default defineComponent({
	name: 'App',
	components: {
		TopNav,
	},
});
</script>
