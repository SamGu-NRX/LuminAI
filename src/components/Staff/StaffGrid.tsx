"use client";

import { motion } from "framer-motion";
import StaffCard from "./StaffCard";
import { staffMembers } from "@/data/staff";

const StaffGrid: React.FC = () => {
  return (
    <motion.div
      className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {staffMembers.map((member) => (
        <StaffCard key={member.id} member={member} />
      ))}
    </motion.div>
  );
};

export default StaffGrid;
