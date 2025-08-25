"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CTA from "@/components/CallToAction";
export default function Home() {
  const faq = [
    {
      question: "Why use ChatPika?",
      answer: "Coz you are not GAY.",
    },
    {
      question: "Is it free?",
      answer: "Yes, It's free trial is of 400 tokens.",
    },
    {
      question: "How can we chat?",
      answer: "Just go to /chat to chat and login to keep records",
    },
  ];

  return (
    <div className="p-6 w-full min-h-[989] flex flex-col items-center   dark:bg-zinc-900 dark:text-white">
      <h1 className="text-6xl mt-6 text-amber-300 font-medium ">
        Chat with your personal AI assistant
      </h1>
      <p className="mt-2 text-3xl">“Built with Next.js + AI”</p>

      <CTA/>

      <h2 className="text-3xl mt-6 font-medium">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faq.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
