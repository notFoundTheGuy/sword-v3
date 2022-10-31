<template>
	<section class="recorder-wrap">
		<div class="header">
			<h1>自拍器🤳</h1>
			<p>todo：额。。。因为暂未申请https证书，该功能不可用</p>
			<NButton secondary type="primary" @click="onStop" v-show="isRecordering">停止录制</NButton>
			<span v-show="isRecordering" class="status-bar">录制中 . . .</span>
		</div>

		<div class="content">
			<div class="operate" v-show="!isRecordering">
				<div>
					<p v-show="isRecordered">视频已录制完成 🎉🎉🎉</p>
					<p v-show="isRecordered">
						点击<NButton strong secondary type="info" @click="onDownload">下载</NButton>
						保存到本地
					</p>
					<p>
						点击<NButton strong secondary type="info" @click="onStartRecord">开始</NButton>按钮<span v-show="isRecordered">重新</span>进行视频录制
					</p>
				</div>
			</div>
			<video v-show="isRecordering"></video>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { NButton, NH1, NText } from 'naive-ui';

// 想要获取一个最接近 1280x720 的相机分辨率
const constraints = {
	audio: true,
	video: { width: 900, height: 500 },
};

export default defineComponent({
	name: 'Lab',
	components: {
		NButton,
		NH1,
		NText,
	},
	setup(props, context) {
		let recordedChunks = ref<any[]>([]);
		let mediaRecorder = ref<any>();
		let isRecordering = ref<boolean>(false);

		const isRecordered = computed(
			() => !isRecordering.value && recordedChunks.value.length
		);

		const handleDataAvailable = (event: { data: { size: number } }) => {
			console.log('data-available');
			if (event.data.size > 0) {
				recordedChunks.value.push(event.data);
				console.log(recordedChunks);
				// download();
			} else {
				// ...
			}
		};

		const startRecord = (stream: MediaStream) => {
			isRecordering.value = true;
			const options = { mimeType: 'video/webm; codecs=vp9' };
			// @ts-ignore
			mediaRecorder.value = new MediaRecorder(stream, options);

			mediaRecorder.value.ondataavailable = handleDataAvailable;
			mediaRecorder.value.start();
		};

		const onDownload = () => {
			var blob = new Blob(recordedChunks.value, {
				type: 'video/webm',
			});
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			document.body.appendChild(a);
			// a.style = 'display: none';
			a.href = url;
			a.download = 'selfie.mp4';
			a.click();
			window.URL.revokeObjectURL(url);
		};

		const onStartRecord = () => {
			try {
				navigator.mediaDevices
				.getUserMedia(constraints)
				.then(function(mediaStream) {
					isRecordering.value = true;
					recordedChunks.value = [];
					const video: HTMLVideoElement | null = document.querySelector(
						'video'
					);
					if (video) {
						video.srcObject = mediaStream;
						video.onloadedmetadata = function(e) {
							video.play();
						};

						startRecord(mediaStream);
					}
				})
				.catch(function(err) {
					console.log(err.name + ': ' + err.message);
				}); // 总是在最后检查错误
			} catch (error) {
				alert('快去申请证书！')
			}
		};

		const onStop = () => {
			isRecordering.value = false;
			// 调用stop会停止并会触发ondataavailable
			mediaRecorder.value.stop();
		};

		return {
			isRecordering,
			isRecordered,
			onStop,
			onDownload,
			onStartRecord,
		};
	},
});
</script>

<style lang="less" scoped>
.recorder-wrap {
	position: relative;
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		> h1 {
			margin-right: 20px;
		}
		> button {
			margin-right: 10px;
		}
	}

	.content {
		> .operate {
			width: 900px;
			height: 300px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			> div {
				width: 300px;
				p {
					line-height: 45px;
				}
				button {
					margin: 0 15px;
				}
			}
		}
	}
}

.status-bar {
	animation: blink 2s infinite;
	color: #e88080;
}
@keyframes blink {
	0% {
		opacity: 0.2;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.2;
	}
}
</style>
