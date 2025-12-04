// scripts/print-posts.js
import {getCliClient} from 'sanity/cli'

async function main() {
  const client = getCliClient()
  const query = '*[_type == "post"]'
  const posts = await client.fetch(query)
  console.log('Posts:', JSON.stringify(posts, null, 2))
}

main().catch(console.error)
