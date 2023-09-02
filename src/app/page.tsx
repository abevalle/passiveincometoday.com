import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Footer from "./footer"

export default function Home() {
  return (
    <section className="flex text-center items-center justify-center min-w-screen min-h-screen bg-gray-900">
      <div className='dark:bg-gray-700 p-12 rounded shadow'>
        <h1 className="dark:text-white md:text-6xl text-3xl mb-2">Coming Soon!</h1>
        <h1 className="dark:text-white text-xl mb-5">Passive Income Today</h1>
        <p className="dark:text-white text-sm">Learn about the passive income industry through the eyes of a prospective earner</p>
      </div>
      <Footer/>
    </section>
  )
}
