/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allFile(filter: { extension: { eq: "html" } }) {
        nodes {
          name
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("failed to get html files", result.errors)
  }

  const docs = result.data.allFile.nodes
  for (const doc of docs) {
    const html = await readFile(
      __dirname + "/src/my/" + doc.name + ".html",
      "utf8"
    )
    actions.createPage({
      path: doc.name,
      component: require.resolve("./src/templates/doc.js"),
      context: {
        name: doc.name,
        content: html,
      },
    })
  }
}
