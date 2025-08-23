"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      <h1 className="text-6xl mt-6 font-medium ">
        Welcome to Home Page of ChatPika
      </h1>
      <Link href={"/chat"}>
        <Button
          variant="outline"
          size="sm"
          className=" mt-6 hover:cursor-pointer"
        >
          Try ChatPik{" "}
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Button>
      </Link>

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
