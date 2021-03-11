<template>
	<template v-if="isFullPage">
		<router-view />
	</template>
	<template v-else>
		<div class="main-layout">
			<TopBar />
			<section>
				<router-view />
			</section>
		</div>
	</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';

// names
const FULL_PAGES = ['Writer', 'Home'];
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
		isHome() {
			return this.$route.name === 'Home';
		},
	},
});
</script>

<style lang="less">
#app {
	height: 100%;
	color: @color-text;
	font-size: @font-m;
	font-family: InterV_Semi, InterV_Semi-Bold, 'PingFang SC', 'PingFangSC-Light', 'Helvetica Neue', Helvetica,
		'Nimbus Sans L', Arial, 'Liberation Sans', 'Hiragino Sans GB', 'Source Han Sans CN Normal', 'Microsoft YaHei',
		'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
	background: @color-bg;
}

.main-layout {
	display: flex;
	flex-direction: column;
	height: 100%;
	> section {
		flex: 1;
		display: flex;
		height: 100%;
		overflow: hidden;

		> .main-menu {
			width: @side-menu-width;
			border-right: 1px solid @color-border;
		}

		> .main-content {
			flex: 1;
			padding: 40px;
			overflow-y: hidden;
			padding-right: 40px + @scrollbar-width;
			&:hover {
				padding-right: 40px;
				overflow-y: auto;
			}
		}
	}
}
</style>
