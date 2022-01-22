import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services' 
import { FeaturedPosts } from '../sections'
/*const posts = [
  {
    title:'React Testomg',
    excerpt:'Learn React Testing'
  },
  {
    title:'React with Tailwind',
    excerpt:'Learn React with Tailwind'
  }
]*/

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {
          posts.map(( post ) =>(
            <PostCard post={ post.node } key={ post.title } />
          ))
          }
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
     
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = (await getPosts()) || []  //ako nema podataka bice prazan string
  return {
    props: { posts }
  }
}
