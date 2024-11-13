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
        mountRef.current.appendChild(renderer.domElement);

        // Create building group
        const buildingGroup = new THREE.Group();

        // Main building structure
        const buildingGeometry = new THREE.BoxGeometry(5, 12, 4);
        const buildingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xE8E0D5, // Warm beige color common in modern Indian architecture
            specular: 0x222222,
            shininess: 30
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.castShadow = true;
        building.receiveShadow = true;
        buildingGroup.add(building);

        // Add decorative vertical strips
        const stripGeometry = new THREE.BoxGeometry(0.2, 12, 0.3);
        const stripMaterial = new THREE.MeshPhongMaterial({ color: 0xB8860B }); // Dark golden accents
        for (let x = -2; x <= 2; x += 4) {
            const strip = new THREE.Mesh(stripGeometry, stripMaterial);
            strip.position.set(x, 0, 2.1);
            buildingGroup.add(strip);
        }

        // Add floors with decorative elements
        for (let i = 0; i < 12; i++) {
            const floorGeometry = new THREE.BoxGeometry(5.4, 0.2, 4.4);
            const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xB8860B });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = -6 + i * 1;
            buildingGroup.add(floor);
        }

        // Add luxury balconies
        for (let i = 0; i < 11; i++) {
            // Front balconies with curved design
            const balconyGeometry = new THREE.BoxGeometry(2, 0.15, 1);
            const balconyMaterial = new THREE.MeshPhongMaterial({ color: 0xDCDCDC });
            const balcony = new THREE.Mesh(balconyGeometry, balconyMaterial);
            balcony.position.set(0, -5.5 + i * 1, 2.5);
            buildingGroup.add(balcony);

            // Glass railings
            const railingGeometry = new THREE.BoxGeometry(2, 0.8, 0.1);
            const railingMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x87CEEB,
                opacity: 0.4,
                transparent: true
            });
            const railing = new THREE.Mesh(railingGeometry, railingMaterial);
            railing.position.set(0, -5.1 + i * 1, 2.9);
            buildingGroup.add(railing);
        }

        // Add glass windows with modern frames
        for (let i = 0; i < 11; i++) {
            for (let j = -1; j <= 1; j += 2) {
                // Window frame
                const frameGeometry = new THREE.BoxGeometry(1.2, 1, 0.1);
                const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x4A4A4A });
                const frame = new THREE.Mesh(frameGeometry, frameMaterial);
                frame.position.set(j * 1.5, -5.5 + i * 1, 2.1);
                buildingGroup.add(frame);

                // Glass
                const windowGeometry = new THREE.PlaneGeometry(1, 0.8);
                const windowMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x87CEEB,
                    opacity: 0.6,
                    transparent: true,
                    specular: 0xFFFFFF,
                    shininess: 100
                });
                const window = new THREE.Mesh(windowGeometry, windowMaterial);
                window.position.set(j * 1.5, -5.5 + i * 1, 2.15);
                buildingGroup.add(window);
            }
        }

        // Add grand entrance
        const entranceGeometry = new THREE.BoxGeometry(2, 2.5, 0.5);
        const entranceMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8B4513,  // Rich wooden color
            specular: 0x222222,
            shininess: 30
        });
        const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
        entrance.position.set(0, -6, 2.2);
        buildingGroup.add(entrance);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xFDB813, 1); // Warm sunlight color
        sunLight.position.set(10, 15, 10);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Ground reflection plane
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x222222,
            specular: 0x666666,
            shininess: 30
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -6.2;
        ground.receiveShadow = true;
        scene.add(ground);

        // Position the building group
        buildingGroup.position.y = 2;
        scene.add(buildingGroup);

        // Position camera
        camera.position.set(8, 5, 12);
        camera.lookAt(0, 0, 0);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            buildingGroup.rotation.y += 0.003;
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
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Luxury Redefined</h1>
                        <p className="text-xl md:text-2xl mb-8">Experience the pinnacle of modern Indian architecture</p>
                        <a href="/contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-md hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg">
                            Book Your Dream Home
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
                        <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Building2 className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Premium Location</h3>
                            <p className="text-gray-600">Prime locations in the heart of the city</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Users className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                            <p className="text-gray-600">50+ years of combined experience</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Award className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                            <p className="text-gray-600">IGBC Green Building certified</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Clock className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
                            <p className="text-gray-600">On-time possession guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Projects */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Grand Pavilion",
                                location: "Whitefield, Bangalore",
                                specs: "3 & 4 BHK Luxury Apartments"
                            },
                            {
                                title: "Sky Terraces",
                                location: "Electronic City, Bangalore",
                                specs: "4 & 5 BHK Premium Penthouses"
                            },
                            {
                                title: "Urban Oasis",
                                location: "Marathahalli, Bangalore",
                                specs: "3 BHK Smart Homes"
                            }
                        ].map((project, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <img src={`/api/placeholder/400/${300}`} alt={project.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 mb-4">{project.specs}</p>
                                    <div className="flex items-center text-gray-500 mb-4">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {project.location}
                                    </div>
                                    <a href={`/projects/${index}`} className="inline-flex items-center text-amber-600 hover:text-amber-700">
                                        View Details
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <Phone className="mx-auto h-8 w-8 text-amber-600 mb-4" />
                            <p className="text-gray-600">+91 80 1234 5678</p>
                        </div>
                        <div className="p-6">
                            <Mail className="mx-auto h-8 w-8 text-amber-600 mb-4" />
                            <p className="text-gray-600">info@yourcompany.com</p>
                        </div>
                        <div className="p-6">
                            <MapPin className="mx-auto h-8 w-8 text-amber-600 mb-4" />
                            <p className="text-gray-600">Bangalore, Karnataka, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
