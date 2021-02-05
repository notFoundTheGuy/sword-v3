<template>
	<ul>
		<li v-for="(item, index) in menu" :key="index">
			{{ item.name }}
			<ul v-if="item.children">
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
            default: []
        }
    },
	data() {
		return {};
	},
});
</script>

<style lang="less" scoped>
li ul {
    padding-left: 15px;
}
</style>
