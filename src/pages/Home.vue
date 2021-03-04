<template>
	<div class="home">
		home
        <BallBox />
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
