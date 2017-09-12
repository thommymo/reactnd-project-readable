const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => data.categories)
    //.then(({ hits }) => hits.map(({ recipe }) => recipe))

    /*export function fetchRecipes (food = '') {
      food = food.trim()

      return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
        .then((res) => res.json())
        .then(({ hits }) => hits.map(({ recipe }) => recipe))
    }*/




/*export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())*/
