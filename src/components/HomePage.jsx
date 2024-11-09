import React, { useEffect, useRef } from 'react';
import { ArrowRight, Building, Users, Award, Clock } from 'lucide-react';
import * as THREE from 'three';

const Homepage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a simple 3D building model
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x0066cc });
    const building = new THREE.Mesh(geometry, material);
    
    scene.add(building);
    
    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      building.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div ref={mountRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Building className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Construction</h3>
              <p className="text-gray-600">Building with precision and excellence</p>
            </div>
            <div className="text-center p-6">
              <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced professionals at your service</p>
            </div>
            <div className="text-center p-6">
              <Award className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Quality</h3>
              <p className="text-gray-600">Meeting highest industry standards</p>
            </div>
            <div className="text-center p-6">
              <Clock className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-600">Committed to project timelines</p>
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
    </div>
  );
};

export default Homepage;