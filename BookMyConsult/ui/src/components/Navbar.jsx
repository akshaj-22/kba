import { Link } from "react-router-dom";
import { getUserType } from "../pages/LoginPage";
import Logout from "./Logout";

const Navbar = () => {
  const userType = getUserType();
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <Link to="/home">BookMyConsult</Link>
          </div>
          <ul className="flex space-x-4 text-white font-bold">
            {userType == "user" ? (
              <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/add-appointment">Appointment</Link></li>
              <li><Link to="/doctors">Doctors</Link></li>
              <Logout />
              </>
            ) : (
              <>
              <li><Link to="/doctors">Doctors</Link></li>
              <li><Link to="/add-doctor">Add Doctors</Link></li>
              <Logout />
              </>
            ) }
          </ul>
        </div>
      </nav>
      {/* <div className="bg-purple-100 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md">
        <div className="flex items-center">
          <Link to="/home">
            <img className="m-1p-2 size-12" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10">
          <Link to="/home" className="ml-20">
            Home
          </Link>
          <Link to="/courses" className="ml-20">
            Courses
          </Link>
          <Link to="/contact" className="ml-20">
            Contact Us
          </Link>
          {userType == "admin" && (
            <Link to="/add-course" className="ml-20">
              Add Course
            </Link>
          )}
          <Logout />
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
