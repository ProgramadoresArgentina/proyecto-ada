import { NextPage } from 'next';
import Navbar from '../components/Navbar';
const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <h1 className='text-3xl font-bold underline'>Hello World!</h1>
    </div>
  )
}

export default Home;
