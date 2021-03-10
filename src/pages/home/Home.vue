<template>
	<StarSky />
	<div class="home-wrap">
		<section>
			<Nav @hover="onNavHover" />

			<div class="card-wrap">
				<p>Hei Buddy,</p>
				<p>Welcome back 👋</p>
				<div :class="{ invisible: curNav !== 'home' }">
					<p>试试惯性过弯</p>
					<div class="ball-wrap">
						<RotateBall />
					</div>
					<!-- <BallBox class="ball-box" /> -->
				</div>
				<div :class="{ invisible: curNav !== 'blog' }">
					<p>平时写写</p>
					<img src="@/assets/imgs/colorful-ball.png" ondragstart="return false;"/>
				</div>
				<div :class="{ invisible: curNav !== 'lab' }">
					<p>随便试试</p>
					<img src="@/assets/imgs/triangle.png" ondragstart="return false;"/>
				</div>
				<div :class="{ invisible: curNav !== 'components' }">
					<p>将就用用</p>
					<img src="@/assets/imgs/orange-ball.png" ondragstart="return false;"/>
				</div>
				<div :class="{ invisible: curNav !== 'about' }">
					<p>介绍一下</p>
					<img src="@/assets/imgs/wind.png" ondragstart="return false;"/>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// import BallBox from '@c/3D/ballbox';
import Nav from './Nav.vue';
import RotateBall from '../lab/css/RotateBall';
import StarSky from '../lab/css/StarSky';

export default defineComponent({
	name: 'Home',
	setup() {
		let curNav = ref('home');

		let onNavHover = (nav) => {
			curNav.value = nav;
		};

		return {
			curNav,
			onNavHover,
		};
	},
	components: {
		// BallBox,
		RotateBall,
		Nav,
		StarSky,
	},
});
</script>

<style lang="less" scoped>
.home-wrap {
	background: @color-bg;
	user-select: none;
	> section {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		// align-items: center;
		justify-content: center;

		.card-wrap {
			position: relative;
			margin-left: 120px;
			width: 450px;
			color: @color-text;

			p {
				line-height: 1.5;
			}

			> p {
				&:nth-child(1) {
					font-size: 24px;
				}
				&:nth-child(2) {
					font-size: 48px;
					font-weight: bold;
				}
			}

			> div {
				position: absolute;
				top: 108px;
				left: 0;
				width: 100%;
				opacity: 1;
				transition: all 0.3s;
				&.invisible {
					opacity: 0;
				}

				> p {
					font-size: 32px;
					margin-bottom: 45px;
				}

				@img-width: 350px;
				> img {
					width: @img-width;
				}
				.ball-wrap {
					position: absolute;
					top: 180px;
					left: 80px;
				}
				.ball-box {
					width: 550px;
					height: 550px;
					position: absolute;
					top: -15px;
					left: -95px;
				}
			}
		}
	}
}
</style>
