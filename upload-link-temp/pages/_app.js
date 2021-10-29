// add bootstrap css 
// import 'bootstrap/dist/css/bootstrap.css'
// own css files here
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../contexts/AuthContext";
import DashboardLayout from '../layouts/DashboardLayout';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  if (router.pathname.startsWith('/auth')) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  } else {

    return (
      <AuthProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </AuthProvider>
    )
  }
}

export default MyApp
