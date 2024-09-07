import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import StudentList from './Screen/Students/StudentList'
import StudentRegistration from './Screen/Students/StudentRegistration';
import Login from './Screen/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Screen/Dashboard/Dashboard';
import Signup from './Screen/Signup/Signup';
import TeachersRegistration from './Screen/Teachers/TeachersRegistration';
import TeachersList from './Screen/Teachers/TeachersList';
import SubjectsRegistration from './Screen/Subjects/SubjectsRegistration';
import SubjectsList from './Screen/Subjects/SubjectsList';
import SyllabusForm from './Screen/Syllabus/SyllabusForm';
import SyllabusList from './Screen/Syllabus/SyllabusList';
import ClassForm from './Screen/Class/ClassForm';
import ClassList from './Screen/Class/ClassList';
import FeeStructure from './Screen/Fees/FeeStructure';
import FeeVoucher from './Screen/Fees/FeeVoucher';
import FeeSubmission from './Screen/Fees/FeeSubmission';
import AdmissionForm from './Screen/Admission/AdmissionForm';
import ExamSchedule from './Screen/Exam/ExamSchedule';
import ExamResult from './Screen/Exam/ExamResult';
import ProtectedRoute from './Routes/ProtectedRoute';
import AuthRoute from './Routes/AuthRoute';


const App = () => {
  

  return (
    <Routes>
     <Route element={<AuthRoute />}>
     <Route index element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     </Route>
      {/*  */}
      <Route element={<ProtectedRoute/>}>
      <Route path="/students" element={<Dashboard/>}/>
      <Route path="/students/students-list" element={<StudentList />} />
      <Route path="/students/students-registration" element={<StudentRegistration />} />
      {/*  */}
      <Route path="/teachers/teachers-registration" element={<TeachersRegistration />} />
      <Route path="/teachers/teachers-list" element={<TeachersList />} />
      {/*  */}
      <Route path="/subjects/subjects-add" element={<SubjectsRegistration />} />
      <Route path="/subjects/subjects-list" element={<SubjectsList />} />
      {/*  */}
      <Route path="/syllabus/syllabus-form" element={<SyllabusForm />} />
      <Route path="/syllabus/syllabus-list" element={<SyllabusList />} />
      {/*  */}
      <Route path="/class/class-form" element={<ClassForm />} />
      <Route path="/class/class-list" element={<ClassList />} />
       {/*  */}
       <Route path="/fees/fee-structure" element={<FeeStructure />} />
       <Route path="/fees/fee-voucher" element={<FeeVoucher />} />
       <Route path="/fees/fee-submission" element={<FeeSubmission />} />
       {/*  */}
      <Route path="/admission/admission-form" element={<AdmissionForm />} />
      {/*  */}
      <Route path="/exam/exam-schedule" element={<ExamSchedule />} />
      <Route path="/exam/exam-result" element={<ExamResult />} />
      </Route>
    </Routes>
  );
}

export default App
