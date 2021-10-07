import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/outline";
import axios from "axios";


export default function Home() {

    const router = useRouter();
    const [sending, setSending] = useState(false)
    const [file, setFile] = useState({})
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (!token) {
    //         router.push('/login')
    //     }
    // }, [])
    const fileSelectHandler = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        setSending(true)
        console.log(file)
        const fd = new FormData()
        fd.append('file', file, file.name)
        response = await axios.post('/api/upload', fd)
        console.log(response)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>Gerador de links para download</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 ">
                <h1 className="text-3xl">
                    Gerador de links para downloads
                </h1>
                <div className="flex flex-col items-center justify-center w-full p-0 m-0 ">
                    <form onSubmit={submitHandler}>
                        <label
                            className="flex flex-col items-center w-full px-4 py-6 mt-10 tracking-wide text-purple-600 uppercase transition-all duration-200 ease-out bg-white border rounded-md shadow-md cursor-pointer border-blue hover:bg-purple-600 hover:text-white">
                            <CloudUploadIcon className="w-24" />
                            {/* <FontAwesomeIcon icon={faCloudUploadAlt} width="100" /> */}

                            <span className="mt-2 text-base leading-normal">Selecionar Arquivo</span>
                            <input type='file' className="hidden" onChange={fileSelectHandler} />
                        </label>

                        {
                            file.name && (
                                <div className="flex flex-col items-center justify-center mt-5">
                                    <div className="flex gap-x-4">
                                        <h1 className="text-gray-400 ">{file.name}</h1>
                                        <h1>{(file.size / 1024 / 1024).toFixed(2)}Mb</h1>
                                        <button className="font-bold text-red-700 transition duration-200 ease-out rounded-md hover:bg-red-700 hover:text-white">
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                    <button type="submit" className="w-full py-2 mt-5 tracking-wide text-blue-900 uppercase transition-all duration-200 ease-out bg-white border rounded-md shadow-md cursor-pointer border-blue hover:bg-blue-900 hover:text-white">Enviar e Gerar Link</button>
                                </div>
                            )
                        }
                    </form>

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
