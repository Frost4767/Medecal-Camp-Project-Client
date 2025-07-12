import axios from 'axios'

// upload image and return image url
export const imageUpload = async imageData => {
  const imageFormData = new FormData()
  imageFormData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
    imageFormData
  )
  // image url response from imgbb
  return data?.data?.display_url
}

// save or update user in db
export const saveUserInDb = async user => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/user`,
    user
  )

}