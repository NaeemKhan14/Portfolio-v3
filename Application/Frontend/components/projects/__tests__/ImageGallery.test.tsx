// import { fireEvent, render, screen } from '@testing-library/react'
// import ImageGallery from '../ImageGallery'
// import userEvent from '@testing-library/user-event'

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: any) => {
//     // Destructure and remove unsupported boolean props
//     const { fill, priority, ...rest } = props
//     return <img {...rest} />
//   },
// }))

// const mockImages = ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg']

// describe('ImageGallery', () => {
//   it('renders all images', () => {
//     render(<ImageGallery images={mockImages} />)
//     mockImages.forEach((src, i) => {
//       const img = screen.getByAltText(`Project Image ${i + 1}`)
//       expect(img).toBeInTheDocument()
//       expect(img).toHaveAttribute('src', src)
//     })
//   })

//   it('opens modal on image click', () => {
//     render(<ImageGallery images={mockImages} />)
//     const img = screen.getByAltText('Project Image 1')
//     fireEvent.click(img)
//     const modalImg = screen.getByAltText('Enlarged project image')
//     expect(modalImg).toBeInTheDocument()
//     expect(modalImg).toHaveAttribute('src', mockImages[0])
//   })

//   it('closes modal when clicking outside image', () => {
//     render(<ImageGallery images={mockImages} />)
//     fireEvent.click(screen.getByAltText('Project Image 1'))
//     fireEvent.click(
//       screen.getByAltText('Enlarged project image').parentElement!,
//     )
//     expect(
//       screen.queryByAltText('Enlarged project image'),
//     ).not.toBeInTheDocument()
//   })

//   it('closes modal when clicking close button', () => {
//     render(<ImageGallery images={mockImages} />)
//     fireEvent.click(screen.getByAltText('Project Image 1'))
//     const closeBtn = screen.getByLabelText('Close image')
//     fireEvent.click(closeBtn)
//     expect(
//       screen.queryByAltText('Enlarged project image'),
//     ).not.toBeInTheDocument()
//   })

//   it('does not propagate modal close on close button click', async () => {
//     render(<ImageGallery images={mockImages} />)
//     const user = userEvent.setup()
//     await user.click(screen.getByAltText('Project Image 1'))

//     const closeBtn = screen.getByLabelText('Close image')

//     const stopPropagationSpy = jest.fn()

//     closeBtn.addEventListener('click', (e) => {
//       stopPropagationSpy()
//       e.stopPropagation()
//     })

//     await user.click(closeBtn)

//     expect(stopPropagationSpy).toHaveBeenCalled()
//   })
// })
