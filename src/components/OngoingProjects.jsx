// import React, { useState, useEffect } from 'react';
// import { MapPin, Home, Clock, Check } from 'lucide-react';

// const OngoingProjects = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Fetch project data from a JSON file
//     fetch('./projects.js')
//       .then((response) => response.json())
//       .then((data) => setProjects(data));
//   }, []);

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Ongoing Projects</h1>
//           <p className="text-gray-600">Discover our latest developments</p>
//         </div>

//         {projects.map((project, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-2">
//               <div className="relative h-64 md:h-auto">
//                 <img
//                   src={project.image || '/api/placeholder/800/600'}
//                   alt={project.name}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold mb-4">{project.name}</h2>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="mr-2" size={20} />
//                     <span>{project.location}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Home className="mr-2" size={20} />
//                     <span>{project.status}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="mr-2" size={20} />
//                     <span>Expected Completion: {project.completion}</span>
//                   </div>
//                 </div>

//                 <a href={project.brochureUrl} download>
//                   <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
//                     Download Brochure
//                   </button>
//                 </a>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50">
//               <div>
//                 <h3 className="text-xl font-semibold mb-4">Features</h3>
//                 <ul className="space-y-2">
//                   {project.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center text-gray-600">
//                       <Check className="mr-2 text-blue-600" size={16} />
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-4">Specifications</h3>
//                 <ul className="space-y-2">
//                   {project.specifications.map((spec, specIndex) => (
//                     <li key={specIndex} className="flex items-center text-gray-600">
//                       <Check className="mr-2 text-blue-600" size={16} />
//                       {spec}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OngoingProjects;



import React from 'react';
import { MapPin, Home, Clock, Check } from 'lucide-react';
import { projects } from './projects';

const OngoingProjects = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ongoing Projects</h1>
          <p className="text-gray-600">Discover our latest developments</p>
        </div>

        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{project.name}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2" size={20} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="mr-2" size={20} />
                    <span>{project.status}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2" size={20} />
                    <span>Expected Completion: {project.completion}</span>
                  </div>
                </div>

                <a href={project.brochureUrl} download>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Download Brochure
                  </button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50">
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <Check className="mr-2 text-blue-600" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <ul className="space-y-2">
                  {project.specifications.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-center text-gray-600">
                      <Check className="mr-2 text-blue-600" size={16} />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingProjects;
