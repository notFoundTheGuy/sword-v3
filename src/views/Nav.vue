<template>
	<div class="nav">
		<ul>
			<li @click="$router.push('/')">
				<p>Home</p>
			</li>
			<li @click="$router.push('/blog')">
				博客
				<p class="sub">blog</p>
			</li>
			<li @click="$router.push('/lab')">
				实验室
				<p class="sub">𝝅・lab</p>
			</li>
			<li @click="$router.push('/')">
				组件库
				<p class="sub">library</p>
			</li>
			<li @click="$router.push('/')">
				<p>About</p>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Nav',
	data() {
		return {};
	},
});
</script>

<style lang="less" scoped>
.nav {
	ul {
		border-right: 1px solid @color-pink;
		text-align: right;
		padding-bottom: 70px;
		padding-right: 40px;
		li {
			font-size: 18px;
			padding: 10px 0;
			cursor: pointer;
			letter-spacing: 4px;
            width: 100px;
            transition: all 0.4s ease;
            transform-origin: 100% 50%;
            &:first-child {
                padding-top: 0;
            }
			p {
				font-size: 14px;
                letter-spacing: 0;

				&.sub {
					color: rgba(255, 255, 255, 0.35);
				}
			}

            &:hover {
                transform: scale(1.15) translateX(-7px);
            }
		}
	}
}
</style>
