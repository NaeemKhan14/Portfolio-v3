import { apiReadOnlyAccess } from '@/access/defaultAccess'
import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  access: apiReadOnlyAccess,
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'short_desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'code',
      required: true,
      admin: {
        language: 'mdx',
      },
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: false,
    },
    {
      name: 'github_link',
      type: 'text',
    },
  ],
}

export default Projects
