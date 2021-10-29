import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { FiCopy } from "react-icons/fi";
import { TrashIcon } from '@heroicons/react/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { api } from '../services/api';
import router from 'next/router';

function ListFiles(props) {
    const [files, setFiles] = useState([])
    const handleDelete = async (fileProp) => {
        try {
            await api.delete(`/files/${fileProp.name}`)
            const filesUpdate = files.filter(file => file.name != fileProp.name)
            setFiles(filesUpdate)
        }
        catch {
            console.log("ERROR")
            router.push('/')
        }

    }
    useEffect(() => {
        setFiles(props.files)
    }, [])
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Nome do Arquivo
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        LINK
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file, index) => (
                    <tr key={file.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
                                    <Avatar initials={file.extension.substr(1, 3)} size="40" round={true} name={file.extension.substr(1, 3)} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{file.name}</div>

                                    {/* <div className="text-sm text-gray-500">{person.email}</div> */}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" >
                            <div className="text-sm text-gray-900 flex flex-row">
                                <CopyToClipboard text={file.url} >
                                    <FiCopy className={`mr-5 transition duration-200 inline-block  cursor-pointer active:scale-90 active:text-green-600`} size="20" />
                                </CopyToClipboard>
                                {file.url}
                            </div>
                            {/* 847929R1c0y */}
                            {/* <div className="text-sm text-gray-500"></div> */}
                        </td>
                        <td className="pl-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-red-600 hover:text-red-900 transition-all duration-200 " onClick={() => { handleDelete(file) }}>
                                <TrashIcon className={`w-6 active:scale-90 transition-all duration-200`} />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default ListFiles
