import { Spinner } from '../components/Spinner';

export default function PageLoader() {
  return (
    <div className='bg-gray-0 fixed top-0 left-0 w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  )
}