import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";
function dashboard() {
    return (
        <div>
            {"OK"}
        </div>
    )
}

export default dashboard

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