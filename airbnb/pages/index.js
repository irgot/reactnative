import Head from 'next/head'
import BannerComponent from '../components/BannerComponent'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import SmallCard from '../components/SmallCard'

export default function Home({ exploreData, cardsData }) {
    return (
        <div className="">
            <Head>
                <title>Airbnb</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderComponent />
            <BannerComponent />
            <main className="max-w-7xl mx-auto px-8 sm:px-16">
                <section className="pt-6">
                    <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {exploreData?.map(({ img, distance, location }, index) => {
                            return (
                                <SmallCard key={index} img={img} distance={distance} location={location} />
                            )
                        })}
                    </div>
                </section>
                <section>
                    <h2 className="text-4xl font-semibold py-10">Live Anywhere</h2>
                    <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 ">
                        {cardsData?.map(({ img, title }, index) => {
                            return (
                                <MediumCard key={index} img={img} title={title} />
                            )
                        })}
                    </div>
                </section>
                <LargeCard
                    img="https://links.papareact.com/4cj"
                    title="The Greatest Outdoors"
                    description="Wishlists curated by Airbnb"
                    buttonText="Get inspired"
                />
            </main>
            <FooterComponent />
        </div>
    )
}


export async function getStaticProps() {
    const exploreData = await fetch('https://links.papareact.com/pyp').then(res => {
        return (res.json())
    })
    const cardsData = await fetch('https://links.papareact.com/zp1').then(res => {
        return (res.json())
    })

    return {
        props: {
            exploreData,
            cardsData
        }
    }
}