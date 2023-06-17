import API from '..'

const getOrigin = async ({ url }) => {
  try {
    const response = await API.get(`/urls/${url}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message)
  }
}

const create = async ({ title, url, token }) => {
  try {
    const response = await API.post('/urls', {
      title,
      origin: url,
      token
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

const listRanking = async () => {
  try {
    const response = await API.get('/urls')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message)
  }
}

const listByUser = async ({ token }) => {
  try {
    const response = await API.get('/urls/me', {
      params: { token }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message)
  }
}

const deleteUrl = async ({ id, token }) => {
  try {
    const response = await API.delete(`/urls/${id}`, {
      params: { token }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message)
  }
}

export default {
  getOrigin,
  create,
  listRanking,
  listByUser,
  deleteUrl
}
