import axios from 'axios'

export default async function getPublicIP () {
  try {
    const response = await axios.get('https://api.ipify.org?format=json')
    return response.data.ip
  } catch (error) {
    console.error(error)
    return 'error getting data'
  }
}
