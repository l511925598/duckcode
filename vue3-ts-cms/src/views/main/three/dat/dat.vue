<template>
	<div ref="threeRef"></div>
</template>

<script setup lang="ts">
import {
	AxesHelper,
	BoxGeometry, Color,
	Mesh,
	MeshLambertMaterial,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	SpotLight, WebGLRenderer ,PerspectiveCamera
} from "three";
import {onMounted, ref} from "vue";
import * as dat from 'dat.gui';

const threeRef = ref<HTMLDivElement>()
function init(){
	const scene = new Scene(); // 创建场景

	const axes = new AxesHelper(10); // 创建坐标轴
	scene.add(axes) // 坐标轴添加到场景中

	const spotlight = new SpotLight(0xffffff); //创建聚光灯
	spotlight.position.set(-40,60,10) // 设置聚光灯的位置
	spotlight.castShadow = true; //打开灯光
	spotlight.shadow.mapSize.width = 2048;	//设置阴影分辨率
	spotlight.shadow.mapSize.height = 2048;
	scene.add(spotlight) // 聚光灯添加到场景中

	const planeGeometry = new PlaneGeometry(50,50) // 创建一个平面 宽高 50   planeGeometry-平面几何图形
	const planeMaterial = new MeshLambertMaterial() // 创建平面的材质 Material-材质
	const plane = new Mesh(planeGeometry,planeMaterial) // 使用他的图像和材质生产一个真实平面
	plane.position.set(0,0,0)// 设置平面位置
	plane.rotation.x = -0.5 * Math.PI;// 设置平面旋转角度
	plane.receiveShadow = true; //平面反射光
	scene.add(plane) // 添加平面到场景中

	const geometry = new BoxGeometry( 4, 4, 4 );	//创建几何体 三维都是 4
	const material = new MeshLambertMaterial( {color: 0x808080});// 创建材质和颜色
	const cube = new Mesh( geometry, material );// 使用他的图像和材质生产一个真实正方形
	cube.position.set(5,10,3); //设置cube位置
	cube.castShadow = true // 投射阴影打开
	scene.add( cube );

	const sphereGeometry = new SphereGeometry(4,20,20);
	const sphereMaterial = new  MeshLambertMaterial({color:0x7777ff})
	const sphere = new Mesh(sphereGeometry,sphereMaterial)
	sphere.castShadow = true // 投射阴影打开
	sphere.position.set(-10,5,0)
	scene.add(sphere)

	const renderer = new WebGLRenderer(); //创建一个渲染器
	renderer.setClearColor(new Color(0xEEEEEE)); // 设置颜色及其透明度
	renderer.setSize(window.innerWidth - 210 ,window.innerHeight - 60); // 设置渲染大小也就是你想渲染的视图大小
	renderer.shadowMap.enabled = true //  启用Three.js渲染器的阴影映射功能

	// 创建镜头🎥
	const camera = new PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1/1000);
	camera.position.set(-30,40, 30) // 设置相机的位置
	camera.lookAt(scene.position)// 设置相机（camera）的观察目标为场景（scene）的位置。

	//获取元素渲染
	threeRef.value?.appendChild(renderer.domElement) // 渲染器（renderer）的 DOM 元素添加到页面中。

	const controls = {
		rotationSpeed:0.002,
		addCube:function (){
			const geometry = new BoxGeometry( 4, 4, 4 );	//创建几何体 三维都是 4
			const material = new MeshLambertMaterial( {color: 0x808080});// 创建材质和颜色
			const cube = new Mesh( geometry, material );// 使用他的图像和材质生产一个真实正方形
			// 随机生成坐标
			const x = Math.random() * 50; // x 坐标在 0 到 10 之间的随机数
			const y = Math.random() * 20; // y 坐标在 0 到 10 之间的随机数
			const z = Math.random() * 50; // z 坐标在 0 到 10 之间的随机数

			cube.position.set(x, y, z); // 设置 cube 的位置
			cube.castShadow = true // 投射阴影打开
			scene.add( cube );
		}
	}
	const gui = new dat.GUI()
	gui.add(controls,'rotationSpeed',0,0.1)
	gui.add(controls,'addCube')
	function renderScene(){ //渲染屏幕
		//立方体运动轨迹
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02;
		cube.rotation.z += 0.02;

		scene.traverse(e => {
			if (e instanceof Mesh && e != plane){
				e.position.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed
			}
		})

		//渲染方法不懂就去  https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
		renderer.render(scene,camera)
		requestAnimationFrame(renderScene)
	}
	renderScene()
}

onMounted(()=> {
	clear()
	init()
})

// 清楚dai.gui
function clear(){
	const  dg = document.querySelector(".dg");
	if (dg){
		dg.innerHTML = '';
	}
}
</script>

<style scoped lang="less">

</style>
