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
  

  return (
    <div className="p-6 w-full min-h-[989] flex flex-col items-center   dark:bg-zinc-900 dark:text-white">
      <h1 className="text-6xl mt-6 text-amber-300 font-medium ">
        Chat with your personal AI assistant
      </h1>
      <p className="mt-2 text-3xl">“Built with Next.js + AI”</p>

      <CTA/>

      <h2 className="text-3xl mt-6 font-medium">Frequently Asked Questions</h2>
      
    </div>
  );
}
