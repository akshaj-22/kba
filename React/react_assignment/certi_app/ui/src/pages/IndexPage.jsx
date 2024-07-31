import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../assets/images/dApp.jpg'

const IndexPage = () => {
    const [certificateId, setCertificateId] = useState('')
    const navigate = useNavigate()
    const search = (e)=>{
        e.preventDefault()
        if(certificateId.trim()){
            navigate(`/view/${certificateId}`)
        }
        }
    return (
        <>
            
                <div className="  flex justify-end">

                    <Link to="/" className="b"><input type="button" name="Issue" value="Home"
                        className=" rounded-md text-white mr-4 bg-blue-500 border-none font-serif h-10 px-4" /></Link>
                    <Link to="/issue"><input type="button" name="home" value="Issue Certificate"
                        className="font-serif mr-2 h-10 " /></Link>
                </div>


                <div>
                    <h1 className="pt-16 text-4xl text-center font-bold font-serif">Certificate Dapp</h1>
                    <img src={img1} className="size-60 mx-auto mt-12 mb-10" />
                </div>
                <div className="text-center">
                <form onSubmit={search}>
                    <input type="text" id='certificateId' name="certificateId" required placeholder="Enter Certificate Id to view " className="border-2 border-sky-400"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                     />
                    <button className="text-white bg-blue-500 w-20 size-10" >search</button>
                </form>
                </div>

            
        </>
    )
}

export default IndexPage