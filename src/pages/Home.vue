<template>
	<div class="home">
        home
        <BallBox class="ball-box"/>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import BallBox from '@v/3D/ballbox';

export default defineComponent({
	name: 'Home',
	components: {
        BallBox
	},
});
</script>

<style lang="less" scoped>
.home {
    .ball-box {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
    }
}
</style>
