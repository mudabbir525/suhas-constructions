import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Homepage = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        // Create building base
        const buildingGroup = new THREE.Group();

        // Main building structure
        const buildingGeometry = new THREE.BoxGeometry(4, 8, 3);
        const buildingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xE8E8E8,
            specular: 0x111111,
            shininess: 30
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.castShadow = true;
        building.receiveShadow = true;
        buildingGroup.add(building);

        // Add floors/level divisions
        for (let i = 0; i < 8; i++) {
            const floorGeometry = new THREE.BoxGeometry(4.2, 0.1, 3.2);
            const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = -4 + i * 1;
            buildingGroup.add(floor);
        }

        // Add balconies
        for (let i = 0; i < 7; i++) {
            // Front balconies
            const balconyGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
            const balconyMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC });
            const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
            balcony.position.set(0, -3.5 + i * 1, 1.9);
            buildingGroup.add(balcony);

            // Balcony railings
            const railingGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.05);
            const railingMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
            const railing = new THREE.Mesh(railingGeometry, railingMaterial);
            railing.position.set(0, -3.2 + i * 1, 2.2);
            buildingGroup.add(railing);
        }

        // Add glass windows
        for (let i = 0; i < 7; i++) {
            for (let j = -1; j <= 1; j += 2) {
                const windowGeometry = new THREE.PlaneGeometry(0.8, 0.6);
                const windowMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x7FB2F0,
                    specular: 0xFFFFFF,
                    shininess: 100
                });
                const window = new THREE.Mesh(windowGeometry, windowMaterial);
                window.position.set(j * 1.2, -3.5 + i * 1, 1.52);
                buildingGroup.add(window);
            }
        }

        // Add entrance
        const entranceGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.1);
        const entranceMaterial = new THREE.MeshPhongMaterial({ color: 0x4A4A4A });
        const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
        entrance.position.set(0, -4, 1.5);
        buildingGroup.add(entrance);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        sunLight.position.set(5, 10, 5);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Position the building group
        buildingGroup.position.y = 2;
        scene.add(buildingGroup);

        // Position camera
        camera.position.set(6, 4, 8);
        camera.lookAt(0, 0, 0);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            buildingGroup.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} className="absolute inset-0" />
    );
};

export default Homepage;
