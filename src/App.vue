<template>
    <StarSky />
	<transition name="fade">
		<template v-if="isFullPage">
			<router-view />
		</template>

		<template v-else>
			<div class="main-layout" :class="{ none: !loading && isHome }">
				<TopBar />
				<router-view v-slot="{ Component }">
					<transition name="slide" mode="out-in" :appear="true">
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</template>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';
import StarSky from './pages/lab/css/StarSky.vue';

// names
const FULL_PAGES = ['Writer', 'Home'];
export default defineComponent({
	name: 'App',
	data() {
		return {
			loading: false,
		};
	},
	components: {
		TopBar,
        StarSky
	},
	computed: {
		isFullPage() {
			// @ts-ignore
			return FULL_PAGES.indexOf(this.$route.name) > -1;
		},
		isHome() {
			return this.$route.name === 'Home' || this.$route.path === '/';
		},
	},
	mounted() {
		// 防止第一次进首页时出现其他路由的退出动画
		setTimeout(() => {
			this.loading = true;
		}, 800);
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
		position: relative;

		> .main-menu {
			width: @side-menu-width;
			border-right: 1px solid transparent;
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

<style lang="less">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s;
	.main-menu {
		transition: all 0.3s;
	}
	.main-content {
		transition: all 0.3s;
	}
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	.main-menu {
		transform: translateX(-20%);
	}
	.main-content {
		transform: translateX(10%);
	}
}
</style>
