export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const { id } = getRouterParams(event)
    const token = getCookie(event, 'auth_token')

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized: No token found',
        })
    }

    const user = await $fetch(
        `${config.paktumApiUrl}/users/getuserbyid?id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )

    return user
})
