import { Access, AccessArgs } from 'payload'

// User is admin and is logged in
const isAdminLoggedIn = ({ req }: AccessArgs): boolean => {
  return req.user?.role === 'admin'
}

// Public read for frontend
export const allowPublicRead: Access = () => true

// Admin-only access
export const adminOnlyCreate: Access = isAdminLoggedIn
export const adminOnlyUpdate: Access = isAdminLoggedIn
export const adminOnlyDelete: Access = isAdminLoggedIn
export const adminOnlyRead: Access = isAdminLoggedIn

// restrict to admin-only, including read:
export const strictAdminOnlyAccess = {
  create: adminOnlyCreate,
  read: adminOnlyRead,
  update: adminOnlyUpdate,
  delete: adminOnlyDelete,
}

// Users access to disable user signup
export const strictUsersAccess = {
  create: () => false,
  read: adminOnlyRead,
  update: adminOnlyUpdate,
  delete: adminOnlyDelete,
}
// public read and admin-only everything else:
export const apiReadOnlyAccess = {
  read: allowPublicRead,
  create: adminOnlyCreate,
  update: adminOnlyUpdate,
  delete: adminOnlyDelete,
}
