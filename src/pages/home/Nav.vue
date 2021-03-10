<template>
	<div class="home-nav">
		<div class="logo">
            <img src="@/assets/imgs/logo.png" alt="logo" width="175">
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
			<li @mouseover="$emit('hover', 'components')" @mouseout="onMouseOut" @click="$router.push('/components')">
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
            }
        }
    },
	data() {
		return {};
	},
});
</script>

<style lang="less" scoped>
.home-nav {
	position: relative;
	color: @color-menu;

	.logo {
		font-size: 32px;
		color: #fff;
		margin: 20px 80px 50px 0;
		min-width: 175px;

		.sword-icon {
			margin-right: 10px;
		}
	}

	i.border {
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
			padding: 40px 0;
			cursor: pointer;

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
