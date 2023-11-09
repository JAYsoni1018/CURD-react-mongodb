import React from 'react'
import { Audio, Circles, Dna } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div >
            <Circles
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="circles-loading"
                text="Loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
