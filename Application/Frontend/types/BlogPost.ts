interface BlogPost {
  id: string
  title: string
  slug: string
  short_desc: string
  date: Date
  mdxContent: string
  category: BlogPostCategory
}
