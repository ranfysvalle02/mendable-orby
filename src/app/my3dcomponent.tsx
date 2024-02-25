import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const Noise = require('noisejs').Noise; // don't love this type of import, but the Noise library is funky :(

const My3DComponent = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const noise = new Noise(Math.random());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texturenucleus = textureLoader.load('/neon-glitch.png');

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texturenucleus });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Create a cube with funky colors
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, wireframeLinewidth: 2 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Create a point light
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    const animate = function () {
      requestAnimationFrame(animate);

      globe.rotation.y += 0.005; //adjust this for speed change
      globe.rotation.x += 0.008; //adjust this for speed change

      globe.scale.x = 1 + noise.simplex2(Date.now() / 1000, 0) / 10;
      globe.scale.y = 1 + noise.simplex2(0, Date.now() / 1000) / 10;
      globe.scale.z = 1 + noise.simplex2(Date.now() / 1000, Date.now() / 1000) / 10;

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    const neonColors = [0xff00ff, 0x00ffff, 0xffff00]; // Neon Pink, Cyan, Yellow
    let currentColorIndex = 0;

    const onDocumentMouseDown = (event:any) => {
      event.preventDefault();

      // Update the cube's color
      cubeMaterial.color.set(neonColors[currentColorIndex]);

      // Update the index for the next color
      currentColorIndex = (currentColorIndex + 1) % neonColors.length;
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    animate();

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousedown', onDocumentMouseDown, false);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default My3DComponent;

export async function getServerSideProps(context:any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}