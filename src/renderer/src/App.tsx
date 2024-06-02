import * as React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'

// Others
import router from './routes'
import store from './app/store'

const App: React.FC = () => {
  return (
    <ThemeProvider //
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default App
