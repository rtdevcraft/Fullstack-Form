'use client'

import { useState, useEffect } from 'react'

interface Submission {
  id: number
  name: string
  email: string
  message: string
  timestamp: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/submissions')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch submissions')
        }
        const data: Submission[] = await response.json()
        setSubmissions(data)
      } catch (err) {
        console.error('Error fetching submissions:', err)
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <div className='container p-4 mx-auto md:p-8'>
      <h1 className='mb-6 text-3xl font-bold text-cyan-700'>
        Form Submissions
      </h1>

      {loading && (
        <div className='flex items-center justify-center p-6 bg-white rounded-lg shadow'>
          <svg
            className='w-8 h-8 mr-3 text-cyan-500 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p className='text-lg text-gray-600'>Loading submissions...</p>
        </div>
      )}
      {error && (
        <div
          className='p-4 mb-4 text-red-800 bg-red-100 border border-red-400 rounded'
          role='alert'
        >
          <p className='font-bold'>Error:</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && submissions.length === 0 && (
        <div className='p-6 text-center bg-white rounded-lg shadow'>
          <p className='text-lg text-gray-500'>No submissions yet.</p>
        </div>
      )}

      {/* Mobile/Small Screen: Card View */}
      {!loading && !error && submissions.length > 0 ? (
        <div className='space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0'>
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className='p-4 bg-white border rounded-lg shadow border-cyan-200'
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-semibold text-cyan-600'>
                  ID: {submission.id}
                </span>
                <span className='text-xs text-gray-500'>
                  {new Date(submission.timestamp).toLocaleString()}
                </span>
              </div>
              <p className='mb-1'>
                <strong className='text-gray-700'>Name:</strong>{' '}
                {submission.name}
              </p>
              <p className='mb-1'>
                <strong className='text-gray-700'>Email:</strong>{' '}
                <a
                  href={`mailto:${submission.email}`}
                  className='text-cyan-600 hover:underline'
                >
                  {submission.email}
                </a>
              </p>
              <p className='mt-2 text-sm text-gray-600'>
                <strong className='block mb-1 text-gray-700'>Message:</strong>
                {submission.message}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
