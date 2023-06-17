import API from '..'

const login = async ({ email, password }) => {
  try {
    const response = await API.post('/users/login', {
      email,
      password
    })

    return response.data
  } catch (error) {
    if (error.response?.data?.fields) {
      const fields = error.response.data.fields
      const fieldsKeys = Object.keys(fields)
      for (const field of fieldsKeys) {
        const message = fields[field]
        throw new Error(`${field}: ${message}`)
      }
    }

    throw new Error(error.response?.data?.error || error.message)
  }
}

const create = async ({ name, email, password }) => {
  try {
    const response = await API.post('/users', {
      name,
      email,
      password
    })

    return response.data
  } catch (error) {
    if (error.response?.data?.fields) {
      const fields = error.response.data.fields
      const fieldsKeys = Object.keys(fields)
      for (const field of fieldsKeys) {
        const message = fields[field]
        throw new Error(`${field}: ${message}`)
      }
    }

    throw new Error(error.response?.data?.error || error.message)
  }
}

export default {
  login,
  create
}
