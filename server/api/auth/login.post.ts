import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const { paktumApiUrl } = useRuntimeConfig(event)
    const { username, password } = await readBody(event)

    const response = await $fetch(`${paktumApiUrl}/users/login`, {
        method: 'POST',
        body: {
            username: username,
            password: password,
        },
    })

    return response
})
