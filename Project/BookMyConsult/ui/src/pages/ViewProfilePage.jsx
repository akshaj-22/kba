import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ViewProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [cancelError, setCancelError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointment', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data.appointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments');
      }
    };

    fetchProfile();
    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/api/appointment/${appointmentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      //
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== appointmentId));
      //
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      // Remove the canceled appointment from the state
      // setAppointments((prevAppointments) =>
      //   prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      // );
    } catch (err) {
      console.error('Error canceling appointment:', err);
      setCancelError('Failed to cancel appointment');
    }
  };

  if (error) return <div>{error}</div>;

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl text-center font-bold text-gradient bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-6">
            Profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="bg-white p-6 shadow-lg rounded-lg shadow shadow-blue-700">
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <p className="text-gray-700 mb-2"><strong>Name:</strong> {profile.name}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {profile.address}</p>
              <p className="text-gray-700 mb-2"><strong>Age:</strong> {profile.age}</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {profile.email}</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> {profile.phone}</p>
              <Link to="/edit-profile" className="bg-gradient-to-r from-blue-500 to-purple-500 px-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg text-white mt-4 inline-block font-semibold">Edit Profile</Link>
            </div>
            {/* Display Appointments Start */}
            <div className="bg-white p-6 shadow shadow-lg shadow-blue-700 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
              {appointments.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700 list-none px-3">
                  {appointments.map((appointment) => (
                    <li key={appointment._id} className='px-2 py-2 shadow shadow-slate-800 rounded-lg flex justify-between items-center'>
                      <span>
                        Doctor: {appointment.doctorName}, Date: {appointment.date}, Time: {appointment.time}
                      </span>
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-gray-700">You have no upcoming appointments.</p>
              )}
              {cancelError && <p className="text-red-500 mt-2">{cancelError}</p>}
            </div>
            {/* Display Appointment End */}
          </div>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        © 2024 Medical Consultation. All rights reserved.
      </footer>
    </div>
  );
};

export default ViewProfilePage;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const ViewProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('/api/profile', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError('Failed to load profile');
//       }
//     };

//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch('/api/appointment', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch appointments');
//         }

//         const data = await response.json();
//         setAppointments(data.appointments);
//       } catch (err) {
//         console.error('Error fetching appointments:', err);
//         setError('Failed to load appointments');
//       }
//     };

//     fetchProfile();
//     fetchAppointments();
//   }, []);

//   if (error) return <div>{error}</div>;

//   if (!profile) return <div>Loading...</div>;

//   return (
//     <div className="h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow flex items-center justify-center">
//         <div className="container mx-auto px-4 py-6">
//           <h1 className="text-4xl text-center font-bold text-gradient bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-6">
//             Profile
//           </h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
//             <div className="bg-white p-6 shadow-lg rounded-lg shadow shadow-blue-700">
//               <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
//               <p className="text-gray-700 mb-2"><strong>Name:</strong> {profile.name}</p>
//               <p className="text-gray-700 mb-2"><strong>Address:</strong> {profile.address}</p>
//               <p className="text-gray-700 mb-2"><strong>Age:</strong> {profile.age}</p>
//               <p className="text-gray-700 mb-2"><strong>Email:</strong> {profile.email}</p>
//               <p className="text-gray-700 mb-2"><strong>Phone:</strong> {profile.phone}</p>
//               <Link to="/edit-profile" className="bg-gradient-to-r from-blue-500 to-purple-500 px-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg text-white mt-4 inline-block font-semibold">Edit Profile</Link>
//             </div>
//             {/* Display Appointments Start */}
//             <div className="bg-white p-6 shadow shadow-lg shadow-blue-700 rounded-lg">
//               <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
//               {appointments.length > 0 ? (
//                 <ul className="list-disc pl-5 text-gray-700 list-none px-3">
//                   {appointments.map((appointment, index) => (
//                     <li key={index} className='px-2 py-2 shadow shadow-slate-800 rounded-lg'>
//                       Doctor: {appointment.doctorName}, Date: {appointment.date}, Time: {appointment.time}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="mt-4 text-gray-700">You have no upcoming appointments.</p>
//               )}
//             </div>
//             {/* Display Appointment End */}
//           </div>
//         </div>
//       </main>
//       <footer className="bg-blue-600 text-white p-4 text-center">
//         © 2024 Medical Consultation. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default ViewProfilePage;



