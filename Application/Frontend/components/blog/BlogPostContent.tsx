import Error from '@/app/error'
import CustomLink from '@/hooks/MDXCustomLinkStyle'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { Divider } from '@heroui/react'
import { format } from 'date-fns'
import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc"
import { notFound } from 'next/navigation'
import rehypePrettyCode from "rehype-pretty-code"

export default async function BlogPostContent({ slug }: { slug: string }) {
    const param = await slug
    const data = await fetchFromApi<ApiResponse<BlogPost>>(
        `/posts?where[slug][equals]=${param}&depth=1`
    )

    const post = data?.docs?.[0]

    if (!post) { return notFound() }
    let remarkPlugins = []

    /** @type {import('rehype-pretty-code').Options} */
    const prettyCodeOptions = {
        theme: "github-dark-default",
    };

    // Jest breaks the test as the library used in this is pure JS, so to prevent this
    // import from loading when tests are running, we use this method. The env
    // JEST_WORKER_ID is created when jest runs the tests, so we only load this library
    // when this env is not present
    if (!process.env.JEST_WORKER_ID) {
        const { remarkResolveCmsImages } = await import('@/lib/remark-resolve-cms-images')
        remarkPlugins.push(remarkResolveCmsImages)
    }

    const options: MDXRemoteOptions = {
        mdxOptions: {
            remarkPlugins,
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
        },
    };

    return (
        <div className='mx-auto flex flex-col md:max-w-2xl'>
            <h1 className='mb-6 text-center text-3xl font-bold'>{post.title}</h1>
            <p className='mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500'>
                {post.category?.name && (
                    <span className='bg-danger dark:bg-danger-200 rounded px-2 py-1 text-sm font-medium text-white'>
                        {post.category.name}
                    </span>
                )}
                <span>{format(post.date, 'dd MMMM, yyyy')}</span>
            </p>

            <Divider className='mb-8' />

            <div className='prose dark:prose-invert'>
                <MDXRemote
                    source={post.mdxContent}
                    options={options}
                    onError={Error}
                    components={{
                        a: CustomLink,
                    }}
                />
            </div>
        </div>
    )
}
