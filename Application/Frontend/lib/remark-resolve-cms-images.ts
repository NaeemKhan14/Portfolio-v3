import { visit } from 'unist-util-visit'

export function remarkResolveCmsImages() {
  return function transformer(tree: any) {
    visit(tree, 'image', (node: any) => {
      const isFilenameOnly = /^[a-zA-Z0-9_\-]+\.(png|jpe?g|gif|svg|webp)$/.test(node.url)
      if (isFilenameOnly) {
        node.url = `/api/proxy/media/${node.url}`
      }
    })
  }
}