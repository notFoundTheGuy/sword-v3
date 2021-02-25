<template>
	<header>
		<div>
			<div class="logo-wrap" @click="$router.push('/home')">
				<!-- <img v-if="theme == 'glass'" src="@/assets/logo-fill.png" alt="π" />
				<img v-else src="@/assets/logo-white.png" alt="π" /> -->
			</div>
			<ul>
				<li
					v-for="(item, index) in navList"
					:class="{ active: $route.path.indexOf(item.link) > -1 }"
					@click="onTabClick(item)"
					:key="index"
				>
					{{ item.name }}
				</li>
			</ul>

            <div>
                <div class="search-box" v-show="showSearch" v-if="isComponents">
                    <input type="text" placeholder="请输入组件名称" maxlength="20" />
                </div>

                <div v-if="isBlog">
                    <button class="ghost large" @click="$router.push('/writer')">写文章</button>
                </div>
            </div>
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
					name: '首页',
					link: '/home',
				},
				{
					name: 'blog',
					link: '/blog',
				},
				// {
				//     name: "About",
				//     link: "/main"
				// }
			],
		};
	},
	methods: {
		onTabClick(item: any) {
			if (!item.link || item.link == this.$route.path) return;
			this.$router.push(item.link);
		},
	},
});
</script>

<style scoped lang="less">
header {
	height: @headerHeight;
	width: 100%;
	color: #fff;
	background: @topicColor;
	background-image: @btnLinear;
	font-size: 1.25rem;
	position: relative;
	z-index: 5;
	> div {
		margin: auto;
		width: @mainWidth;
		min-width: @minMainWidth;
		display: flex;
		align-items: center;
		.logo-wrap {
			width: @menuWidth;
			padding: 0 @padding-m;
			margin-right: @padding-m;
			font-size: 0;
			cursor: pointer;
			img {
				width: 65%;
			}
		}
		ul {
			flex: 1;
			display: flex;
			li {
				margin: 0 40px 0 @padding-l;
				height: @headerHeight;
				line-height: @headerHeight;
				cursor: pointer;
				color: #eeeeee;
				user-select: none;
				border-bottom: 4px solid transparent;
				&.active {
					border-bottom-color: #fff;
					color: #fff;
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
