import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
    const param = await params
    const filename = param.filename
    const backendUrl = process.env.CMS_INTERNAL_URL
    const fileUrl = `${backendUrl}/media/file/${filename}`

    const response = await fetch(fileUrl)

    if (!response.ok) {
        return new NextResponse('Media not found', { status: 404 })
    }

    const headers = new Headers(response.headers)
    return new NextResponse(response.body, { headers })
}
