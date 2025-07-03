import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import router from './routes'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        theme="light"
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
            background: "#9654f8",
            color: "#fff",
          },
          className: "shadow-lg rounded-lg text-center flex justify-center item center",
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
