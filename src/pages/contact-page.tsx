import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../ui/ui-contact.css'

interface contactFormValues {
  fullName: string
  subject: string
  email: string
  message: string
}

interface contactFormErrors {
  fullName?: string
  subject?: string
  email?: string
  message?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validate(values: contactFormValues): contactFormErrors {
  const errors: contactFormErrors = {}

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.'
  }

  if (!isValidEmail(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

export default function ContactPage() {
  const [values, setValues] = useState<contactFormValues>({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<contactFormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const hasErrors = Object.keys(nextErrors).length > 0
    setIsSubmitted(!hasErrors)

    if (!hasErrors) {
      setValues({ fullName: '', subject: '', email: '', message: '' })
    }
  }

  return (
    <div className="ui-contact-wrap">
      <Link className="ui-back-link" to="/">
        ← Back to shop
      </Link>

      <h1 className="h3 mb-0">Contact</h1>
      <p className="ui-contact-subtitle">Need help choosing a gift? We reply within 24 hours.</p>

      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          Message sent (demo). Thanks!
        </div>
      ) : null}

      <h2 className="h5 ui-contact-section-title">Send us a message</h2>

      <form className="ui-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="fullName">
            Full name
          </label>
          <input
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            type="text"
            autoComplete="name"
          />
          {errors.fullName ? <div className="invalid-feedback">{errors.fullName}</div> : null}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="subject">
            Subject
          </label>
          <input
            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            type="text"
          />
          {errors.subject ? <div className="invalid-feedback">{errors.subject}</div> : null}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            autoComplete="email"
          />
          {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={6}
          />
          {errors.message ? <div className="invalid-feedback">{errors.message}</div> : null}
        </div>

        <div className="ui-contact-actions">
          <button className="ui-btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
