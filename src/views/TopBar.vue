<template>
	<header>
		<div>
			<div class="logo-wrap" @click="$router.push('/')">
				<div class="animate_fadein" style="--animate-delay: 0.2s">
					<img src="@/assets/imgs/logo.png" alt="π"/>
				</div>
			</div>
			<ul class="nav-warp">
				<li
					v-for="(item, index) in navList"
					:class="{ active: $route.path.indexOf(item.link) > -1 && animateReady }"
					@click="onTabClick(item)"
					:key="index"
					class="animate_flyin_up"
					:style="`--animate-delay: ${index / 10}s`"
				>
					<Icon :name="item.icon" />
					{{ item.name }}
				</li>
			</ul>
			<div class="user-wrap animate_flyin_up" style="--animate-delay: 0.5s">
				<div>
					<img src="@/assets/imgs/avatar3.jpg" />
				</div>
				<div>
					<p>JIAN LI</p>
					<p class="sub">Programmer</p>
				</div>
				<Icon name="updown" size="14"></Icon>
			</div>
		</div>
	</header>

	<i class="border" v-if="!isNoBorder"></i>
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
        isNoBorder(): boolean {
            const NO_BORDER_ROUTES = ['About']
            // @ts-ignore
            return NO_BORDER_ROUTES.indexOf(this.$route.name) > -1;
        }
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
				// {
				// 	name: '组件库',
				// 	link: 'http://li.usts.top',
				// 	icon: 'catalog',
				// },
				{
					name: '关于',
					link: '/about',
					icon: 'share',
				},
			],
			animateReady: false,
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
	mounted() {
		setTimeout(() => {
			this.animateReady = true;
		}, 1000);
	},
});
</script>

<style scoped lang="less">
@user-width: 250px;

header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: @header-height;
	width: 100%;
	z-index: 5;

	> div {
		display: flex;
		height: 100%;
		width: 100%;
		.logo-wrap {
			.flex-center();
			width: @side-menu-width;
			cursor: pointer;
            > div {
                font-size: 0;
            }
			img {
				width: 140px;
                margin-top: 5px;
			}
		}
		ul {
			display: flex;
			flex: 1;
			padding-right: @user-width;
			li {
				.flex-center();
				margin: 0 40px;
				width: 120px;
				height: 100%;
				border-bottom: 2px solid transparent;
				color: @color-menu;
				cursor: pointer;
				transition: all 0.5s;
				&.active {
					border-bottom-color: @color-primary;
					color: @color-menu-active;
				}

				.sword-icon {
					margin-right: 14px;
				}
			}
		}
	}

	.user-wrap {
		position: fixed;
		right: 0;
		top: 0;
		width: @user-width;
		height: @header-height;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40px;
		cursor: pointer;
		> div {
			&:nth-child(1) {
				width: 40px;
				height: 40px;
				margin-right: 16px;
				border-radius: 40px;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			&:nth-child(2) {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-right: 10px;
				> p:nth-child(2) {
					font-size: 13px;
					color: #808191;
				}
			}
		}
	}
}
</style>

<style lang="less" scoped>
// 动画相关
@animation-duration: 0.6s;
.logo-wrap,
.nav-warp {
	position: relative;
	border-bottom: 1px solid transparent;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: @color-border;
		animation-timing-function: linear;
		animation-duration: @animation-duration;
		animation-fill-mode: forwards;
	}
}
.logo-wrap::after {
	animation-name: lineToLeft;
}
.nav-warp::after {
	animation-name: lineToRight;
}

.border {
	position: fixed;
	top: @header-height - 1px;
	left: @side-menu-width;
	display: block;
	width: 1px;
	background: @color-border;
	animation: lineToBottom @animation-duration linear forwards;
}

@keyframes lineToLeft {
	from {
		left: 100%;
	}
	to {
		left: 0;
	}
}
@keyframes lineToRight {
	from {
		right: 100%;
	}
	to {
		right: 0;
	}
}
@keyframes lineToBottom {
	from {
		bottom: 100%;
	}
	to {
		bottom: 0;
	}
}
</style>
