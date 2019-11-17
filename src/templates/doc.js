import React from "react"

const doc = data => {
  const __html = data.pageResources.json.pageContext.content
  const template = { __html }
  return (
    <div>
      <span dangerouslySetInnerHTML={template}></span>
    </div>
  )
}

export default doc
