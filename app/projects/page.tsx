import ProjectsList from '@/components/projects/ProjectsList';
import prisma from '@/lib/prisma';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany();

  return <ProjectsList projects={projects} />;
}