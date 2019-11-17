import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

const Pages = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { eq: "html" } }) {
        nodes {
          name
        }
      }
    }
  `)

  const pages = data.allFile.nodes.map(page => page.name).sort()
  const [currentPage, setCurrentPage] = useState(0)
  const prev = () =>
    setCurrentPage(page => (page === 0 ? pages.length - 1 : --page))
  const next = () =>
    setCurrentPage(page => (page === pages.length - 1 ? 0 : ++page))

  function moi(prop) {
    const full = prop.target.contentDocument.baseURI
    const base = window.location.href
    const delta = full.replace(base, "")
    const newPage = pages.findIndex(page => page === delta)
    setCurrentPage(newPage)
  }

  const url = "http://localhost:8000/" + pages[currentPage]
  return (
    <div>
      <iframe width="100%" title="moi" src={url} onLoad={moi} />
      <div>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default Pages
