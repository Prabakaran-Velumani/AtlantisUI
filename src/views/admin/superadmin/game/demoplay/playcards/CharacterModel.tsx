import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CharacterModel = () => {
  const containerRef = useRef(null);
  let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, 
  directionalLight: THREE.DirectionalLight, ambientLight: THREE.AmbientLight, pointLight: THREE.PointLight, 
  player: THREE.Mesh, model: THREE.Mesh;


  useEffect(() => {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 9);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2.0, 78.0, 100);
    scene.add(directionalLight);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(1.0, 4.0, 0.0);
    scene.add(pointLight);


    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/path/to/your/model.glb', // Path to your GLB file
      (gltf) => {
            // If the scene contains a single mesh
          if (gltf.scene instanceof THREE.Mesh) {
            model = gltf.scene;
          } else if (gltf.scene instanceof THREE.Group && gltf.scene.children.length > 0) {
            // If the scene contains multiple meshes, take the first one
            model = gltf.scene.children[0] as THREE.Mesh;
          } else {
            console.error('GLTF scene is empty or does not contain a mesh');
            return;
          }
        model.position.set(-3, -1.8, 5); // Adjust position as needed
        model.rotation.set(0, 1, 0); // Adjust rotation as needed
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB:', error);
      }
    );

    // // Your 3D models
    // // Example: Player
    // player = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    // player.position.set(0, 0, 0); // Adjust position as needed
    // scene.add(player);

    // // Example: Model
    // model = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
    // model.position.set(-3, -1.8, 5); // Adjust position as needed
    // model.rotation.set(0, 1, 0); // Adjust rotation as needed
    // scene.add(model);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update your animations or interactions here

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      // Dispose Three.js objects to prevent memory leaks
      renderer.dispose();
      scene=null;
      camera=null;
    };
  }, []);

  return <div ref={containerRef} />;
};


export default CharacterModel;