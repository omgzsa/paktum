export default defineEventHandler(async (event) => {

    const { username, password } = await readBody(event);
  
    try {
      const response = await $fetch('http://paktum.zsoltegressy.eu/api/users/login', {
        method: 'POST',
        body: {
          username: username,
          password: password,
        },
      });

      return response;

    } catch (error) {
      console.log(error);
      throw createError({
        status: 401,
        statusMessage: 'The username or password you entered is incorrect',
      })
    }
})
