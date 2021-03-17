<template>
	<section>
		<StarSky />
		<div class="main-menu">
			<a-menu mode="inline" style="width: 100%" @select="onMenuSelect">
				<a-sub-menu v-for="(item, index) in menu">
					<template #title>
						{{ item.name }}
					</template>

					<a-menu-item v-for="(subItem, subIndex) in item.children">
						{{ subItem.name }}
					</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</div>

		<div class="main-content">
			😄
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import LabList from './LabList';
import StarSky from './css/StarSky.vue';

export default defineComponent({
	name: 'Lab',
	setup(props, context) {
		let menu = ref();

		const onMenuSelect = (item: any) => {
			console.log(item);
		};

		onMounted(() => {
			menu.value = LabList;
		});

		return {
			menu,
			onMenuSelect,
		};
	},
	components: {
		StarSky,
	},
});
</script>

<style lang="less" scoped></style>
