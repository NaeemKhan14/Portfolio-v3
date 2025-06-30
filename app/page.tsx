import AboutSection from "@/components/about/AboutSection";
import Blog from "@/components/blog/Blog";
import Certifications from "@/components/certifications/CertificationGird";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ExperienceCard from "@/components/experience/ExperienceCard";
import Hero from "@/components/home/Hero";
import Socials from "@/components/home/SocialLinks";
import Projects from "@/components/projects/PorjectsCard";

export default function Home() {
  return (
    <main>
      <Hero />
      <Socials />
      <AboutSection />
      <ExperienceCard />
      <Certifications />
      <Projects />
      <Blog />
      <ContactInfo />
    </main>
  );
}
