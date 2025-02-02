export const xmlGetHttpRequest = async url => {
  return new Promise(res => {
    try {
      const request = new XMLHttpRequest()

      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) res({ data: request.responseText })
          else res({ error: String(request.status) })
        }
      }

      request.open("GET", url, true)
      request.send()
    } catch (e) {
      res({ error: String(e) })
    }
  })
}
