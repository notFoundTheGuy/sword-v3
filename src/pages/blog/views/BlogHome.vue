<template>
	<div>
		<h1>最近更新</h1>

		<ul>
			<li v-for="item in latestArticles" :key="item.id" @click="onLinkClick(item)">
				<a>{{ item.title }}</a>
				<div>
					{{ item.overview }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BlogHome',
	data() {
		return {
			latestArticles: [
				{
					id: '604a1253a7fbf91fa9cfbf95',
					title: '位掩码、二进制在代码中的巧妙应用🤔',
					overview:
						'津津乐道的二进制在业务中用不到？！本文收集二进制、按位运算在实际业务常见中的一些巧妙应用实例，记录一些相关的思考，感受代码的魅力。包含一些常见的按位运算的介绍（& 交集，｜ 并集，^ 异或，～ 取反），持续更新. . . ',
				},
				{
					id: '604a13dba7fbf91fa9cfbf96',
					title: '十行代码手撸一个图片懒加载',
					overview: '简洁的代码实现一个图片懒加载，重在介绍原理',
				},
				{
					id: '604a1457a7fbf91fa9cfbf98',
					title: '原生JS 实现简单的滚屏动画方案',
					overview: '做落地页图片懒加载时候联想到的利用原生JS实现滚屏动画库的滚屏代码，记录一下以后方便使用',
				},
				{
					id: '604a187da7fbf91fa9cfbfa1',
					title: '浏览器的录制API -- MediaRecorder',
					overview:
						'MediaRecorder 是 MediaStream Recording API 提供的用来进行媒体录制的接口, 通过调用 MediaRecorder() 构造方法实例化一个MediaRecorder对象，对指定的MediaStream对象进行录制。可以结合webrtc的屏幕分享接口方便的实现浏览器录屏。（包括浏览器外内容）',
				},
				{
					id: '604a1484a7fbf91fa9cfbf99',
					title: 'this = undefined ？看完你就明白了',
					overview:
						'代码调试和debug过程中，常常会遇到一些this是undefined，按我们常规的理解思路，this指向没有会去上级作用域找，而最终会指向全局作用域中的window，本文介绍了为什么会出现this = undefined和常见的一些会出现这种情况的场景. . . ',
				},
			],
		};
	},
	setup(props, context) {
		console.log('setup');
		let onLinkClick = (item: any) => {
			context.emit('turnTo', item.id);
		};

		return {
			onLinkClick,
		};
	},
	beforeCreate() {
		console.log('beforeCreate');
	},
	created() {
		console.log('created');
	},
});
</script>

<style lang="less" scoped>
h1 {
	display: inline-block;
	padding: 0 80px @padding-s 0;
	margin-bottom: @padding-xxl;
	border-bottom: 1px solid @color-border;
}

ul {
	max-width: 1400px;
    padding-right: 200px;
	li {
		margin-bottom: @padding-xl;
		cursor: pointer;
		&:hover {
			a {
				text-decoration: underline;
			}
			text-decoration: underline;
			filter: brightness(130%);
		}
		> a {
			display: inline-block;
			font-size: @font-xxl;
			margin-bottom: @padding-xs;
		}
		> div {
			color: @color-text-secondary;
			font-size: @font-l;
		}
	}
}
</style>
