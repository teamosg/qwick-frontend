import React from 'react';
import { Youtube, Instagram, Twitter, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-xs">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-lg" />
                <span className="text-xl font-black font-silkscreen tracking-tighter">QWICK</span>
             </div>
             <p className="text-sm text-slate-400 font-outfit">
                Making creator rewards simple and accessible for everyone.
             </p>
             <div className="mt-8 flex gap-4">
                <Youtube size={20} className="text-slate-400 hover:text-black cursor-pointer" />
                <Instagram size={20} className="text-slate-400 hover:text-black cursor-pointer" />
                <Twitter size={20} className="text-slate-400 hover:text-black cursor-pointer" />
                <Linkedin size={20} className="text-slate-400 hover:text-black cursor-pointer" />
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-outfit uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Contact Us', 'Sign in', 'Join us'].map((item) => (
                  <li key={item} className="text-sm text-slate-500 hover:text-black cursor-pointer font-outfit">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 font-outfit uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item} className="text-sm text-slate-500 hover:text-black cursor-pointer font-outfit">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-outfit">
                © 2024 Qwick. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                    <img src="https://flagcdn.com/w20/us.png" width="16" alt="US Flag" />
                    English
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
