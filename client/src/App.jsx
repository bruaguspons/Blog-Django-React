import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PUBLIC from './routes/public.routes'
import PRIVATE from './routes/private.routes'
import { AuthGuard } from './guards/auth.guards'
import Private from './pages/Private/Private'
import { Provider } from 'react-redux'
import store from './redux/storeage'
import CreateUser from './pages/CrateUser/CreateUser'
function App() {

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-cyan-200">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Navigate to={PRIVATE.PRIVATE} />} />
            <Route element={<AuthGuard />}>
              <Route path={PRIVATE.PRIVATE} element={<Private />} />
            </Route>
            <Route path={PUBLIC.LOGIN} element={<Login />} />
            <Route path={PUBLIC.CREATE} element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
