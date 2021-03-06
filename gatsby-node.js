/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const indexPath = "/estruturas-de-dados"

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        limit: 1000
      ) {
        edges {
          node {
             frontmatter {
               slug
             }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query (markdown).`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: {
	slug: node.frontmatter.slug,
      },
    })
  })
}
