import React from 'react'
import Navbar from '../components/Navbar'

function DashboardLayout({ children }) {
    return (
        <Navbar>
            {children}
        </Navbar>
    )
}

export default DashboardLayout
