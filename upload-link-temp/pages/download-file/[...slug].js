import { useRouter } from "next/router"
import axios from 'axios'
import { useEffect, useState } from "react"
import { saveAs } from 'file-saver';

function DownloadFile() {
    const router = useRouter()
    const { slug } = router.query
    const [downloadProgress, setDownloadProgress] = useState('')
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        const downloadData = async () => {
            setDownloading(true)
            const response = await axios.get('/api/download', {
                responseType: 'blob',
                "content-type": "multipart/form-data",
                onDownloadProgress: progressEvent => {
                    // console.log('Download Progress: ' + ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + '%')
                    setDownloadProgress(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + '%')
                }
            })
            const fileNameHeader = "x-suggested-filename";
            const suggestedFileName = response.headers[fileNameHeader];
            saveAs(response.data, suggestedFileName)
            // console.log(response)
            setDownloading(false)
        }

        downloadData()
        return () => {

        }
    }, [])
    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 ">
            <h1 className="text-lg">
                Efetuando download...
            </h1>
            <div className="relative pt-1 w-96" >
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200" >
                    <div
                        className="w-1/9 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-200 ease-linear" style={{ width: downloadProgress }}>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-center items-center" >
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" hidden={!downloading}></div>
            </div>
        </main>
    )
}

export default DownloadFile
