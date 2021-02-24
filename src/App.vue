<template>
	<template v-if="isFullPage">
        <router-view />
    </template>
	<template v-else>
		<header>
			<TopBar />
		</header>
		<div class="main-layout">
			<router-view />
		</div>
	</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';

// names
const FULL_PAGES = [
    'Writer'
];
export default defineComponent({
	name: 'App',
	components: {
		TopBar,
	},
	computed: {
		isFullPage() {
            // @ts-ignore
            return FULL_PAGES.indexOf(this.$route.name) > -1;
        },
	},
});
</script>

<style lang="less">
#app {
	height: 100%;
    color: @text-color;
    font-size: @font-m;
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
