export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { id } = getRouterParams(event);

  const user = {
    id: id,
    name: 'John Doe',
    email: 'john@doe.com',
  }

  return user;
})
