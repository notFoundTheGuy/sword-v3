<template>
	<header>
		<div>
			<div class="logo-wrap" @click="$router.push('/')">
				<img src="@/assets/imgs/logo.png" alt="π" />
			</div>
			<ul>
				<li
					v-for="(item, index) in navList"
					:class="{ active: $route.path.indexOf(item.link) > -1 }"
					@click="onTabClick(item)"
					:key="index"
				>
					<Icon :name="item.icon" />
					{{ item.name }}
				</li>
			</ul>
		</div>

		<div>
			user
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TopBar',
	props: {
		theme: {
			type: String,
			default: 'fill',
		},
		showSearch: {
			type: [String, Boolean],
			default: true,
		},
	},
	computed: {
		isBlog(): boolean {
			return this.$route.name === 'Blog';
		},
		isComponents(): boolean {
			return this.$route.name === 'Components';
		},
	},
	data() {
		return {
			navList: [
				{
					name: '博客',
					link: '/blog',
					icon: 'book',
				},
				{
					name: '实验室',
					link: '/lab',
					icon: 'box',
				},
				{
					name: '组件库',
					link: 'http://li.usts.top',
					icon: 'catalog',
				},
				{
					name: '关于',
					link: '/about',
					icon: 'share',
				},
			],
		};
	},
	methods: {
		onTabClick(item: any) {
			if (!item.link || item.link == this.$route.path) return;
            if (item.link.indexOf('http') > -1) {
                window.open(item.link);
            } else {
                this.$router.push(item.link);
            }
			
		},
	},
});
</script>

<style scoped lang="less">
header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: @header-height;
	width: 100%;
	z-index: 5;
    border-bottom: 1px solid @color-border;

	> div {
		display: flex;
		height: 100%;
		.logo-wrap {
			.flex-center();
			width: @side-menu-width;
			cursor: pointer;
			> img {
				width: 140px;
			}
		}
		ul {
			display: flex;
			li {
				.flex-center();
				margin: 0 40px;
				width: 120px;
				height: 100%;
				border-bottom: 2px solid transparent;
				color: @color-menu;
				cursor: pointer;
				&.active {
					border-bottom-color: @color-primary;
					color: @color-menu-active;
				}

				.sword-icon {
					margin-right: 14px;
				}
			}
		}
		.search-box {
			font-size: 16px;
			input {
				margin-right: 50px;
				width: 250px;
				border-radius: 100px;
				outline: none;
				border: 1px solid #fff;
				height: 35px;
				line-height: 35px;
				background: none;
				color: #fff;
				padding-left: 20px;
				&::placeholder {
					color: #eee;
				}
			}
		}
	}
	// 透明主题
	&.glass {
		background: none;
		color: @topicColor;
		> div > ul > li {
			color: @topicColor;
			&.active {
				color: @topicColor;
				border-bottom-color: @topicColor;
			}
		}
	}
}
</style>
