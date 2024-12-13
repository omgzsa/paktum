import  type { H3Event } from 'h3'

export const fetchFromApi = async (event: H3Event, path: string, options: any = {}) => {
  const config = useRuntimeConfig()
  const authHeader = event.node.req.headers.authorization
  
  try {
    return await $fetch(`${config.paktumApiUrl}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(authHeader ? { Authorization: authHeader } : {})
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'API request failed'
    })
  }
}
