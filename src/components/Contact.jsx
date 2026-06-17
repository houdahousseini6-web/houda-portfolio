import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { contactInfo } from '../data/data'
import { FaPaperPlane } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import '../styles/Contact.css'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-container">
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">GET IN TOUCH</span>
</div>            <h2 className="section-title">
              Let's create something <span className="gradient-text">amazing</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="contact-grid">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="contact-left">
              <h3>Have a project in mind?</h3>
              <p>
                I'm always excited to work on new projects and collaborate with
                amazing people. Let's turn your vision into reality.
              </p>

              <div className="contact-cards">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <a key={index} href={item.href} className="contact-card" target="_blank" rel="noreferrer">
                      <div className="contact-card-icon">
                        <Icon />
                      </div>
                      <div>
                        <span className="contact-card-label">{item.label}</span>
                        <span className="contact-card-value">{item.value}</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <form className="contact-form-new" onSubmit={handleSubmit}>
              {sent && (
                <div className="sent-message">
                  <span>✨</span> Message sent successfully!
                </div>
              )}

              <div className="form-row">
                <div className="form-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project subject"
                  required
                />
              </div>

              <div className="form-field">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className="send-btn">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact