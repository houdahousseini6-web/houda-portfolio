import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../data/firebase'
import '../../styles/Admin.css'

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    demo: '',
    category: 'Web',
  })

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'projects'))
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'projects'), {
        ...form,
        tech: form.tech.split(',').map((t) => t.trim()),
        createdAt: serverTimestamp(),
      })
      setForm({
        title: '',
        description: '',
        tech: '',
        github: '',
        demo: '',
        category: 'Web',
      })
      setShowForm(false)
      fetchProjects()
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id))
        setProjects(projects.filter((p) => p.id !== id))
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  if (loading) return <p className="admin-loading">Loading projects...</p>

  return (
    <div className="admin-projects">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>📦</span>
          <h3>{projects.length}</h3>
          <p>Total Projects</p>
        </div>
      </div>

      <button
        className="admin-add-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? '✕ Cancel' : '+ Add Project'}
      </button>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              required
            />
          </div>

          <div className="admin-field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Project description"
              rows="3"
              required
            />
          </div>

          <div className="admin-field">
            <label>Tech (comma separated)</label>
            <input
              type="text"
              name="tech"
              value={form.tech}
              onChange={handleChange}
              placeholder="React, JavaScript, CSS"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label>GitHub Link</label>
              <input
                type="text"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="admin-field">
              <label>Live Demo Link</label>
              <input
                type="text"
                name="demo"
                value={form.demo}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="admin-field">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Web">Web</option>
              <option value="3D">3D</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <button type="submit" className="admin-btn">
            Add Project
          </button>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tech</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.category}</td>
                <td>
                  {Array.isArray(project.tech)
                    ? project.tech.join(', ')
                    : project.tech}
                </td>
                <td>
                  <button
                    className="admin-action-btn delete"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProjects