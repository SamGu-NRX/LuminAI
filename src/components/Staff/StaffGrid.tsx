'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StaffCard from './StaffCard'

type StaffMember = {
  id: number
  Name: string
  Role: string
  Achievement: string
  Introduction: string
  Photo?: string
}

export default function StaffGrid() {
  const [members, setMembers] = useState<StaffMember[]>([])

  useEffect(() => {
    // Fetch staff members data here
    // For demonstration, we include a member with no Photo:
    setMembers([
      {
        id: 1,
        Name: 'Sam Gu',
        Role: 'Co-Founder, Lead Instructor',
        Achievement: 'PhD in Machine Learning',
        Introduction: 'Passionate about teaching AI to the next generation.',
        Photo: ''
      },
      {
        id: 2,
        Name: 'Jane Smith',
        Role: 'Data Scientist',
        Achievement: 'Led a major data-driven project',
        Introduction: 'Loves making sense of big data.',
        Photo: '' // No photo provided here
      },
    ])
  }, [])

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {members.map((member) => (
        <StaffCard key={member.id} member={member} />
      ))}
    </motion.div>
  )
}
