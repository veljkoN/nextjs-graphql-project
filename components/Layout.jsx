import React, { Children } from 'react'
import { Header } from '.'

const Layout = ( props ) => {
    return (
        <>
            <Header />
            { props.children }
        </>
    )
}

export default Layout
