import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ROUTES } from './models'
import { GiftPage } from './pages/Gift'
import { Home } from './pages/Home'
import { NotFoundPage } from './pages/NotFoundPage'

const App = () => {
  return (
    <>
      <Header />
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path={ROUTES.HOME_PAGE} element={<Home />} />
          <Route path={ROUTES.GIFT_PAGE} element={<GiftPage />} />
          <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
