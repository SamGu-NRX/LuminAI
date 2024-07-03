import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { getItems } from '../services/directus';

import { createDirectus, rest, readItems } from '@directus/sdk';

import AOS from 'aos';
import 'aos/dist/aos.css';

import getMode from '../utils/getMode';
import MovingGradient from '../components/DynamicGradient';
import { BackgroundGradient } from '../components/ui/background-gradient';
import '../styles/App.scss';
import '../styles/Staff.scss';

export const Route = createFileRoute('/Staff')({
  component: Staff,
});

function Staff() {
  const colorMode = getMode();

  // TODO: Change to items & setItems to "teamMembers" to use as CMS database
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      const data = await getItems('luminai_team_members');
      setItems(data.data);

      console.log(data.data);
    };

    fetchStaffMembers();
  }, []);

  // temporary placeholder data
  const teamMembers = [
    { 
      name: 'John Doe', 
      role: 'President', 
      achievement: 'Developed a state-of-the-art NLP model.', 
      description: 'John is a visionary leader with a deep understanding of natural language processing. His innovative work has set new standards in the field, making significant advancements in AI technology.' 
    },
    { 
      name: 'Jane Smith', 
      role: 'Director of Coursework', 
      achievement: 'Specialized in machine learning algorithms.', 
      description: 'Jane is an expert in machine learning with a passion for teaching. Her specialized coursework has empowered countless students to excel in AI, breaking down complex algorithms into easily understandable concepts.' 
    },
    { 
      name: 'Emily Chen', 
      role: 'Director of Logistics', 
      achievement: 'Organized a statewide coding competition that attracted over 500 participants.', 
      description: 'Emily is known for her exceptional organizational skills and ability to handle complex logistics with ease. She ensures everything runs smoothly, from event planning to daily operations.' 
    },
    { 
      name: 'Michael Thompson', 
      role: 'Director of Management', 
      achievement: 'Managed a team of 20 volunteers for a community tech education program.', 
      description: 'Michael\'s leadership and management skills have been instrumental in the success of several community projects. His strategic vision and ability to inspire his team have made a significant impact.' 
    },
    { 
      name: 'Sophia Martinez', 
      role: 'Director of Mentorship', 
      achievement: 'Created a peer mentoring program that improved academic performance and morale among students.', 
      description: 'Sophia is passionate about helping others succeed. Her mentorship program has been a game-changer for many students, providing guidance and support that has led to improved academic performance and increased morale.' 
    },
    { 
      name: 'Alex Johnson', 
      role: 'Lead Developer', 
      achievement: 'Designed and developed full-stack applications for the AI BootCamp.', 
      description: 'Alex is a talented full-stack developer responsible for designing and implementing the programs used in the courses, as well as developing and maintaining the bootcamp\'s website. His work ensures a seamless user experience and robust technical infrastructure.' 
    },
    { 
      name: 'Laura Nguyen', 
      role: 'Instructor', 
      achievement: 'Designed an interactive AI curriculum for high school students.', 
      description: 'Laura is a dedicated educator with a creative approach to teaching AI. Her interactive curriculum engages students and makes learning complex topics enjoyable and accessible.' 
    },
    { 
      name: 'Daniel Kim', 
      role: 'Instructor', 
      achievement: 'Published research on neural networks and their applications.', 
      description: 'Daniel is a respected researcher and instructor with a deep knowledge of neural networks. His publications have contributed valuable insights to the AI community, and he brings this expertise to his teaching.' 
    }
  ];


  return (
    <div
      data-scroll-section
      id='main-container'
      className={(colorMode === "dark") ? "text-white" : "text-black"}
      style={{ backgroundColor: (colorMode === 'dark') ? "#18181B" : "#f3f3f3" }}
    >  
      <Helmet>
        <title>LuminAI - Staff</title>
      </Helmet>
      <div className="pt-24 p-4 justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Meet Our Staff</h2>
        <p>Information about our experienced instructors and staff members.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {teamMembers.map((member, index) => (
            <div style={{ animation: 'textPopIn 0.7s ease-in-out' }}>
            <div
              key={index}
              className="bg-white bg-opacity-80 p-6 rounded-lg text-center relative group"
              data-aos="fade-up"
            >
            
            <div className="w-24 h-24 mx-auto mb-4 relative">
              {member.photo ? (
                  <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </BackgroundGradient>
              ) : (
                <MovingGradient />
              )}
            </div>

              <h2 className="text-2xl font-bold ">{member.name}</h2>
              <div className="transform absolute inset-0 duration-300 transition hover:scale-105 rounded-md bg-white bg-opacity-90 p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 ">
                <p className="text-xl font-sans" style={{fontWeight: '500'}}>{member.role}</p>
                <p className="text-sm italic mt-1">{member.achievement}</p>
                <p className="text-gray-600 text-sm" style={{marginTop: '3px'}}>{member.description}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staff;
