import { Divider } from '@heroui/react'
import { Suspense, ReactNode } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface EmptyPageLayoutProps {
    title: string
    children: ReactNode
}

export default function EmptyPageLayout({ title, children }: EmptyPageLayoutProps) {
    return (
        <div className={`mx-auto flex flex-col md:max-w-2xl`}>
            <h1 className='mb-6 text-center text-3xl font-bold'>{title}</h1>
            <Divider className='mb-8' />
            <Suspense fallback={<LoadingSpinner />}>
                {children}
            </Suspense>
        </div>
    )
}