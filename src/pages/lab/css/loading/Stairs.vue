<template>
	<div class="loader-stairs">
		<div class="loader-bar"></div>
		<div class="loader-bar"></div>
		<div class="loader-bar"></div>
		<div class="loader-bar"></div>
		<div class="loader-bar"></div>
		<div class="loader-ball"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Stairs',
});
</script>

<style lang="less" scoped>
@bar-color: rgba(255, 255, 255, 0.35);
@ball-color: rgba(255, 255, 255, 0.5);

.loader-stairs {
	position: relative;
	width: 75px;
	height: 100px;
    transform: scale(0.8);

	.loader-bar {
		position: absolute;
		bottom: 0;
		width: 10px;
		height: 50%;
		background: @bar-color;
		transform-origin: center bottom;
		box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);

		.Loop(@index) when(@index<6) {
			&:nth-child(@{index}) {
				left: (@index - 1) * 15px;
				transform: scale(1, @index*.2);
				animation-duration: 4s;
				animation-iteration-count: infinite;
				// 考虑把animation-name: 放入循环中
			}

			.Loop(@index+1);
		}

		.Loop(1);

		&:nth-child(1) {
			animation-name: barUp1;
		}
		&:nth-child(2) {
			animation-name: barUp2;
		}
		&:nth-child(3) {
			animation-name: barUp3;
		}
		&:nth-child(4) {
			animation-name: barUp4;
		}
		&:nth-child(5) {
			animation-name: barUp5;
		}
	}

	.loader-ball {
		position: absolute;
		bottom: 10px;
		left: 0;
		width: 10px;
		height: 10px;
		background: @ball-color;
		border-radius: 50%;
		animation: ball 4s infinite;
	}
}

@keyframes ball {
	0% {
		transform: translate(0, 0);
	}
	5% {
		transform: translate(8px, -14px);
	}
	10% {
		transform: translate(15px, -10px);
	}
	17% {
		transform: translate(23px, -24px);
	}
	20% {
		transform: translate(30px, -20px);
	}
	27% {
		transform: translate(38px, -34px);
	}
	30% {
		transform: translate(45px, -30px);
	}
	37% {
		transform: translate(53px, -44px);
	}
	40% {
		transform: translate(60px, -40px);
	}
	50% {
		transform: translate(60px, 0);
	}
	57% {
		transform: translate(53px, -14px);
	}
	60% {
		transform: translate(45px, -10px);
	}
	67% {
		transform: translate(37px, -24px);
	}
	70% {
		transform: translate(30px, -20px);
	}
	77% {
		transform: translate(22px, -34px);
	}
	80% {
		transform: translate(15px, -30px);
	}
	87% {
		transform: translate(7px, -44px);
	}
	90% {
		transform: translate(0, -40px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes barUp1 {
	0% {
		transform: scale(1, 0.2);
	}
	40% {
		transform: scale(1, 0.2);
	}
	50% {
		transform: scale(1, 1);
	}
	90% {
		transform: scale(1, 1);
	}
	100% {
		transform: scale(1, 0.2);
	}
}
@keyframes barUp2 {
	0% {
		transform: scale(1, 0.4);
	}
	40% {
		transform: scale(1, 0.4);
	}
	50% {
		transform: scale(1, 0.8);
	}
	90% {
		transform: scale(1, 0.8);
	}
	100% {
		transform: scale(1, 0.4);
	}
}
@keyframes barUp3 {
	0% {
		transform: scale(1, 0.6);
	}
	100% {
		transform: scale(1, 0.6);
	}
}
@keyframes barUp4 {
	0% {
		transform: scale(1, 0.8);
	}
	40% {
		transform: scale(1, 0.8);
	}
	50% {
		transform: scale(1, 0.4);
	}
	90% {
		transform: scale(1, 0.4);
	}
	100% {
		transform: scale(1, 0.8);
	}
}
@keyframes barUp5 {
	0% {
		transform: scale(1, 1);
	}
	40% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1, 0.2);
	}
	90% {
		transform: scale(1, 0.2);
	}
	100% {
		transform: scale(1, 1);
	}
}
</style>
