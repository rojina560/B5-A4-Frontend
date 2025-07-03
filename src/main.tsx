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
            borderLeft: "4px solid white",
            background: "#9654f8",
            color: "#fff",
            padding: "16px",
          },
          className: "shadow-lg rounded-lg",
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
