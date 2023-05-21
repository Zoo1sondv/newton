import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomizedTables from '@/components/_share/Table';
import InfoStudent from '@/components/_share/InfoStudent';
import studentApi from '@/services/studentApi';
import LoadingPage from '@/components/_share/LoadingPage';

function StudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionStudent, setOptionStudent] = useState([]);
  const [dataStudent, setDataStudent] = useState();

  const getStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await studentApi.getStudent();
      setOptionStudent(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getStudent();

    return () => {
      setOptionStudent([]);
    };
  }, [getStudent]);

  const columns = useMemo(() => {
    return [
      {
        label: 'Shuttle Bus',
        children: (props) => {
          return <div>{props?.shuttle_bus ? 'Yes' : 'No'}</div>;
        },
      },
      {
        label: 'Learn Swimming',
        children: (props) => {
          return <div>{props?.learn_swimming ? 'Yes' : 'No'}</div>;
        },
      },
      {
        label: 'Learn Dancing',
        children: (props) => {
          return <div>{props?.learn_dancing ? 'Yes' : 'No'}</div>;
        },
      },
    ];
  }, []);

  const getInfoStudent = useCallback(async (id) => {
    try {
      const res = await studentApi.getStudentInfoApiMock(id);
      setDataStudent(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="mt-3">
      <div className="d-flex flex-row-reverse">
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Student</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Student">
              {optionStudent.map((student, index) => (
                <MenuItem
                  key={index}
                  value={student.value}
                  onClick={() => getInfoStudent(student.value)}>
                  {student?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <InfoStudent dataStudent={dataStudent?.info} />
      <div className="mt-3">
        <CustomizedTables
          columns={columns}
          data={dataStudent?.service_student}
        />
      </div>
    </div>
  );
}
export default StudentPage;
