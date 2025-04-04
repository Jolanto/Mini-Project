import React ,{useState , useEffect} from 'react'
// import React,{useEffect , useState} from 'react';
import { Space, Table, Tag ,Modal  } from 'antd';
import axios from "axios"
import { BASEURL } from '@/Api';
// import UpdateStudentModal from "../../components/UpdateStudent.jsx"
import { SearchOutlined } from '@ant-design/icons';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
// import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
// import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; //
const UpdateStudent = ({stdId, close , stdData}) => {  
  // console.log(stdId);
  console.log("close",close);
  const [showPassword, setShowPassword] = useState(false);
  const[data , setData]= useState([]);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASEURL}/auth/getStudent/${stdId}`
      );
      setData(res.data)
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    setStudentData({
      name: '',
      password: '',
      cpassword: '',
      startingYear: '',
      passingYear: '',
      gender: '',
      phone: '',
      address: '',
    })
    fetchData();
   
  }, [stdId]);
  const [studentData, setStudentData] = useState({
    name: data?.name ,
    password: '',
    cpassword: '',
    gender: '',
    phone: '',
    startingYear: '',
    passingYear: '',
    address: '',
  });
  console.log("---=>",studentData);
  const handleToggleConfirmPasswordVisibility = () => {
    // Change the function name
    setShowPassword(!showPassword);

    setConfirmShowPassword(!confirmShowPassword); // Use the correct state variable
  };
  // console.log("--->",data);
   // handle Change function
   const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed input is studentId
    const sanitizedValue = value.replace(/<[^>]*>?/gm, ''); // Remove HTML tags

   if (name === 'startingYear') {
      // Calculate the passing year by adding 4 years to the starting year
      const startingYear = parseInt(value);
      const passingYear = startingYear + 4;

      // Update the studentData state with the new passing year
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
        passingYear: passingYear.toString(), // Convert passingYear to string before updating
      }));
    } else {
      // For other inputs, update studentData as usual
      setStudentData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));
    }
  }
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  const generateYearOptions = () => {
    const currentYear = getCurrentYear();
    const yearOptions = [];

    for (let year = currentYear - 10; year <= currentYear; year++) {
      yearOptions.push(year.toString());
    }

    return yearOptions;
  };
  const yearOptions = generateYearOptions();
  const handleRegisterSubmit = async (e) => {
    // Check if any of the required fields are empty
    e.preventDefault();
    setIsLoading(true);
   
    if (studentData.password != studentData.cpassword) {
      alert('Password is not same');
    }
    try {
      const res = await axios.put(`${BASEURL}/auth/udpateStudent/${stdId}`, {
        name: studentData.name || data.name,
        password: studentData.password || data.password,
        gender: studentData.gender|| data.gender,
        address: studentData.address || data.address,
        phone: studentData.phone|| data.phone,
        startingYear: studentData.startingYear|| data.startingYear,
        passingYear: studentData.passingYear || data.passingYear,
      });

      if (res) {
        console.log('Registration success');
        setStudentData({
          name: '',
          password: '',
          cpassword: '',
          startingYear: '',
          passingYear: '',
          gender: '',
          phone: '',
          address: '',
        });

        Toastify({
          text: 'Student Profile Updated Sucessfully',
          duration: 1800,
          gravity: 'top', // top or bottom
          position: 'right', // left, center or right
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #3C50E0, #3C50E0',
            padding: '10px 50px',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        setIsLoading(false); // Stop loading
        // setTimeout(() => {
        //   // navigate('/');
        // }, 2000);

        // toast.success("Registration successful!");
      } else {
        alert('error');
        console.error('Registration failed');
      }
    } catch (error) {
      Toastify({
        text: `Registration Failed !${error.response.data.error}`,
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
          fontSize: '14px',
          background: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
          padding: '10px 10px',
        },
      }).showToast();
      // if (error.response && error.response.status === 500) {
      // }
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false); // Reset loading state after API request completes
    }
    // setLoading(false);
  };
  return (
<div> 
    <form >
                <div className="">
               
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                    <input
                      type="text"
                      name="name"
                      defaultValue={data?.name}
                      onChange={handleRegisterInputChange}
                      placeholder="Enter your Name"
                      className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    </div>
                  </div>
                </div>  <div className="gap-5">
                  <div className="mb-4">
                    <label className=" block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="realtive">
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        name="email"                        
                        defaultValue={data.email}
                        disabled
                        // onChange={handleRegisterInputChange}
                      //   value={studentData.address}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Student ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="studentId"
                        disabled
                        // onChange={handleRegisterInputChange}
                        placeholder="Enter your student id"                   
                             defaultValue={data.studentId}

                      //   value={studentData.studentId}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium dark:text-white">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        // value={studentData.gender}
                        name="gender"
                        onChange={handleRegisterInputChange}
                        defaultValue={data.gender}
                        //   value={studentData.gender}
                        className="border-gray-800 w-full rounded-lg  border bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Select your gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="phone"
                        defaultValue={data.phone}
                        onChange={handleRegisterInputChange}
                        placeholder="Enter your number"
                      //   value={studentData.phone}
                        className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="gap-5">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Address 
                    </label>
                    <div className="realtive">
                      <input
                        type="text"
                        placeholder="Enter your a ddress"
                        name="address"
                        onChange={handleRegisterInputChange}
                        defaultValue={data.address}
                      //   value={studentData.address}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

              

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="6+ Characters, 1 Capital letter"
                        name="password"
                      //   value={studentData.password}
                        onChange={handleRegisterInputChange}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Confrim Password
                    </label>
                    <div className="relative">
                      <div className="mb-6">
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="6+ Characters, 1 Capital letter"
                            name="cpassword"
                            onChange={handleRegisterInputChange}
                          //   value={studentData.cpassword}
                            className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />

                          {confirmShowPassword ? (
                            <FaEye
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility}
                            />
                          ) : (
                            <FaEyeSlash
                              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                              onClick={handleToggleConfirmPasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Joining year
                    </label>
                    <div className="relative">
                      <select
                        name="startingYear"
                        onChange={handleRegisterInputChange}
                        defaultValue={data?.startingYear}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Starting Year</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                      Passing year
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="passingYear"
                        defaultValue={studentData.passingYear || data.passingYear}
                        disabled // Make the input field disabled
                      //   value={studentData.passingYear}
                        onChange={handleRegisterInputChange}
                        placeholder="Enter Passing year"
                        // value={studentData.passingYear}
                        className="border-gray-800 w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onSubmit={handleRegisterSubmit}
                    disabled={isLoading}
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-[#0C356A] bg-[#0C356A] p-2 text-white transition hover:bg-opacity-90"
                  >
                    {isLoading ? 'Loading...' : '  Update Student'}
                  
                  </button>
                </div>

                {/* <div className="mt-6 text-center">
                  <p>
                    Already a user
                    <Link to="/auth/signin " className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div> */}
              </form></div>  )
}

export default UpdateStudent