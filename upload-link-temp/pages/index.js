import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react';
import { CloudUploadIcon } from "@heroicons/react/outline";


export default function Home() {

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Gerador de links para download</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center ">
                <h1 className="text-3xl">
                    Gerador de links para downloads
                </h1>
                <div>
                    <label
                        className="mt-10 w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-out transition-all duration-200">
                        <CloudUploadIcon className="w-24" />
                        {/* <FontAwesomeIcon icon={faCloudUploadAlt} width="100" /> */}

                        <span className="mt-2 text-base leading-normal">Selecionar Arquivo</span>
                        <input type='file' className="hidden" />
                    </label>
                </div>
            </main>
        </div>
    )
}


// export async function getStaticProps(context) {
//     return {
//         redirect: {
//             destination: '/login',
//             permanent: false,
//         }
//     }
// }
