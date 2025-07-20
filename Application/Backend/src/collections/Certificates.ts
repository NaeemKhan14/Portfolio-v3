import { apiReadOnlyAccess } from '@/access/defaultAccess'
import { CollectionConfig } from 'payload'

const Certificates: CollectionConfig = {
  slug: 'certificates',
  access: apiReadOnlyAccess,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'credential_id',
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
      name: 'issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'logo',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
  ],
}

export default Certificates
