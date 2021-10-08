// add bootstrap css 
// import 'bootstrap/dist/css/bootstrap.css'
// own css files here
import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../contexts/AuthContext";


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
