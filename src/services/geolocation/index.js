function getGeolocation() {
  const geolocation = navigator.geolocation

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Geolocation not Supported'))
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, () => {
      reject(new Error('Permission denied'))
    })
  })

  return location
}

const geolocationService = {
  getGeolocation
}

export default geolocationService
