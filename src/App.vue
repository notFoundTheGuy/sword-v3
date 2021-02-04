<template>
	<header>
		<TopBar/>
	</header>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';

export default defineComponent({
	name: 'App',
	components: {
		TopBar,
	},
});
</script>
