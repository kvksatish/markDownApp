import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./Redux/store/store.ts"

/**
 * Renders the main application component.
 *
 * @remarks
 * This function is responsible for rendering the root component of the application.
 * It wraps the `App` component with the `Provider` component from `react-redux` to provide the Redux store.
 *
 * @returns void
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
