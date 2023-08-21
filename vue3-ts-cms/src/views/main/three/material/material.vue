<template>
	<!--	NO.2-->
	<div ref="statesRef"></div>
	<div ref="threeRef">
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref, } from "vue";
import {AxesHelper,
	Scene ,
	PlaneGeometry ,
	MeshLambertMaterial ,
	BoxGeometry,
	Mesh,
	SphereGeometry ,
	WebGLRenderer ,
	Color ,
	SpotLight
} from "three";
import * as THREE from "three";
import States from 'stats.js'

const threeRef = ref<HTMLDivElement>()
const statesRef = ref<HTMLDivElement>()
const statRef = ref<States>()
function initState(){
	statRef.value = new States();
	statRef.value.showPanel(0);
	if (statesRef.value){
		statesRef.value?.appendChild(statRef.value.dom)
	}
}
function init(){
	initState()
	// 创建场景🎬
	const scene = new Scene();

	// 创建坐标系
	const axes = new AxesHelper(20)
	scene.add(axes)

	// 创建灯光
	const spotLight = new SpotLight(0xffffff);
	spotLight.position.set(-40,60,10)
	spotLight.castShadow = true;
	scene.add(spotLight)

	// 创建平面
	const planeGeometry = new PlaneGeometry(60,20)
	const planeMaterial = new  MeshLambertMaterial({color:0xcccccc});
	const plane = new Mesh(planeGeometry,planeMaterial)
	plane.position.set(0,0,0)
	plane.rotation.x = -0.5 * Math.PI;
	plane.receiveShadow = true;
	scene.add(plane)

	//创建几何体
	const geometry = new BoxGeometry( 4, 4, 4 );
	const material = new MeshLambertMaterial( {color: 0xffa500});
	const cube = new Mesh( geometry, material );
	cube.castShadow = true
	cube.position.set(5,10,3)
	scene.add( cube );

	//创建圆球
	const sphereGeometry = new SphereGeometry(4,20,20);
	const sphereMaterial = new  MeshLambertMaterial({color:0x7777ff})
	const sphere = new Mesh(sphereGeometry,sphereMaterial)
	sphere.castShadow = true
	sphere.position.set(-10,5,0)
	scene.add(sphere)

	// 创建渲染器
	const renderer = new WebGLRenderer();
	renderer.setClearColor(new Color(0xEEEEEE));
	renderer.setSize(window.innerWidth - 210 ,window.innerHeight - 60);
	renderer.shadowMap.enabled = true

	// 创建镜头🎥
	const camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1/1000);
	camera.position.set(-30,40, 30)
	camera.lookAt(scene.position)

	//获取元素渲染
	threeRef.value?.appendChild(renderer.domElement)

	var step = 0;
	function renderScene(){
		//监听性能
		statRef.value?.begin()

		//立方体运动轨迹
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02;
		cube.rotation.z += 0.02;

		//圆球运动轨迹
		step += 0.03;
		sphere.position.x = -15 + 10 * Math.cos(step);
		sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

		statRef.value?.end()

		//渲染方法不懂就去  https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
		renderer.render(scene,camera)
		requestAnimationFrame(renderScene)
	}
	renderScene()
}

onMounted(() => {
	 init()
})
</script>

<style scoped lang="less">

</style>
