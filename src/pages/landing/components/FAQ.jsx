import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "Who can use Qwick?",
    answer:
      "Anyone! Whether you’re a creator looking to earn or a brand looking to scale content. ",
  },
  {
    question: "Does it cost anything to join?",
    answer: "Signing up is free.",
  },
  {
    question: "How much can I actually earn?",
    answer:
      "Earnings vary based on your content’s performance, the better it performs, the more you make. ",
  },
  {
    question: "Do I need a big following to earn?",
    answer:
      "Nope. Qwick is built for creators of all sizes. Strong content matter more than follower count. ",
  },
  {
    question: "How do I create a campaign as a brand?",
    answer:
      "Set up your community, create your campaign, define your budget, complete payment, and launch all in just a few simple steps.",
  },
  {
    question: "How many creators can join one campaign?",
    answer:
      "By default, campaigns are open to unlimited creators, just set your budget and let them start creating. You can also switch to a waitlist mode, where you handpick which creators are allowed to join. Only content that meets your criteria qualifies for rewards, so you only pay for what performs.",
  },
];

const FAQ = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 font-inter">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border-b border-slate-100"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full py-4 sm:py-6 flex items-center justify-between text-left group gap-4">
                  <span className="font-bold text-sm sm:text-base text-slate-900 font-inter group-hover:text-[#9B9B9B] transition-colors pr-2">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <Plus
                      className="group-data-[state=open]:hidden transition-transform"
                      size={20}
                    />
                    <Minus
                      className="hidden group-data-[state=open]:block transition-transform"
                      size={20}
                    />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pb-6 text-slate-500 font-inter text-sm leading-relaxed">
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
