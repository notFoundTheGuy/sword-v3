<template>
	<div class="add-input">
		<Icon name="plus"></Icon>
		<input type="text" v-model="value" @keydown.enter="onValueSubmit" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'AddInput',
	data() {
		return {
			value: '',
		};
	},
	methods: {
		onValueSubmit() {
			if (this.value) {
				this.$emit('submit', this.value);
				this.value = '';
			}
		},
	},
});
</script>

<style lang="less" scoped>
.add-input {
	display: flex;
	width: 100%;

    input {
        background: none;
        border: 1px solid #fff;
        outline: none;
    }

}
</style>
