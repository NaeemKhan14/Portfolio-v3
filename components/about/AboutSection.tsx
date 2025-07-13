'use client'

import { siteConfig } from "@/config/site";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { Link } from "@heroui/link";
import { Chip, Divider } from "@heroui/react";

export default function AboutSection() {
  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Image
                src="/images/pp.jpg"
                alt="Profile photo"
                className="rounded-2xl border-2 border-warning-300 dark:border-warning/50 shadow-sm"
                width={200}
                height={200}
                priority
                unoptimized
              />
              <div className="text-center">
                <Chip color="warning" variant="solid" className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium text-pink-700 dark:text-danger-300">
                  SOC Analyst & Software Dev
                </Chip>
              </div>
            </div>
            
            <div className="flex flex-col items-center w-full space-y-4">
              <div className="flex space-x-4">
                <Link 
                  isExternal 
                  aria-label="Linkedin" 
                  href={siteConfig.links.linkedin}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-125 transition-transform"
                >
                  <LinkedinIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Link>
                <Link 
                  isExternal 
                  aria-label="Github" 
                  href={siteConfig.links.github}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-125 transition-transform"
                >
                  <GithubIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full">
                <a 
                  href="cv/Naeem Khan CV (Cyber Security).pdf" 
                  className="text-center text-sm bg-danger hover:bg-pink-300 dark:hover:bg-pink-900 text-white py-2.5 rounded transition-colors"
                >
                  Security CV
                </a>
                <a 
                  href="cv/Naeem Khan CV.pdf" 
                  className="text-center text-sm bg-danger hover:bg-pink-300 dark:hover:bg-pink-900 text-white py-2.5 rounded transition-colors"
                >
                  Developer CV
                </a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-4 text-danger">
              Naeem Khan
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Cybersecurity specialist with software development expertise, focused on building 
              secure systems and defending against modern threats. Combining SOC analyst certification 
              with engineering experience to create resilient applications.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <Chip color="danger" variant="bordered">Software Development</Chip>
              <Chip color="danger" variant="bordered">SOC Analyst L1</Chip>
              <Chip color="danger" variant="bordered">CTF Competitor</Chip>
            </div>
          </div>
        </div>
      </div>
      <Divider className="max-w-3xl mx-auto" />
    </section>
  );
}