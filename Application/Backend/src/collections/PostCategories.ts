import { apiReadOnlyAccess } from '@/access/defaultAccess'
import { CollectionConfig } from 'payload'

const PostCategories: CollectionConfig = {
  access: apiReadOnlyAccess,
  slug: 'post-categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

export default PostCategories
