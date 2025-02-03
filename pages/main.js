//import { xmlGetHttpRequest } from "./xml-get-http-request.js"
//import {getGistFirstFileText} from "./get-gist-first-file-text.js"

const gistUrl = 'https://gist.github.com/sturmenta/df1c9da1f219c88e996e48f19d57acd3';

const {data, error} = /*await*/ getGistFirstFileText(`${gistUrl}.json`);

console.log(data);


const getGistFirstFileText = async url => {
    return new Promise(async res => {
      try {
        const { data: gistData, error: gistError } = await xmlGetHttpRequest(url)
        if (gistError) res({ error: gistError })
        // ─────────────────────────────────────────────────────
        // 1. find raw link
        const html = JSON.parse(gistData).div
                                                                  console.log(html)
        let rawLink = ""
        html.split('href="').forEach(text => {
          const link = text.split('"')[0]
                                                                  console.log(link)
          if (link.includes("/raw/")) rawLink = link
        })
        if (!rawLink) res({ error: "raw link not found" })
        // ─────────────────────────────────────────────────────
        // 2. get raw text
        const { data: rawData, error: rawError } = await xmlGetHttpRequest(
          rawLink
        )
        if (rawError) res({ error: rawError })
        // ─────────────────────────────────────────────────────
  
        res({ data: rawData })
                                                                  console.log(data)
      } catch (e) {
        res({ error: String(e) })
      }
    })
  }
  const xmlGetHttpRequest = async url => {
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
  