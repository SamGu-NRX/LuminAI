import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

import AOS from "aos";
import "aos/dist/aos.css";

import MovingGradient from "@/components/DynamicGradient";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import "@/styles/App.scss";
import "@/styles/Staff.scss";

export const Route = createFileRoute("/Staff")({
  component: Staff,
});

function Staff() {
  const [members, setMembers] = useState([] as Record<string, any>[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await directus.request(
          readItems('luminai_team_members', {
            fields: ['Name', 'Role', 'Achievement', 'Introduction', 'Photo', 'id'],
          })
        );
        const sortedMembers = res.sort((p1: any, p2: any) =>
          p1.id < p2.id ? -1 : p1.id > p2.id ? 1 : 0
        );
        setMembers(sortedMembers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setLoading(false);
      }
    };

    fetchMembers();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <div
      data-scroll-section
      id="main-container"
      className="text-black dark:text-white dark:bg-[#18181B] bg-[#f3f3f3]"
    >
      <Helmet>
        <title>LuminAI - Staff</title>
      </Helmet>
      <div className="pt-24 p-4 justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Meet Our Staff</h2>
        <p>Information about our experienced instructors and staff members.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {members.map((member: any) => (
            <div key={member.id} style={{ animation: "textPopIn 0.7s ease-in-out" }}>
              <BackgroundGradient
                className="bg-white dark:bg-zinc-900 bg-opacity-100 p-6 rounded-[22px] text-center relative group"
                // data-aos="fade-up"
              >
                <div className="w-24 h-30 mx-auto mb-4 flex items-center justify-center relative">
                  {member.Photo ? (
                    <div className="text-center rounded-[22px] bg-transparent dark:bg-zinc-900 flex items-center justify-center">
                      <img
                        src={`https://manage.redevs.org/assets/${member.Photo}.png`}
                        alt={member.Name}
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    <MovingGradient />
                  )}
                </div>


                <h2 className="text-2xl font-bold ">{member.Name}</h2>
                <div className="transform absolute inset-0 duration-300 transition hover:scale-105 rounded-[22px] bg-white dark:bg-zinc-900 bg-opacity-90 p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 ">
                  <p
                    className="text-xl font-sans"
                    style={{ fontWeight: "500" }}
                  >
                    {member.Role}
                  </p>
                  <p className="text-sm italic mt-1">{member.Achievement}</p>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ marginTop: "3px" }}
                  >
                    {member.Introduction}
                  </p>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Staff;
