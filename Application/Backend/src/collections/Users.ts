import { strictUsersAccess } from '@/access/defaultAccess'
import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    depth: 0,
    maxLoginAttempts: 5,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: strictUsersAccess,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin'],
      required: true,
      defaultValue: 'admin',
    },
  ],
}

export default Users
