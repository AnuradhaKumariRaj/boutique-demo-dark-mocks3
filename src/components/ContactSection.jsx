import { useState } from 'react'

const EMAILJS_PUBLIC_KEY = 'VaX-AUZNrR5wfEdKG'
const EMAILJS_SERVICE_ID = 'service_2jevjvo'
const EMAILJS_TEMPLATE_ID = 'template_k4hw2qr'

export function ContactSection({
  contact,
  heading = 'Talk to the boutique team for orders, customisation, and delivery updates.',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
  })
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({
      status: 'loading',
      message: 'Sending your request...',
    })

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            user_name: formData.name,
            user_email: formData.email,
            message: formData.request,
            boutique_phone: contact.phone,
            boutique_email: contact.email,
            to_email: 'anu.coding.classes@gmail.com',
            reply_to: formData.email,
            from_name: formData.name,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Unable to send your request right now.')
      }

      setSubmitState({
        status: 'success',
        message: 'Your request was sent successfully. We will get back to you soon.',
      })
      setFormData({
        name: '',
        email: '',
        request: '',
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Your request could not be sent. Please try again in a moment.',
      })
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <p className="eyebrow">Contact</p>
        <h1>{heading}</h1>
        <ul className="contact-list">
          <li>Location: {contact.location}</li>
          <li>Phone: {contact.phone}</li>
          <li>Email: {contact.email}</li>
          <li>Availability: {contact.hours}</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your email
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          What are you shopping for?
          <textarea
            name="request"
            rows="4"
            placeholder="Bride to be, mom to be, delivery date, size guidance, bulk order..."
            value={formData.request}
            onChange={handleChange}
            required
          />
        </label>
        <button className="primary-button" type="submit">
          Request styling help
        </button>
        {submitState.status !== 'idle' ? (
          <p className={`form-status form-status-${submitState.status}`}>{submitState.message}</p>
        ) : null}
      </form>
    </section>
  )
}
