"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type StaffMember = {
  id: number;
  Name: string;
  Role: string;
  Achievement: string;
  Introduction: string;
  Photo?: string;
};

export default function StaffCard({ member }: { member: StaffMember }) {
  const hasPhoto = member.Photo && member.Photo.trim() !== "";

  return (
    <motion.div
      className="bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="w-32 h-32 mx-auto mb-4 relative">
          {hasPhoto ? (
            <Image
              src={member.Photo as string}
              alt={member.Name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          ) : (
            <motion.div
              className="rounded-full w-full h-full"
              style={{
                background:
                  "radial-gradient(circle at center, #1FA2FF, #12D8FA, #A6FFCB)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <h2 className="text-2xl font-bold text-black text-center mb-2">
          {member.Name}
        </h2>
        <p className="text-lg text-slate-800 text-center mb-2">{member.Role}</p>
        <p className="text-sm text-slate-600 text-center italic mb-4">
          {member.Achievement}
        </p>
        <p className="text-slate-600 text-center">{member.Introduction}</p>
      </div>
    </motion.div>
  );
}
