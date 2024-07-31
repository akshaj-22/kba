import React, { useEffect, useState } from 'react'
import img1 from '../assets/images/dApp.jpg'
import { Link, useParams } from 'react-router-dom';

const ViewPage = () => {
    const [certificate, setCertificate] = useState({})
    const {id} = useParams()
    useEffect (()=>{
        const fetchCertificate = async () => {
                try {
                  
                  const res = await fetch(`http://localhost:5000/certificate/${id}`);
                  const data = await res.json();
                  console.log("data", data)
                  setCertificate(data)
                } catch (error) {
                  console.log(error);
                } 
              };
              fetchCertificate();

    },[])
    return (
        <>

<div className="flex justify-end">


<Link to="/" className="b"><input type="button" name="Issue" value="Home" className="font-serif mr-2 h-10" /></Link>
<Link to="/issue" className="b"><input type="button" name="home" value="Issue Certificate"
    className=" rounded-md text-white mr-4 bg-blue-500 border-none font-serif h-10" /></Link>

</div>
            <div className="border border-grey-400 border-4 mx-44 my-24  py-16 rounded-lg">
                <h3 className="text-center font-serif text-2xl font-bold">Kerala Blockchain Academy</h3>
                <img src={img1} className="size-60 mx-auto mt-12 mb-10" />
                <p className="font-serif text-xl text-center">This is to certify that {certificate.candidateName}</p>
                <p className="font-serif text-xl text-center">has successfully completed {certificate.course}</p>
                <p className="font-serif text-xl text-center">with grade {certificate.grade} on {certificate.date}</p>
            </div>
        </>
    )
}

export default ViewPage