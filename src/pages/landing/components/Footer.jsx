import React from 'react';
import { Youtube, Instagram, Twitter, Linkedin, Globe } from 'lucide-react';
import logo from "../../../assets/qwick_logo.webp"
import Instagramicon from '@/assets/svg/Instagramicon';
import Facebookicon from '@/assets/svg/Facebookicon';
import Threadsicon from '@/assets/svg/Thredsicon';
import Youtubeicon from '@/assets/svg/Youtube';


const Footer = () => {
  return (
    <footer className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-xs">
             <div className="flex items-start gap-2 mb-6">
               <img src={logo} alt="Logo" className="w-30 h-10 object-fit flex items-start" />
             </div>
             <p className="text-sm text-slate-400 font-inter">
                Qwick by Misfits Visionary Creative Agency (MVCA)
             </p>
             <p className="text-sm text-slate-400 font-inter">202503083989 (NS0307698-H)</p>
             <div className="mt-8 flex gap-2">
               <a href="https://www.facebook.com/profile.php?id=61568032453360" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                 <Facebookicon/>
               </a>
               <a href="https://www.instagram.com/qwick.app/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                 <Instagramicon />
               </a>
               <a href="https://www.threads.com/@qwick.app?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                 <Threadsicon/>
               </a>
               <a href="https://youtube.com/@qwickapp?si=8UiJ88nyzotfd6sF" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                 <Youtubeicon/>
               </a>

                
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-inter uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'FAQs', 'Contact Us','Resources'].map((item) => (
                  <li key={item} className="text-sm text-slate-500 hover:text-black cursor-pointer font-inter">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-inter uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item} className="text-sm text-slate-500 hover:text-black cursor-pointer font-inter">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-inter">
                © 2024 Qwick. All rights reserved.
            </p>
            
        </div>
      </div>
    </footer>
  );
};

export default Footer;
