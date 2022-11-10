import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PUBLIC from './routes/public.routes'
import PRIVATE from './routes/private.routes'
import { AuthGuard } from './guards/auth.guards'
import { Provider } from 'react-redux'
import store from './redux/storeage'
import CreateUser from './pages/CrateUser/CreateUser'
import { Suspense, lazy } from 'react'
import Spinner from './components/Spinner'
function App() {

  const Login = lazy(() => import('./pages/Login/Login'))
  const Private = lazy(() => import('./pages/Private/Private'))
  return (

    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-cyan-200">
      <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Spinner /></div>}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Navigate to={PRIVATE.PRIVATE} />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PRIVATE.PRIVATE}/*`} element={<Private />} />
              </Route>
              <Route path={PUBLIC.LOGIN} element={<Login />} />
              <Route path={PUBLIC.CREATE} element={<CreateUser />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App
