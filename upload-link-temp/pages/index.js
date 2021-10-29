

import { parseCookies } from 'nookies';
import React from 'react'
import Avatar from 'react-avatar'

import ListFiles from '../components/ListFiles';
import { getAPIClient } from '../services/axios';
import auth from './auth';


function index({ files }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <ListFiles files={files} />
                    </div>
                </div>
            </div>
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
    await apiClient.get('/auth').catch((error) => {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    })

    const files = await apiClient.get('/files')
    // console.log(files.data)
    return {
        props: { files: files.data }
    }
}



export default index
