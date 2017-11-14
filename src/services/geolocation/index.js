function getGeolocation() {
  const geolocation = navigator.geolocation
  let watchId = null

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Geolocation not supported'))
    }

    watchId = geolocation.watchPosition((position) => {
      resolve(position)
    }, () => {
      reject(new Error('Permission denied'))
    }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  })

  return location
}

const geolocationService = {
  getGeolocation
}

export default geolocationService
