<template>
	<template v-if="isFullPage">
        <keep-alive>
            <router-view />
        </keep-alive>
    </template>
	<template v-else>
        <div class="main-layout">
            <TopBar />
            <section>
                <router-view />
            </section>
        </div>
	</template>
	<!-- <div :class="{ 'is-home': isHome }" class="app-wrap">
		<Nav />
		<div class="pages-wrap">
			<router-view />
		</div>
	</div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '@/views/TopBar.vue';
// import Nav from '@v/Nav.vue';

// names
const FULL_PAGES = ['Writer', 'Home'];
export default defineComponent({
	name: 'App',
	components: {
		TopBar,
		// Nav,
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
            &:hover {
                overflow-y: auto;
            }
        }
    }
}
</style>
