import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Breadcrumb from '../../components/Breadcrumb';
// import GroupSubjectCard from '../../components/SubjectCard';
// import GroupSubjectCard from './GroupSubjectCard';
import GroupSubjectCard from "../../components/GroupSubjectsCards"

import {
  Card,
  // Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BASEURL } from '../../Api';
import { Table, Space, Form, Input , Modal , Tag ,Select   } from "antd";
import { useParams, NavLink } from 'react-router-dom';


export const FinalYearGrps = () => {
  const currentYear = useLocation().pathname.split('/')[2];
  console.log("====>",currentYear); 
   const [isModalVisible, setIsModalVisible] = useState(false);
   const handleCancel = () => {
    setIsModalVisible(false); 
    setFormData({
      subjectName: '',
      semester: '',
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const [projectDetails, setProjectDetails] = useState({
    semester: localStorage.getItem('selectedSemester') || '', // Retrieve selected semester from localStorage
  });
  const [subjectList1, setSubjectList1] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: '',
    semester: '',
  });
  // const { currentYear } = useParams();
  // console.log(currentYear);

  console.log(formData);
  const [subjectList2, setSubjectList2] = useState([]);
  console.log(subjectList2);
  const [currentSemester, setCurrentSemester] = useState();
  const [currentSemester2, setCurrentSemester2] = useState();
  // const currentUser = useSelector((state) => state.user);
  // const facultyId = currentUser.userData._id;
  const academicYear = '2023-2024'

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setProjectDetails({ ...projectDetails, semester: selectedSemester });
    localStorage.setItem('selectedSemester', selectedSemester); // Store selected semester in localStorage
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASEURL}/subject/add`, {
        subjectName:formData.subjectName,
        semester:formData.semester,
        currentYear:currentYear
      });
      console.log('Data saved successfully:', res.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Optionally, you can perform additional actions after data is saved
      // For example, closing the modal or updating the UI
      setIsModalVisible(false);
      setFormData({
        subjectName: '',
        semester: '',
      });
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error gracefully (e.g., show error message to the user)
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const fetchSubjects = async () => {

  //   try {
  //     setLoadingSubjects(true);
  //     const res = await axios.get(
  //       `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=${projectDetails.semester}`
  //     );
  //     setSubjectList(res.data.data);
  //   } catch (error) {
  //     console.error('Error fetching subjects:', error);
  //   } finally {
  //     setLoadingSubjects(false);
  //   }
  // };

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);
      let res;
      if (currentYear === 'BE') {
        // Fetch subjects for both semester 7 and semester 8
        const res7 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=7`
        );
        setCurrentSemester(7);
        setSubjectList1(res7.data.data);

        const res8 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=8`
        );
        setSubjectList2(res8.data.data);
        setCurrentSemester2(8);
        // res = [...resSemester7.data.data, ...resSemester8.data.data];
      } else if (currentYear === 'TE') {
        // Fetch subjects for both semester 7 and semester 8
        const res5 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=5`
        );
        setCurrentSemester(5);
        setSubjectList1(res5.data.data);

        const res6 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=6`
        );
        setSubjectList2(res6.data.data);
        setCurrentSemester2(6);
        // res = [...resSemester7.data.data, ...resSemester8.data.data];
      } else {
        // Fetch subjects for both semester 7 and semester 8
        const res3 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=3`
        );
        setCurrentSemester(3);
        setSubjectList1(res3.data.data);
        console.log('esiii',res3.data.data);

        const res4 = await axios.get(
          `${BASEURL}/subject/get/sub?currentYear=${currentYear}&semester=4`
        );
        setSubjectList2(res4.data.data);
        setCurrentSemester2(4);
        // res = [...resSemester7.data.data, ...resSemester8.data.data];
      }
      // setSubjectList(res.data.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    if (currentYear) {
      fetchSubjects();
    }
  }, [currentYear]);

  useEffect(() => {
    if (currentYear && projectDetails.semester) {
      fetchSubjects();
    }
  }, [currentYear, projectDetails.semester]);
  const semester = currentYear;
  return (
    <>
      {/* Breadcrumb and Semester Select */}
      <div className="flex justify-between">
        {/* <Breadcrumb pageName="Groups List" /> */}
        {/* <div className="mb-4">
          <label className="block font-medium text-black dark:text-white">
            Select Semester
          </label>
          <select
            name="semester"
            defaultValue={projectDetails.semester}
            value={projectDetails.semester}
            onChange={handleSemesterChange}
            className="focus:border-blue-500 w-full rounded border px-3 py-2 font-bold text-black focus:outline-none"
          >
            <option value="">Select Semester</option>
            {currentYear === 'SE' && (
              <>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </>
            )}
            {currentYear === 'TE' && (
              <>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </>
            )}
            {currentYear === 'BE' && (
              <>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </>
            )}
          </select>
        </div> */}
      </div>
      {/* Subject Cards */}
      {loadingSubjects ? (
        <div>Wait Fetching Subjects</div>
      ) : (
        <div className="my-10">
          <div className="my-10 flex pl-2  text-xl font-bold text-black justify-between">
            <h1 className="hover:bg-gray-500  cursor-pointer rounded-xl  border border-gray bg-white py-2 px-3 shadow-2xl">
              Semester {currentSemester}
            </h1>
            <Button className="p-6 py-3 mx-4"  onClick={showModal}>
          Add Subject
        </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subjectList1.map((subject, index) => (
              <GroupSubjectCard
                Two
                key={index}
                subject={subject}
                academic={academicYear}
                currentYear={currentYear}
                semester={currentSemester}
              />
            ))}
          </div>
        </div>
      )}
      <div className="my-10">
        {' '}
        <hr className="text-" />
      </div>{' '}
      {loadingSubjects ? (
        <div>Wait Fetching Subjects</div>
      ) : (
        <div className="my-10">
          <div className="my-10 flex pl-2  text-xl font-bold text-black ">
            <h1 className="hover:bg-gray-500  cursor-pointer rounded-xl  border border-gray bg-white py-2 px-3 shadow-2xl">
              {' '}
              Semester {currentSemester2}
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subjectList2.map((subject, index) => (
              <GroupSubjectCard
                Two
                key={index}
                subject={subject}
                academic={academicYear}
                currentYear={currentYear}
                semester={currentSemester2}
              />
            ))}
          </div>
        </div>
      )}
      <Modal
        title="Add Student Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <form onSubmit={handleRegisterSubmit}>
          <div className="flex flex-col">
            <div className="mb-6">
              <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                Subject Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleInputChange}
                  placeholder="Enter subject name"                className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                  // You can customize input styling with Tailwind CSS classes
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-lg font-medium text-black dark:text-white">
                Semester
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="border-gray-800 w-full rounded-lg border bg-transparent py-4 pl-6 pr-16 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Select Semester</option>
                {/* Populate options dynamically if needed */}
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
