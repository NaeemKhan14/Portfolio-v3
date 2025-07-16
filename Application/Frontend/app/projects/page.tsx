import ProjectsList from '@/components/projects/ProjectsList'
import { fetchFromApi } from '@/lib/api-fetcher'

export default async function ProjectsPage() {
  const data = await fetchFromApi<ProjectList>('/projects?sort=createdAt')
  const projects = data.docs

  return <ProjectsList projects={projects} />
}
