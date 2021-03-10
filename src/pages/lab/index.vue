<template>
	<div class="main-menu">
		<MenuList :menu="menu" />
	</div>

	<div class="main-content">
		特效
	</div>
	<StarSky />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuList from '@v/MenuList.vue';
import LabList from './LabList';
import StarSky from './css/StarSky.vue';

export default defineComponent({
	name: 'Lab',
	components: {
		MenuList,
		StarSky,
	},
	data() {
		return {
			menu: LabList,
		};
	},
});
</script>

<style lang="less" scoped>

</style>
