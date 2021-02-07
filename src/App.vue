<template>
	<header>
		<TopBar />
	</header>
	<div class="main-layout">
		<router-view />
	</div>
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

<style lang="less">
#app {
	height: 100%;
}

.main-layout {
	position: relative;
	top: 15px;
	height: calc(100% - @headerHeight - 20px);
	overflow-y: auto;
	border: 1px solid red;
	> section {
		width: @mainWidth;
		min-width: @minMainWidth;
		margin: 0 auto;
		height: 100%;
		display: flex;

		> .main-menu {
			background: #fff;
			margin-right: 20px;
		}
		> .main-content {
            background: #fff;
            flex: 1;
		}
	}
}
</style>
