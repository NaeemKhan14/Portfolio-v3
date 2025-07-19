import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageGallery from '../ImageGallery'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, priority, ...rest } = props
    return <img {...rest} />
  },
}))

const mockImages: ProjectImages[] = [
  { url: '/images/img1.jpg', alt: 'Image 1' },
  { url: '/images/img2.jpg', alt: 'Image 2' },
  { url: '/images/img3.jpg', alt: 'Image 3' },
]

describe('ImageGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all images with correct URLs', () => {
    render(<ImageGallery images={mockImages} />)

    // First image (relative URL)
    const image1 = screen.getByAltText('Image 1')
    expect(image1).toHaveAttribute('src', '/images/img1.jpg')

    // Second image (relative URL)
    const image2 = screen.getByAltText('Image 2')
    expect(image2).toHaveAttribute('src', '/images/img2.jpg')

    // Third image (absolute URL)
    const image3 = screen.getByAltText('Image 3')
    expect(image3).toHaveAttribute('src', '/images/img3.jpg')
  })

  it('uses fallback alt text when not provided', () => {
    const images = [{ url: '/images/no-alt.jpg', alt: '' }]
    render(<ImageGallery images={images} />)

    expect(screen.getByAltText('Project Image 1')).toBeInTheDocument()
  })

  it('opens modal with selected image when clicking an image', async () => {
    render(<ImageGallery images={mockImages} />)
    const user = userEvent.setup()

    // Click the first image thumbnail
    await user.click(screen.getAllByAltText('Image 1')[0])

    // Verify modal content
    const modalImages = screen.getAllByAltText('Image 1')
    expect(modalImages).toHaveLength(2) // Thumbnail and modal image

    // Check modal image specifically
    const modalImage = modalImages.find((img) =>
      img.className.includes('object-contain'),
    )
    expect(modalImage).toBeInTheDocument()
    expect(modalImage).toHaveAttribute('src', '/images/img1.jpg')
  })

  it('closes modal when clicking outside the image', async () => {
    render(<ImageGallery images={mockImages} />)
    const user = userEvent.setup()

    // Open modal
    await user.click(screen.getAllByAltText('Image 1')[0])

    // Click modal backdrop (the fixed-position div)
    const modalBackdrop = screen.getByTestId('modal-backdrop')
    await user.click(modalBackdrop)

    // Verify modal is closed by checking the enlarged image is gone
    const modalImages = screen.queryAllByAltText('Image 1')
    expect(modalImages).toHaveLength(1) // Only thumbnail remains
  })

  it('closes modal when clicking close button', async () => {
    render(<ImageGallery images={mockImages} />)
    const user = userEvent.setup()

    // Open modal
    await user.click(screen.getAllByAltText('Image 1')[0])

    // Click close button
    await user.click(screen.getByLabelText('Close image'))

    // Verify modal is closed
    const modalImages = screen.queryAllByAltText('Image 1')
    expect(modalImages).toHaveLength(1) // Only thumbnail remains
  })

  it('stops propagation when clicking close button', async () => {
    render(<ImageGallery images={mockImages} />)
    const user = userEvent.setup()

    await user.click(screen.getByAltText('Image 1'))

    const closeButton = screen.getByLabelText('Close image')
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation')

    await user.click(closeButton)

    expect(stopPropagationSpy).toHaveBeenCalled()
    stopPropagationSpy.mockRestore()
  })
})
