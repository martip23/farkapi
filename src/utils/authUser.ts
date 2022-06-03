import axios from 'axios'

export const getSelfData = (token: string, discordId: number) => {
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${discordId}`
  const headers = { Authorization: `Bearer ${token}` }
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}
