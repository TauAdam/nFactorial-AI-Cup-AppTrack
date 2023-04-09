import { Link } from 'react-router-dom'
import { ROUTES } from '../../models'

export const Header = () => {
  return (
    <header>
      <header className="flex items-center justify-between p-4 bg-gray-100">
        <Link to={ROUTES.HOME_PAGE}>
          <img src="/gift-card-48.png" alt="logo" className="object-contain" />
        </Link>

        <Link
          to={ROUTES.GIFT_PAGE}
          className="font-inter font-medium bg-[#ee5a4f] text-white px-4 py-2 rounded-md"
        >
          Get Gift
        </Link>
      </header>
    </header>
  )
}
