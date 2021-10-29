import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';



export default function Upload() {
    const [sending, setSending] = useState(false)
    const [file, setFile] = useState({})
    const [uploadProgress, setUploadProgress] = useState('')
    const fileSelectHandler = (event) => {
        // console.log(event.target.files[0])
        setFile(event.target.files[0])
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        setSending(true)
        // console.log(file)
        const fd = new FormData()
        fd.append('file', file, file.name)
        const response = await axios.post('/api/upload', fd, {
            "content-type": "multipart/form-data",
            onUploadProgress: progressEvent => {
                // console.log('Upload Progress: ' + ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + '%')
                setUploadProgress(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + '%')


            }
        })
        setSending(false)
        // console.log(`response: ${JSON.stringify(response)}`)
    }
    const trashFileHandler = (event) => {
        setFile({})
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
                        {
                            !file.name && (
                                <label
                                    className="flex  flex-col items-center px-4 py-6 mt-10 tracking-wide text-purple-600 uppercase transition-all duration-200 ease-out bg-white border rounded-md shadow-md cursor-pointer border-blue hover:bg-purple-600 hover:text-white">
                                    <CloudUploadIcon className="w-24" />
                                    {/* <FontAwesomeIcon icon={faCloudUploadAlt} width="100" /> */}

                                    <span className="mt-2  text-base leading-normal font-bold">Selecionar Arquivo</span>
                                    <input type='file' className="hidden" onChange={fileSelectHandler} />
                                </label>
                            )
                        }


                        {
                            file.name && (
                                <div className="flex flex-col items-center justify-center mt-5">
                                    <div className="flex gap-x-4">
                                        <h1 className="text-gray-400 ">{file.name}</h1>
                                        <h1>{(file.size / 1024 / 1024).toFixed(2)}Mb</h1>
                                        <button className="font-bold text-red-700 transition duration-200 ease-out rounded-md hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:text-gray-900 disabled:bg-gray-200" disabled={sending} onClick={trashFileHandler} >
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                    <button type="submit" className="w-full py-2 mt-5 tracking-wide text-blue-900 uppercase transition-all duration-200 ease-out bg-white border rounded-md shadow-md cursor-pointer border-blue hover:bg-blue-900 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-900" disabled={sending}>Enviar e Gerar Link</button>
                                </div>
                            )
                        }
                        <div className="relative pt-1" hidden={!sending}>
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200" >
                                <div
                                    className="w-1/9 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-200 ease-linear" style={{ width: uploadProgress }}>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center items-center" >
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" hidden={!sending}></div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx)
    const { ['nricoy.token']: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    await apiClient.get('/auth')
    return {
        props: {}
    }
}
