import { CollectionConfig } from 'payload';

const Posts: CollectionConfig = {
    slug: 'posts',
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
            name: 'mdxContent',
            type: 'code',
            required: true,
            admin: {
                language: 'mdx',
            },
        },
        {
            name: 'date',
            type: 'date',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'post-categories',
            required: true,
        },
        {
            name: 'images',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true,
            required: false,
        },
    ],
};

export default Posts;
