import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const IssuePage = () => {
    const [course, setCourse] = useState('Certified Blockchain Associate')
    const [certificateId, setCertificateId] = useState('')
    const [candidateName, setCandidateName] = useState('')
    const [grade, setGrade] = useState('A')
    const [date, setDate] = useState('')

    const navigate = useNavigate()

    const submitForm = (e)=>{
        e.preventDefault()
    
        const newCertificate = {
          course,
          certificateId,
          candidateName,
          grade,
          date
        }
    
        const res = addCertificate(newCertificate)
        toast.success('Certificate added successfully')
        navigate('/')
        console.log(res)
      }
    
      const addCertificate = async (newCertificate)=>{
        const res = await fetch('http://localhost:5000/certificate', {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCertificate)
        })
        return res;
      }

    return (
        <>
            <div className="flex justify-end">


                <Link to="/" className="b"><input type="button" name="Issue" value="Home" className="font-serif mr-2 h-10" /></Link>
                <Link to="/issue" className="b"><input type="button" name="home" value="Issue Certificate"
                    className=" rounded-md text-white mr-4 bg-blue-500 border-none font-serif h-10" /></Link>

            </div>
            <h2 className=" text-2xl text-left font-bold font-serif">Certificate Dapp</h2>

            <div className=" ml-10 mt-12 mr-10  max-w-lg ">
                <form className=" ml-10 mt-12 mr-10  max-w-lg " onSubmit={submitForm}>

                    <h2 className="text-2xl font-bold font-serif">Issue New Certificate</h2>
                    <div className="flex flex-col">
                        <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                            for="select">Select
                            Course*</label>
                        <select name="course"
                            className="border-2 border-black h-10"
                            id='course'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        >
                            <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
                            <option value="Certified Ethereum Developer">Certified Ethereum Developer</option>
                            <option value="Certified Hyperledger Fabric Developer">Certified Hyperledger Fabric Developer</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                            for="select">Certificate
                            Id*</label>
                        <input type="text" id='certificateId'
                            name="certificateId"
                            placeholder="Certificate ID"
                            className="border-2 border-black h-10"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                            for="select">Candidate
                            Name*</label>
                        <input type="text"
                        id='candidateName' 
                        name="candidateName" 
                        placeholder="Candidate Name" 
                        className="border-2 border-black h-10"
                        value={candidateName} 
                        onChange={(e) => setCandidateName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                            for="select">Select
                            Grade*</label>
                        <select id='grade'
                         name="grade" 
                         className="border-2 border-black h-10"
                         value={grade}
                         onChange={(e) => setGrade(e.target.value)}
                         >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif" for="select">Issue
                            Date*</label>
                        <input type="date"
                         id="date" 
                         name='date' 
                         className="border-2 border-black h-10"
                         value={date}
                         onChange={(e) => setDate(e.target.value)}
                          />
                    </div>
                    <div>
                        <button className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                         type='submit'>submit</button>
                    </div>


                </form>
            </div>


        </>
    )
}

export default IssuePage