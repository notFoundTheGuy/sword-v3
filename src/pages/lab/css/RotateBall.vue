<template>
	<div class="rotate-ball">
		<div class="circle circle1">
			<div class="side front">
				<div class="inner"></div>
			</div>
			<div class="side back">
				<div class="inner"></div>
			</div>
			<div class="side left">
				<div class="inner"></div>
			</div>
			<div class="side right">
				<div class="inner"></div>
			</div>
			<div class="side top">
				<div class="inner"></div>
			</div>
			<div class="side bottom">
				<div class="inner"></div>
			</div>
		</div>
		<div class="circle circle2">
			<div class="side front">
				<div class="inner"></div>
			</div>
			<div class="side back">
				<div class="inner"></div>
			</div>
			<div class="side left">
				<div class="inner"></div>
			</div>
			<div class="side right">
				<div class="inner"></div>
			</div>
			<div class="side top">
				<div class="inner"></div>
			</div>
			<div class="side bottom">
				<div class="inner"></div>
			</div>
		</div>
		<div class="circle circle3">
			<div class="side front">
				<div class="inner"></div>
			</div>
			<div class="side back">
				<div class="inner"></div>
			</div>
			<div class="side left">
				<div class="inner"></div>
			</div>
			<div class="side right">
				<div class="inner"></div>
			</div>
			<div class="side top">
				<div class="inner"></div>
			</div>
			<div class="side bottom">
				<div class="inner"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'RotateBall',
});
</script>

<style lang="less" scoped>
.rotate-ball {
	width: 10em;
	height: 10em;
	@keyframes animation1 {
		100% {
			transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg);
		}
	}
	animation: animation1 15s infinite linear;
	transform-style: preserve-3d;
	.circle {
		width: 10em;
		height: 10em;
		position: absolute;
		transform-style: preserve-3d;
		perspective: 400em;
		&2 {
			transform: rotateX(45deg) rotateY(45deg);
		}
		&3 {
			transform: rotateX(45deg) rotateZ(45deg);
		}
		.side {
			width: 100%;
			height: 100%;
			position: absolute;
			border-radius: 50%;
			box-sizing: border-box;
			border: 1px dotted #ffd50059;
			transform-style: preserve-3d;
			perspective: 400em;
			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				border: 1px solid;
				border-radius: inherit;
			}
			&::before {
				width: 2.5em;
				height: 2.5em;
				color: gold;
				box-shadow: inset 0 0 2em, 0 0 2em;
			}
			&::after {
				width: 1.5em;
				height: 1.5em;
				color: teal;
				box-shadow: inset 0 0 1em, 0 0 1em;
				transform: translateZ(-2em);
			}
			&.front {
				transform: translateZ(5em);
			}
			&.back {
				transform: translateZ(-5em) rotateY(180deg);
			}
			&.left {
				transform: translateX(-5em) rotateY(-90deg);
			}
			&.right {
				transform: translateX(5em) rotateY(90deg);
			}
			&.top {
				transform: translateY(-5em) rotateX(90deg);
			}
			&.bottom {
				transform: translateY(5em) rotateX(-90deg);
			}
			.inner {
				width: 50%;
				height: 50%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				border-radius: inherit;
				color: orangered;
				box-shadow: inset 0 0 2em;
				transform: translateZ(2em);
				transform-style: preserve-3d;
				perspective: 400em;
				&::before,
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					border: 1px solid;
					border-radius: inherit;
					box-shadow: inset 0 0 2em, 0 0 2em;
				}
				&::before {
					width: 2.5em;
					height: 2.5em;
					color: crimson;
					transform: translateZ(2em);
				}
				&::after {
					width: 1.5em;
					height: 1.5em;
					color: purple;
					transform: translateZ(4em);
				}
			}
		}
	}
}
</style>
