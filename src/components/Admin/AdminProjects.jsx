
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../data/firebase'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaFolderOpen,
  FaGithub,
  FaExternalLinkAlt,
  FaSyncAlt,
} from 'react-icons/fa'
import '../../styles/Admin.css'

const emptyForm = {
  title: '',
  description: '',
  tech: '',
  github: '',
  demo: '',
  category: 'Web',
}

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Load all projects from Firebase
  const fetchProjects = async () => {
    setLoading(true)
    setError('')

    try {
      const snapshot = await getDocs(
        collection(db, 'projects')
      )

      const data = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }))

      data.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      )

      setProjects(data)
    } catch (err) {
      console.error('Error loading projects:', err)
      setError('Could not load projects. Check Firebase permissions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Open new project form
  const handleAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setError('')
    setSuccess('')
    setShowForm(true)
  }

  // Open edit form with existing project data
  const handleEdit = (project) => {
    setEditingId(project.id)

    setForm({
      title: project.title || '',
      description: project.description || '',
      tech: Array.isArray(project.tech)
        ? project.tech.join(', ')
        : project.tech || '',
      github: project.github || '',
      demo: project.demo || '',
      category: project.category || 'Web',
    })

    setError('')
    setSuccess('')
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Close form
  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setForm({ ...emptyForm })
    setError('')
  }

  // Add or update project
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      setError('Please complete all required fields.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      github: form.github.trim(),
      demo: form.demo.trim(),
      category: form.category,
    }

    try {
      if (editingId) {
        // Update existing project
        await updateDoc(
          doc(db, 'projects', editingId),
          {
            ...projectData,
            updatedAt: serverTimestamp(),
          }
        )

        setSuccess('Project updated successfully!')
      } else {
        // Add new project
        await addDoc(
          collection(db, 'projects'),
          {
            ...projectData,
            createdAt: serverTimestamp(),
          }
        )

        setSuccess('Project added successfully!')
      }

      setShowForm(false)
      setEditingId(null)
      setForm({ ...emptyForm })

      await fetchProjects()
    } catch (err) {
      console.error('Error saving project:', err)
      setError('Could not save project. Check Firebase permissions.')
    } finally {
      setSaving(false)
    }
  }

  // Delete project
  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    )

    if (!confirmed) return

    setError('')
    setSuccess('')

    try {
      await deleteDoc(
        doc(db, 'projects', project.id)
      )

      setProjects((previous) =>
        previous.filter((item) => item.id !== project.id)
      )

      if (editingId === project.id) {
        handleCancel()
      }

      setSuccess('Project deleted successfully!')
    } catch (err) {
      console.error('Error deleting project:', err)
      setError('Could not delete project.')
    }
  }

  if (loading) {
    return (
      <p className="admin-loading">
        Loading projects...
      </p>
    )
  }

  return (
    <div className="admin-projects">

      {/* Statistics */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>
            <FaFolderOpen />
          </span>
          <h3>{projects.length}</h3>
          <p>Total Projects</p>
        </div>

        <div className="admin-stat-card">
          <span>🌐</span>
          <h3>
            {projects.filter(
              (project) => project.category === 'Web'
            ).length}
          </h3>
          <p>Web Projects</p>
        </div>

        <div className="admin-stat-card">
          <span>🎨</span>
          <h3>
            {projects.filter(
              (project) => project.category === 'Design'
            ).length}
          </h3>
          <p>Design Projects</p>
        </div>

        <div className="admin-stat-card">
          <span>✨</span>
          <h3>
            {projects.filter(
              (project) => project.category === '3D'
            ).length}
          </h3>
          <p>3D Projects</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          style={{
            color: '#4ade80',
            marginBottom: '20px',
          }}
        >
          {success}
        </p>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <button
          className="admin-add-btn"
          onClick={showForm ? handleCancel : handleAdd}
          style={{ marginBottom: 0 }}
        >
          {showForm ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaPlus /> Add Project
            </>
          )}
        </button>

        <button
          className="admin-add-btn"
          onClick={fetchProjects}
          style={{ marginBottom: 0 }}
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <h2
            style={{
              color: '#fff',
              marginTop: 0,
              marginBottom: '24px',
            }}
          >
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>

          <div className="admin-field">
            <label htmlFor="project-title">
              Project Title
            </label>

            <input
              id="project-title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="project-description">
              Description
            </label>

            <textarea
              id="project-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project"
              rows={5}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="project-tech">
              Technologies
            </label>

            <input
              id="project-tech"
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
              <label htmlFor="project-github">
                <FaGithub /> GitHub URL
              </label>

              <input
                id="project-github"
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="admin-field">
              <label htmlFor="project-demo">
                <FaExternalLinkAlt /> Live Demo URL
              </label>

              <input
                id="project-demo"
                type="url"
                name="demo"
                value={form.demo}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="project-category">
              Category
            </label>

            <select
              id="project-category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Web">Web</option>
              <option value="3D">3D</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              type="submit"
              className="admin-btn"
              disabled={saving}
              style={{ flex: '1 1 180px', width: 'auto' }}
            >
              <FaSave />
              {saving
                ? 'Saving...'
                : editingId
                  ? 'Save Changes'
                  : 'Add Project'}
            </button>

            <button
              type="button"
              className="admin-add-btn"
              onClick={handleCancel}
              disabled={saving}
              style={{
                marginBottom: 0,
                flex: '0 0 auto',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Project Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <strong>{project.title}</strong>
                </td>

                <td>{project.category}</td>

                <td>
                  {Array.isArray(project.tech)
                    ? project.tech.join(', ')
                    : project.tech || '—'}
                </td>

                <td>
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                    }}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub for ${project.title}`}
                        style={{ color: '#a78bfa' }}
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Demo for ${project.title}`}
                        style={{ color: '#a78bfa' }}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </td>

                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-action-btn approve"
                      onClick={() => handleEdit(project)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="admin-action-btn delete"
                      onClick={() => handleDelete(project)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <p className="admin-empty">
            No Firebase projects found.
          </p>
        )}
      </div>
    </div>
  )
}

export default AdminProjects
