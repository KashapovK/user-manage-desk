import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import App from "./app/app"
import EditPage from "./pages/edit"
import MainPage from "./pages/main"
import { StrictMode } from "react"
import { AppProviders } from "./services/providers"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders >
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
)
