//react-helmet is used in React applications for updating meta tags dynamically. 
import React from 'react'
import {Helmet} from 'react-helmet'

const MetaData = ({title}) => {
    return (
        <Helmet>
           <title>{`${title} - E-Mart`}</title> 
        </Helmet>
    )
}

export default MetaData
