<template>
	<!-- <template v-if="isFullPage">
        <router-view />
    </template>
	<template v-else>
		<header>
			<TopBar />
		</header>
		<div class="main-layout">
			<router-view />
		</div>
	</template> -->
	<div :class="{ 'is-home': isHome }" class="app-wrap">
		<Nav />
        <div class="pages-wrap">
            <router-view />
        </div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';
import Nav from '@v/Nav.vue';

// names
const FULL_PAGES = ['Writer', 'Home'];
export default defineComponent({
	name: 'App',
	components: {
		TopBar,
		Nav,
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
	color: @text-color;
	font-size: @font-m;
	font-family: 'PingFang SC', 'PingFangSC-Light', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial,
		'Liberation Sans', 'Hiragino Sans GB', 'Source Han Sans CN Normal', 'Microsoft YaHei', 'Wenquanyi Micro Hei',
		'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
	background: @color-bg;
}

.app-wrap {
    color: #8d9eb9;
	.nav {
		position: fixed;
		top: 0;
		left: 50px;
        z-index: 5;
		transition: all 0.35s ease;
        transform: scale(0.8);
	}
	&.is-home {
		.nav {
			top: 45%;
			left: 15%;
			transform: translateY(-50%);
		}
	}

    padding: 2.5vh 120px 0 0;
    .pages-wrap {
        margin-left: 210px;
        height: 95vh;
        // border: 1px solid red;
        position: relative;
    }
}
</style>
