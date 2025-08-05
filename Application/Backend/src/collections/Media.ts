import { apiReadOnlyAccess } from '@/access/defaultAccess'
import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  access: apiReadOnlyAccess,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    adminThumbnail: 'thumbnail',
  },
}

export default Media
