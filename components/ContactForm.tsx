'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Submitting...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' }) // Clear form
      } else {
        setStatus(`Error: ${result.message || 'Failed to send message'}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('Error: Failed to send message. Please try again.')
    }
  }

  const handleInvalid = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 820)
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
      className={`w-full max-w-xl p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md md:p-8 ${
        isShaking ? 'shake' : ''
      }`}
    >
      <h2 className='mb-6 text-xl font-semibold text-center text-gray-800 md:text-2xl'>
        Contact Us
      </h2>

      <div className='relative mt-1'>
        <input
          type='text'
          name='name'
          id='name'
          required
          value={formData.name}
          onChange={handleChange}
          className='block w-full px-3 pt-6 pb-2 placeholder-transparent border border-gray-300 rounded-md shadow-sm peer focus:outline-none focus:ring-cyan-500 focus:border-cyan-500'
          placeholder=' '
        />
        <label
          htmlFor='name'
          className='absolute text-sm text-gray-600 transition-all duration-200 ease-in-out pointer-events-none left-3 top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-gray-600 peer-focus:text-sm'
        >
          Name
        </label>
      </div>

      <div className='relative mt-1'>
        <input
          type='email'
          name='email'
          id='email'
          required
          value={formData.email}
          onChange={handleChange}
          className='block w-full px-3 pt-6 pb-2 placeholder-transparent border border-gray-300 rounded-md shadow-sm peer focus:outline-none focus:ring-cyan-500 focus:border-cyan-500'
          placeholder=' '
        />
        <label
          htmlFor='email'
          className='absolute text-sm text-gray-600 transition-all duration-200 ease-in-out pointer-events-none left-3 top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-gray-600 peer-focus:text-sm'
        >
          Email
        </label>
      </div>

      <div className='relative mt-1'>
        <textarea
          name='message'
          id='message'
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className='block w-full px-3 pt-6 pb-2 placeholder-transparent border border-gray-300 rounded-md shadow-sm peer focus:outline-none focus:ring-cyan-500 focus:border-cyan-500'
          placeholder=' '
        />
        <label
          htmlFor='message'
          className='absolute text-sm text-gray-600 transition-all duration-200 ease-in-out pointer-events-none left-3 top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-gray-600 peer-focus:text-sm'
        >
          Message
        </label>
      </div>

      <div>
        <button
          type='submit'
          className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
        >
          Submit
        </button>
      </div>

      {status && (
        <p className='mt-4 text-sm text-center text-gray-600'>{status}</p>
      )}
    </form>
  )
}
