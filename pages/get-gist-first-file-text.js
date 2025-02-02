export const getGistFirstFileText = async url => {
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

