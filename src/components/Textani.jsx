import React from 'react'

const Textani = ({ textHeading }) => {
    return (
        <>
            {
                textHeading.split("").map((val, key) => (
                    <h1 className="uppercase" key={key}>{val}</h1>
                ))
            }
        </>
    )
}

export default Textani
