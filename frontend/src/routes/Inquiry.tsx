import React from 'react';
// import useModal from '../hooks/useModal';
// import Modal from '../components/Modal';
// import {Route} from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async';
import getMode from '../utils/getMode';

//form invalid  border-[]
export const Route = createFileRoute('/Inquiry')({
  component: Inquiry,
})

function Inquiry() {
  var colorMode = getMode();
  
  return (
    <div data-scroll-section id='main-container'
    className={(colorMode === "dark") ? "text-white" : "text-black"}
    style={{ backgroundColor: (colorMode === 'dark') ? "#18181B" : "#f3f3f3" }}
    >
      <Helmet>
        <title>LuminAI - Inquiry</title>
      </Helmet>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Contact us!</h2>
        <form className="space-y-4">
          <div>
            <ContactForm />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Inquiry;
