import { siteConfig } from "@/config/site";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "../icons";
import { Link } from "@heroui/link";

export default function AboutSection() {
  return (
    <section className="flex flex-col items-center justify-center py-8 md:py-10">
      <div className="flex flex-col-reverse lg:flex-row max-w-3xl w-full px-8 gap-8">
        
        {/* Text Block */}
        <div className="prose prose-neutral dark:prose-invert flex-1">
          <h1 className="mb-8 text-2xl font-medium text-center">About Me</h1>
          <p>
            Hello, I'm Naeem Khan, a cybersecurity-focused software developer based in Berlin. After earning my Master's in Computer Science with Cybersecurity specialization from SRH Berlin University, I actively pursue industry certifications (SAL1, PT1) and participate in Capture The Flag competitions to sharpen my real-world vulnerability assessment skills against evolving threats.
          </p>
          <br />
          <p>
            My cybersecurity expertise is reinforced by two years of software development experience in Dubai, where I engineered full-stack solutions with Python, Django, PostgreSQL, and Angular. This dual perspective enables me to build inherently secure systems from the ground up; transforming security theory into resilient applications that withstand modern cyber risks.
          </p>
        </div>

        {/* Avatar & Links/Buttons */}
        <div className="flex flex-col items-center justify-start gap-4 mt-5">
          {/* Row 1: Avatar */}
          <Image
            src="images/pp.jpg"
            alt="Profile photo"
            className="rounded-full"
            unoptimized
            width={210}
            height={210}
            priority
          />

          {/* Row 2: Social Icons */}
          <div className="flex gap-4">
            <Link isExternal aria-label="Linkedin" href={siteConfig.links.linkedin}>
              <LinkedinIcon className="w-6 h-6 text-default-500 hover:text-primary" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="w-6 h-6 text-default-500 hover:text-primary" />
            </Link>
          </div>

          {/* Row 3: Buttons */}
          <div className="flex gap-3">
            <a href="cv/Naeem Khan CV (Cyber Security).pdf" className="bg-danger text-white px-8 py-2 rounded-lg text-sm hover:bg-pink-900">
              CV 1
            </a>
            <a href="cv/Naeem Khan CV.pdf" className="bg-danger text-white px-8 py-2 rounded-lg text-sm hover:bg-pink-900">
              CV 2
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
