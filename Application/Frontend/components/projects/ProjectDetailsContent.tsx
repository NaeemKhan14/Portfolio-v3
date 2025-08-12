import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { Divider } from '@heroui/react'
import ImageGallery from './ImageGallery'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc'
import Error from '@/app/error'

export default async function ProjectDetailsContent({ slug }: { slug: string }) {
    const param = await slug
    const data = await fetchFromApi<ApiResponse<Project>>(
        `/projects?where[slug][equals]=${param}&depth=1`
    )
    const project = data?.docs?.[0]

    if (!project) return notFound()

    let remarkPlugins = []

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
            remarkPlugins
        },
    };

    const images = Array.isArray(project.images)
        ? project.images.map((img) => ({
            ...img,
            url: `/api/proxy/media/${img.url.split('/').pop()}`
        }))
        : []

    return (
        <div className='mx-auto flex flex-col md:max-w-2xl'>
            <h1 className='mb-6 text-center text-3xl font-bold'>{project.title}</h1>
            <Divider className='mb-8' />
            <div className='mb-6 w-full text-lg whitespace-pre-line'>
                <MDXRemote
                    source={project.content}
                    options={options}
                    onError={Error}
                />
            </div>

            {project.github_link?.trim() && (
                <div className='mb-10 text-right'>
                    <Link
                        href={project.github_link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-danger hover:underline'
                    >
                        View on GitHub →
                    </Link>
                </div>
            )}

            <Divider className='mb-10' />

            {images.length > 0 && (
                <>
                    <h3 className='mb-6 text-center text-3xl font-bold'>Screenshots</h3>
                    <ImageGallery images={images} />
                </>
            )}
        </div>
    )
}
