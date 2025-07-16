import BlogPostsList from '@/components/blog/BlogPostsList'

export default async function BlogPage() {
  // const posts = await prisma.post.findMany({
  //   orderBy: { date: 'desc' },
  //   select: {
  //     id: true,
  //     slug: true,
  //     title: true,
  //     short_desc: true,
  //     date: true,
  //     category: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  // })
  const posts: BlogPost[] =
    [
      {
        id: 1,
        slug: "abvad",
        title: "adfadfadfadf",
        short_desc: "abggggggc",
        date: new Date("11-11-2022"),
        category: {
          name: "abc"
        }
      }
    ]

  return <BlogPostsList posts={posts} />
}
