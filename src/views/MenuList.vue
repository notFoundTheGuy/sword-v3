<template>
	<ul class="menu-wrap">
		<li
			class="ellipsis"
			v-for="(item, index) in menu"
			:key="index"
			@mouseenter="onMouseEnter"
			@mouseleave="onMouseLeave"
		>
			<Icon name="del" @click="onDel(item)"></Icon>
			<span>{{ item.name }}</span>
			<Icon name="arrow-right" size="12"></Icon>

			<ul v-if="item.children" class="child-menu">
				<li v-for="(_item, _index) in item.children" :key="index + '-' + _index">
					{{ _item.name }}
				</li>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'name',
	props: {
		menu: {
			type: Array,
			default: [],
		},
	},
	methods: {
		onMouseEnter($event: any) {
			$event.stopPropagation();
			let childEl = $event.target.querySelector('.child-menu');
			if (childEl) {
				childEl.classList.remove('hide');
				childEl.classList.add('active');
			}
		},
		onMouseLeave($event: any) {
			$event.stopPropagation();
			let childEl = $event.target.querySelector('.child-menu');
			if (childEl) {
				childEl.classList.remove('active');
				childEl.classList.add('hide');
			}
		},
		onDel(item: any) {
			console.log(item);
			this.$emit('delete', item);
		},
	},
});
</script>

<style lang="less" scoped>
.menu-wrap {
	width: 160px;
	padding: 15px 0px;
	font-size: @font-l;
	> li {
		position: relative;
		padding: 0 20px;
		line-height: 40px;
		height: 40px;
		cursor: pointer;
		border-radius: 3px;
		.ellipsis();

		> span:hover,
		svg.icon-del:hover {
			color: @topicColor;
		}

		> svg.icon-del {
			position: absolute;
			top: 50%;
			left: 0px;
			transform: translateY(-50%);
		}

		> svg.icon-arrow-right {
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
		}

		> svg.icon-arrow-right {
			color: @color-grey;
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
		}

		.child-menu {
			position: absolute;
			top: 0;
			min-width: 160px;
			min-height: 300px;
			background: #fff;
			box-shadow: @shadow;
			color: @text-color;
			padding: 10px;
			visibility: hidden;
			&.active {
				animation: childFadeIn 0.35s forwards;
				visibility: visible;
			}

			&.hide {
				animation: childFadeOut 0.35s forwards;
				visibility: visible;
			}

			> li {
				white-space: nowrap;
				padding: 0 10px;
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				border-radius: 3px;
				&:hover {
					background: @btnLinear;
					color: #fff;
				}
			}
		}
	}
}

@keyframes childFadeIn {
	0% {
		// display: block;
		visibility: visible;
		opacity: 0;
	}
	5% {
		opacity: 0;
		left: 90%;
	}
	100% {
		opacity: 1;
		left: 100%;
	}
}

@keyframes childFadeOut {
	0% {
		opacity: 1;
		left: 100%;
	}
	95% {
		opacity: 0;
		left: 90%;
		visibility: hidden;
	}
	100% {
		visibility: hidden;
	}
}
</style>
