import { Link } from 'react-router-dom'
import { ROUTES } from '../../models'

export const NotFoundPage = () => {
  return (
    <div id='error-page'>
      <h1>Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <h2 className='text-gray-700 font-bold hover:text-black text-3xl'>
        <Link to={ROUTES.HOME_PAGE}>Return to Main Page</Link>
      </h2>
    </div>
  )
}
