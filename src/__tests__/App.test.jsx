import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (url.includes('/directors') && options?.method === 'PATCH') {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'Christopher Nolan',
          bio: 'Director of mind-bending films.',
          movies: [
            {
              id: 'm1',
              title: 'Inception',
              time: 148,
              genres: ['Sci-Fi', 'Thriller'],
            },
            {
              id: 'm2',
              title: 'New Movie',
              time: 120,
              genres: ['Drama'],
            },
          ],
        }),
      })
    }

    // GET request to fetch all directors
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'Christopher Nolan',
            bio: 'Director of mind-bending films.',
            movies: [{ id: 'm1', title: 'Inception', time: 148, genres: ['Sci-Fi', 'Thriller'] }],
          },
        ],
      })
    }
  })

  window.history.pushState({}, '', '/')
})

describe('🎬 Movie Directory App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    renderWithRouter()
    expect(await screen.findByText(/Welcome to the Movie Directory/i)).toBeInTheDocument()
  })

  it('navigates to About page when clicking About link', async () => {
    renderWithRouter()
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
    const aboutLink = within(navbar).getByRole('link', { name: /^About$/i })
    fireEvent.click(aboutLink)

    await waitFor(() => {
      expect(screen.getByText(/About the Movie Directory/i)).toBeInTheDocument()
    })
  })

  it('displays directors list at "/directors"', async () => {
    window.history.pushState({}, '', '/directors')
    renderWithRouter()
    expect(await screen.findByText(/Christopher Nolan/i)).toBeInTheDocument()
  })

  it('navigates to DirectorForm on "/directors/new"', async () => {
    window.history.pushState({}, '', '/directors/new')
    renderWithRouter()
    expect(await screen.findByText(/Add New Director/i)).toBeInTheDocument()
  })

  it('navigates to a specific DirectorCard page', async () => {
    window.history.pushState({}, '', '/directors/1')
    renderWithRouter()
    expect(await screen.findByText(/Director of mind-bending films/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Inception/i })).toBeInTheDocument()
  })

  it('navigates to MovieForm at "/directors/1/movies/new"', async () => {
    window.history.pushState({}, '', '/directors/1/movies/new')
    renderWithRouter()
    expect(await screen.findByText(/Add New Movie/i)).toBeInTheDocument()
  })

  it('renders MovieCard details correctly', async () => {
    window.history.pushState({}, '', '/directors/1/movies/m1')
    renderWithRouter()
    const movieTitle = await screen.findAllByText(/Inception/i)
    expect(movieTitle[1]).toBeInTheDocument()
    expect(await screen.findByText(/Duration: 148 minutes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sci-Fi, Thriller/i)).toBeInTheDocument()
  })

  it('handles invalid director ID gracefully', async () => {
    window.history.pushState({}, '', '/directors/999')
    renderWithRouter()
    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument()
  })

  it('handles invalid movie ID gracefully', async () => {
    window.history.pushState({}, '', '/directors/1/movies/invalid')
    renderWithRouter()
    expect(await screen.findByText(/Movie not found/i)).toBeInTheDocument()
  })
})
