<template>
	<div class="home-nav">
		<div class="logo">
			<img src="@/assets/imgs/logo.png" alt="logo" width="175" />
		</div>
		<ul>
			<li @mouseover="$emit('hover', 'blog')" @mouseout="onMouseOut" @click="$router.push('/blog')">
				<Icon name="book" />
				博客
			</li>
			<li @mouseover="$emit('hover', 'lab')" @mouseout="onMouseOut" @click="$router.push('/lab')">
				<Icon name="box" />
				实验室
			</li>
			<li @mouseover="$emit('hover', 'components')" @mouseout="onMouseOut" @click="openUrl('http://li.usts.top')">
				<Icon name="catalog" />
				组件库
			</li>
			<li @mouseover="$emit('hover', 'about')" @mouseout="onMouseOut" @click="$router.push('/about')">
				<Icon name="share" />
				关于
			</li>
		</ul>
		<i class="border"></i>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeNav',
	setup(props, context: any) {
		return {
			onMouseOut() {
				context.emit('hover', 'home');
			},
			openUrl(url: any) {
				window.open(url);
			},
		};
	},
});
</script>

<style lang="less" scoped>
.home-nav {
	position: relative;
	color: @color-menu;
    @animate-duration: 0.4s;

	.logo {
		.animate_property();
		opacity: 0;
		animation-duration: @animate-duration;
		animation-name: flyInDown;

		font-size: 32px;
		color: #fff;
		margin: 20px 80px 50px 0;
		width: 175px;
		height: 50px;

		.sword-icon {
			margin-right: 10px;
		}
	}

	i.border {
		.animate_property();
		opacity: 0;
		animation-name: flyInUp;
        animation-duration: @animate-duration;

		position: absolute;
		right: 0;
		top: 0;
		width: 1px;
		height: 100%;
	}

	> ul {
		margin-left: 32px;
		margin-bottom: -20px;

		> li {
			.flex-center-y();
			.animate_property();
			opacity: 0;
			animation-name: flyInDown;
			animation-duration: 1s;

			padding: 40px 0;
			cursor: pointer;
			&:nth-child(2) {
				animation-delay: 0.1s;
			}
			&:nth-child(3) {
				animation-delay: 0.2s;
			}
			&:nth-child(4) {
				animation-delay: 0.3s;
			}

			.sword-icon {
				margin-right: 16px;
			}

			&:hover {
				color: @color-menu-active;
			}
		}
	}
}
</style>
