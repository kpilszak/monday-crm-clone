import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CategoriesContext from '../context'

const TicketPage = ({ editMode }) => {
    const { categories, setCategories } = useContext(CategoriesContext)

    const [formData, setFormData] = useState({
        status: 'not started',
        progress: 0,
        category: categories[0],
        timestamp: new Date().toISOString()
    })

    const navigate = useNavigate()
    let { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (editMode) {
            const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
                data: formData
            })

            const success = response.status === 200
            if (success) {
                navigate('/')
            }
        }

        if (!editMode) {
            const response = await axios.post('http://localhost:8000/tickets', {
                formData
            })

            const success = response.status === 200
            if (success) {
                navigate('/')
            }
        }
    }

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/tickets/${id}`)
        setFormData(response.data.data)
    }

    useEffect(() => {
        if (editMode) fetchData()
    }, [])

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="ticket">
            <h1>{editMode ? 'Update your Ticket' : 'Create a Ticket'}</h1>
            <div className="ticket-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={FormData.title}
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={FormData.description}
                        />

                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category || 'New Category'}
                            onChange={handleChange}
                        >
                            {categories?.map((category, _index) => (
                                <option key={_index} value={category}>{category}</option>
                            ))}
                        </select>

                        <label htmlFor="new-category">New Category</label>
                        <input
                            id="new-category"
                            name="category"
                            type="text"
                            onChange={handleChange}
                            value={FormData.category}
                        />

                        <label>Priority</label>
                        <div className="multiple-input-container">
                            <input
                                id="priority-1"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={1}
                                checked={formData.priority == 1}
                            />
                            <label htmlFor="priority-1">1</label>
                            <input
                                id="priority-2"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={2}
                                checked={formData.priority == 2}
                            />
                            <label htmlFor="priority-2">2</label>
                            <input
                                id="priority-3"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={3}
                                checked={formData.priority == 3}
                            />
                            <label htmlFor="priority-3">3</label>
                            <input
                                id="priority-4"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={4}
                                checked={formData.priority == 4}
                            />
                            <label htmlFor="priority-4">4</label>
                            <input
                                id="priority-5"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={5}
                                checked={formData.priority == 5}
                            />
                            <label htmlFor="priority-5">5</label>
                        </div>

                        {editMode && <>
                        <input
                            type="range"
                            id="progress"
                            name="progress"
                            value={formData.progress}
                            min="0"
                            max="100"
                            onChange={handleChange}
                        />
                        <label htmlFor="progress">Progress</label>

                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.value}
                            onChange={handleChange}
                        >
                            <option selected={formData.status === 'done'} value='done'>Done</option>
                            <option selected={formData.status === 'working on it'} value='working on it'>Working on it</option>
                            <option selected={formData.status === 'stuck'} value='stuck'>Stuck</option>
                            <option selected={formData.status === 'not started'} value='not started'>Not Started</option>
                        </select>
                        </>
                        }

                        <input type="submit"/>
                    </section>
                    <section>
                        <label htmlFor="owner">Owner</label>
                        <input
                            id="owner"
                            name="owner"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={FormData.owner}
                        />
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            id="avatar"
                            name="avatar"
                            type="url"
                            onChange={handleChange}
                            required={true}
                            value={FormData.avatar}
                        />
                        <div className="img-preview">
                            {formData.avatar && (
                                <img src={formData.avatar} alt="preview"/>
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default TicketPage