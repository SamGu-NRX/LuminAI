"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { StaffMember } from '@/data/staff';

const StaffCard: React.FC<{ member: StaffMember }> = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-64 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden"
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          quality={80}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-xl font-semibold mb-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {member.name}
            </motion.h3>

            <motion.p
              className="text-sm mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {member.role}
            </motion.p>

            <motion.p
              className="text-xs italic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              &quot;{member.quote}&quot;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StaffCard;
