import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Install the app from the app store and follow the on-screen instructions to create your account and start earning today."
  },
  {
    question: "Does Qwick cost money?",
    answer: "No, Qwick is free for creators to use. We earn by taking a small platform fee from the rewards provided by brands."
  },
  {
    question: "Who is Qwick for?",
    answer: "Qwick is for anyone who creates short-form content on platforms like TikTok, Reels, and YouTube Shorts."
  },
  {
    question: "What creators are on Qwick?",
    answer: "We have creators ranging from micro-influencers to massive stars with millions of followers. Anyone can join!"
  },
  {
    question: "Is it influencer marketing... what's the difference?",
    answer: "Influencer marketing often involves one-off deals. Qwick is a platform for ongoing rewards based on performance."
  },
  {
    question: "What should I expect if I'm a brand?",
    answer: "Brands can expect high-quality content, transparent tracking, and a scalable way to reach their target audience."
  },
  {
    question: "Managed vs Self-Serve... what's the difference?",
    answer: "Self-serve gives you full control, while managed services provide expert help to run and optimize your campaigns."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-outfit">Have Questions?</h2>
          <h3 className="text-4xl font-bold text-slate-900 font-outfit">We Have Answers</h3>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item 
              key={index} 
              value={`item-${index}`}
              className="border-b border-slate-100"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full py-6 flex items-center justify-between text-left group">
                  <span className="font-bold text-slate-900 font-outfit group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Plus className="group-data-[state=open]:hidden transition-transform" size={20} />
                    <Minus className="hidden group-data-[state=open]:block transition-transform" size={20} />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pb-6 text-slate-500 font-outfit text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default FAQ;
