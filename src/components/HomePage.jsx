import React, { useEffect, useRef } from 'react';
import { ArrowRight, Building2, Users, Award, Clock, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

const Homepage = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // Create building group
        const buildingGroup = new THREE.Group();

        // Main building structure - Core
        const buildingGeometry = new THREE.BoxGeometry(6, 14, 4);
        const buildingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xF5F5F5, // Off-white color matching reference
            specular: 0x222222,
            shininess: 30
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.castShadow = true;
        building.receiveShadow = true;
        buildingGroup.add(building);

        // Dark accent panels on corners
        const accentGeometry = new THREE.BoxGeometry(1.5, 14, 4.2);
        const accentMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2C3E50, // Dark blue-gray color from reference
            specular: 0x444444,
            shininess: 20
        });
        
        // Left accent
        const leftAccent = new THREE.Mesh(accentGeometry, accentMaterial);
        leftAccent.position.x = -2.5;
        buildingGroup.add(leftAccent);
        
        // Right accent
        const rightAccent = new THREE.Mesh(accentGeometry, accentMaterial);
        rightAccent.position.x = 2.5;
        buildingGroup.add(rightAccent);

        // Add floors with projecting slabs
        for (let i = 0; i < 7; i++) {
            const floorGeometry = new THREE.BoxGeometry(7, 0.3, 4.5);
            const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xE0E0E0 });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = -7 + i * 2;
            floor.castShadow = true;
            buildingGroup.add(floor);
        }

        // Add modern windows
        const windowGeometry = new THREE.BoxGeometry(1.2, 1.4, 0.1);
        const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x87CEEB,
            opacity: 0.6,
            transparent: true,
            specular: 0xFFFFFF,
            shininess: 100
        });
        const windowFrameMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

        // Create window pattern
        for (let floor = 0; floor < 6; floor++) {
            for (let x = -1.5; x <= 1.5; x += 1.5) {
                // Window frame
                const frame = new THREE.Mesh(
                    new THREE.BoxGeometry(1.4, 1.6, 0.2),
                    windowFrameMaterial
                );
                frame.position.set(x, -6.5 + floor * 2, 2.1);
                buildingGroup.add(frame);

                // Window glass
                const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
                windowPane.position.set(x, -6.5 + floor * 2, 2.15);
                buildingGroup.add(windowPane);
            }
        }

        // Add balconies
        const balconyGeometry = new THREE.BoxGeometry(2, 0.15, 1);
        const balconyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        const railingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF,
            opacity: 0.9,
            transparent: true 
        });

        for (let floor = 0; floor < 6; floor++) {
            // Main balcony slab
            const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
            balcony.position.set(0, -6.5 + floor * 2, 2.5);
            balcony.castShadow = true;
            buildingGroup.add(balcony);

            // Railing
            const railing = new THREE.Mesh(
                new THREE.BoxGeometry(2, 0.8, 0.05),
                railingMaterial
            );
            railing.position.set(0, -6.1 + floor * 2, 2.9);
            buildingGroup.add(railing);
        }

        // Add top floor pergola
        const pergolaGeometry = new THREE.BoxGeometry(5, 0.2, 3);
        const pergolaMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        const pergola = new THREE.Mesh(pergolaGeometry, pergolaMaterial);
        pergola.position.y = 7.2;
        buildingGroup.add(pergola);

        // Add pergola supports
        const supportGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
        const supportMaterial = new THREE.MeshPhongMaterial({ color: 0x2C3E50 });
        for (let x = -2; x <= 2; x += 1.3) {
            for (let z = -1; z <= 1; z += 2) {
                const support = new THREE.Mesh(supportGeometry, supportMaterial);
                support.position.set(x, 6.5, z);
                buildingGroup.add(support);
            }
        }

        // Ground plane with shadow receiving
        const groundGeometry = new THREE.PlaneGeometry(30, 30);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x222222,
            specular: 0x666666,
            shininess: 10
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -7.2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        sunLight.position.set(15, 20, 15);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 50;
        sunLight.shadow.camera.left = -20;
        sunLight.shadow.camera.right = 20;
        sunLight.shadow.camera.top = 20;
        sunLight.shadow.camera.bottom = -20;
        scene.add(sunLight);

        // Position building and camera
        buildingGroup.position.y = 0;
        scene.add(buildingGroup);

        camera.position.set(12, 8, 16);
        camera.lookAt(0, 0, 0);

        // Smooth animation
        const animate = () => {
            requestAnimationFrame(animate);
            buildingGroup.rotation.y += 0.002;
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
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section with 3D Building */}
            <div className="relative h-screen">
                <div ref={mountRef} className="absolute inset-0" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Building Tomorrow's Landmarks Today</h1>
                         <p className="text-xl md:text-2xl mb-8">Excellence in Construction & Real Estate Development</p>
                         <a href="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                                   Get Started
                                    <ArrowRight className="ml-2" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Building2 className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Premium Location</h3>
                            <p className="text-gray-600">Prime locations in the heart of the city</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                            <p className="text-gray-600">50+ years of combined experience</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Award className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                            <p className="text-gray-600">IGBC Green Building certified</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Clock className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
                            <p className="text-gray-600">On-time possession guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Project Highlight */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Project</h2>
            <p className="text-gray-600">Discover our latest development</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/api/placeholder/600/400" alt="Urbanite Residency" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Urbanite Residency</h3>
              <p className="text-gray-600 mb-6">Experience luxury living at its finest with our newest residential project featuring modern amenities and thoughtful design.</p>
              <a href="/ongoing-projects" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                Learn More
                <ArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

            {/* Contact Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <Phone className="mx-auto h-8 w-8 text-blue-600 mb-4" />
                            <p className="text-gray-600">+91 83339 36688</p>
                        </div>
                        <div className="p-6">
                            <Mail className="mx-auto h-8 w-8 text-blue-600 mb-4" />
                            <p className="text-gray-600">srisuhasconstructions@gmail.com</p>
                        </div>
                        <div className="p-6">
                            <MapPin className="mx-auto h-8 w-8 text-blue-600 mb-4" />
                            <p className="text-gray-600">Hyderabad, Telangana, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
