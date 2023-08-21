<template>
<!--	NO.1-->
	<div ref="threeRef">
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as THREE from 'three';

const threeRef = ref()

function init(){
	// 创建场景🎬
	const scene = new THREE.Scene();

	// 创建坐标系
	const axes = new THREE.AxesHelper(20);
	scene.add(axes)

	// 创建平面
	const planeGeometry = new THREE.PlaneGeometry(60,20)
	const planeMaterial = new  THREE.MeshBasicMaterial({color:0xcccccc});
	const plane = new THREE.Mesh(planeGeometry,planeMaterial)
	plane.rotation.x = -0.5 * Math.PI;
	plane.rotation.y = 0;
	plane.rotation.z = 0;
	scene.add(plane)

	//创建几何体
	const geometry = new THREE.BoxGeometry( 4, 4, 4 );
	const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true});
	const cube = new THREE.Mesh( geometry, material );
	cube.position.x = 20;
	cube.position.y = 10;
	cube.position.z = 3;
	scene.add( cube );

	//创建圆球
	const sphereGeometry = new THREE.SphereGeometry(4,20,20);
	const sphereMaterial = new  THREE.MeshBasicMaterial({color:0x7777ff , wireframe:true})
	const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
	// sphere.position.x = -20
	// sphere.position.y = 10
	// sphere.position.z = 0
	sphere.position.set(-20,10,0)
	scene.add(sphere)

  // 创建渲染器
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xEEEEEE));
	renderer.setSize(window.innerWidth - 210 ,window.innerHeight - 60)

  // 创建镜头🎥
	const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1/1000);
	camera.position.x = -30
	camera.position.y = 40
	camera.position.z = 30
	camera.lookAt(scene.position)

	//获取元素渲染
	threeRef.value.appendChild(renderer.domElement)
	renderer.render(scene,camera)
}

onMounted(()=> {
	init()
})
</script>

<style scoped lang="less">
/* 样式可以根据需要进行添加 */
</style>
