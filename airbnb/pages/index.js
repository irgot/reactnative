import Head from 'next/head'
import HeaderComponent from '../components/HeaderComponent'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent></HeaderComponent>
      {/* Banner */}
    </div>
  )
}
