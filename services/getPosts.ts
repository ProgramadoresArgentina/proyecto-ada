// Se utiliza mockapi.io por ahora mientras no se tenga el endpoint a la base de datos
// la API trae 100 posts con data random y campos personalizables
const mockApiURL = 'https://6430ba593adb1596515f492e.mockapi.io/post/'

const getPosts = async (id?: string | string[]) => {
  try {
    const url = id ? mockApiURL + id : mockApiURL
    const res = await fetch(url)
    const res_1 = await res.json()
    return res_1
  } catch (err) {
    throw new Error(err)
  }
}

export default getPosts
