import * as React from 'react';
import avt from '../../assets/image/avt.jpeg';
import { useNavigate } from 'react-router-dom';

function InfoStudent({
  dataStudent = {
    id: '',
    name: '',
    email: '',
    birthday: '',
    phone: '',
    address: '',
    level: '',
  },
}) {
  const navigate = useNavigate();

  return (
    <div className="mt-2 p-2 rounded-2 bg-body shadow d-flex">
      <div className="col-4">
        <div className="center flex-column p-4">
          <img src={avt} alt="avt" width="150px" className="rounded-2" />
          <div className="mt-3">
            <span className="me-3 cursor-pointer text-hover-primary">
              Upload Image
            </span>
            <span className="cursor-pointer text-hover-primary">
              Take Photo
            </span>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="p-4 bg-light">
          <div className="between mb-2">
            <span>
              Name: <b>{dataStudent.name}</b>
            </span>
            <span className="cursor-pointer text-hover-primary">
              View/Create Family Acount
            </span>
          </div>
          <div className="between mb-2">
            <span>
              Email: <b>{dataStudent.email}</b>
            </span>
            <span className="cursor-pointer text-hover-primary">
              Edit My Info
            </span>
          </div>
          <div className="mb-2">
            Birth Date: <b>{dataStudent.birthday}</b>
          </div>
          <div className="mb-2">
            Phone: <b>{dataStudent.phone}</b>
          </div>
          <div className="between mb-2">
            <span>
              Address: <b>{dataStudent.address}</b>
            </span>
            <span
              className="cursor-pointer text-hover-primary"
              onClick={() => navigate('/calender')}>
              View Calender
            </span>
          </div>
          <div className="mb-2">
            Grade level: <b>{dataStudent.level}</b>
          </div>
          <div className="mb-2">
            Student ID: <b>{dataStudent.id}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoStudent;
