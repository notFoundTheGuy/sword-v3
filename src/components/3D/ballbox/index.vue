<template>
    <div id="ballbox3D" class="ballbox">

    </div>
</template>

<script>
import * as THREE from '../three.module.js';

// import Stats from './states.module';

import { OrbitControls } from './OrbitControls';

let camera, scene, renderer, stats;
let pointLight, pointLight2;

function init() {
    let domEl = document.querySelector('#ballbox3D');
	camera = new THREE.PerspectiveCamera(60, 0.98, 2, 1000);
	camera.position.set(45, 10, 45);

	scene = new THREE.Scene();
    // 盒子周围颜色
	scene.add(new THREE.AmbientLight(0x1f2128));

	// lights
	function createLight(color) {
        // 光照亮度
		const intensity = 1.5;

		const light = new THREE.PointLight(color, intensity, 20);
		light.castShadow = true;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 60;
		light.shadow.bias = -0.005; // reduces self-shadowing on double-sided objects

		let geometry = new THREE.SphereGeometry(0.3, 12, 6);
		let material = new THREE.MeshBasicMaterial({ color: color });
		material.color.multiplyScalar(intensity);
		let sphere = new THREE.Mesh(geometry, material);
		light.add(sphere);

		const texture = new THREE.CanvasTexture(generateTexture());
		texture.magFilter = THREE.NearestFilter;
		texture.wrapT = THREE.RepeatWrapping;
		texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set(1, 4.5);

		geometry = new THREE.SphereGeometry(2, 32, 8);
		material = new THREE.MeshPhongMaterial({
			side: THREE.DoubleSide,
			alphaMap: texture,
			alphaTest: 0.5,
		});

		sphere = new THREE.Mesh(geometry, material);
		sphere.castShadow = true;
		sphere.receiveShadow = true;
		light.add(sphere);

		// custom distance material
		const distanceMaterial = new THREE.MeshDistanceMaterial({
			alphaMap: material.alphaMap,
			alphaTest: material.alphaTest,
		});
		sphere.customDistanceMaterial = distanceMaterial;

		return light;
	}

    // 两个灯的色值
	pointLight = createLight(0x0088ff);
	scene.add(pointLight);

	pointLight2 = createLight(0xff8888);
	scene.add(pointLight2);
	//

	const geometry = new THREE.BoxGeometry(30, 30, 30);

	const material = new THREE.MeshPhongMaterial({
		color: 0xa0adaf,
		shininess: 10,
		specular: 0x111111,
		side: THREE.BackSide,
	});

	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.y = 10;
	mesh.receiveShadow = true;
	scene.add(mesh);

    // alpha 设置透明
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(domEl.getBoundingClientRect().width, domEl.getBoundingClientRect().height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
    // 背景色
    // renderer.setClearColor(0x1f2128, 1);
	domEl.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 10, 0);
	controls.update();
    controls.enableZoom = false;

	// stats = new Stats();
	// document.querySelector('#ballbox3D').appendChild(stats.dom);

	//

	// window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function generateTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 2;
	canvas.height = 2;

	const context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.fillRect(0, 1, 2, 1);

	return canvas;
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	let time = performance.now() * 0.001;

	pointLight.position.x = Math.sin(time * 0.6) * 9;
	pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
	pointLight.position.z = Math.sin(time * 0.8) * 9;

	pointLight.rotation.x = time;
	pointLight.rotation.z = time;

	time += 10000;

	pointLight2.position.x = Math.sin(time * 0.6) * 9;
	pointLight2.position.y = Math.sin(time * 0.7) * 9 + 6;
	pointLight2.position.z = Math.sin(time * 0.8) * 9;

	pointLight2.rotation.x = time;
	pointLight2.rotation.z = time;

	renderer.render(scene, camera);

	// stats.update();
}

import { defineComponent } from 'vue';

export default defineComponent({
	name: '3DBalls',
	methods: {},
	mounted() {
		init();
		animate();
	},
});
</script>

<style scoped lang="less">
.ballbox {
    width: 100%;
    height: 100%;
}
</style>
