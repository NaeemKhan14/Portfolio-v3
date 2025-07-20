import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Certificates from './collections/Certificates'
import Media from './collections/Media'
import PostCategories from './collections/PostCategories'
import Posts from './collections/Posts'
import Projects from './collections/Projects'
import Users from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // disable login in dev environment
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'test@example.com',
            password: 'test',
            prefillOnly: true,
          }
        : false,
  },
  // cors: ['http://frontend:3000', 'https://naeemkhan.dev', 'localhost:3001'],
  // csrf: ['https://naeemkhan.dev', 'http://frontend:3000', 'localhost:3001'],
  collections: [Users, Media, Certificates, PostCategories, Posts, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  // Seed default admin user on start
  onInit: async (payload) => {
    if (process.env.DISABLE_ADMIN_SEED !== 'true' && process.env.NODE_ENV !== 'development') {
      const existingAdmins = await payload.find({
        collection: 'users',
        where: {
          role: { equals: 'admin' },
        },
      })

      if (existingAdmins.totalDocs === 0) {
        const email = process.env.ADMIN_EMAIL
        const password = process.env.ADMIN_PASSWORD

        if (!email || !password) {
          throw new Error(
            'Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables for admin auto-seed',
          )
        }

        await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            role: 'admin',
          },
        })

        console.log(`Seeded initial admin user: ${email}`)
      } else {
        console.log('Admin user already exist')
      }
    }
  },
})
