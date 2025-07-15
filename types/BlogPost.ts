type BlogPost = {
  id: number
  slug: string
  title: string
  short_desc: string
  date: Date
  category: {
    name: string
  } | null
}
