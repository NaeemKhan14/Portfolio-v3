interface Project {
  id: string
  slug: string
  title: string
  short_desc: string
  content: string
  images?: ProjectImages[]
  github_link?: string
}
