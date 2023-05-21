import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEventId } from '@/utils/event-utils';
import { formatDate } from 'fullcalendar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import studentApi from '@/services/studentApi';
import LoadingPage from '@/components/_share/LoadingPage';
import ModalCustom from '@/components/_share/Modal';

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

function CalenderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionStudent, setOptionStudent] = useState([]);
  const [dataCalender, setDataCalender] = useState();
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

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

  const getCalenderStudent = useCallback(async (id) => {
    try {
      const calender = await studentApi.getStudentCalenderApiMock(id);
      setDataCalender(
        calender.map((item) => {
          item.id = createEventId();
          return item;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleWeekendsToggle = useCallback(() => {
    setWeekendsVisible((prev) => !prev);
  }, []);

  const handleDateSelect = (selectInfo) => {
    console.log('selectInfo', selectInfo);
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebar = useMemo(() => {
    return (
      <div className="demo-app__sidebar">
        <div className="demo-app__sidebar__section">
          <h5>Instructions</h5>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app__sidebar__section">
          <div className="d-flex align-items-center justify-content-between">
            <h5>All Events ({currentEvents.length})</h5>
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked">
                Show weekends
              </label>
            </div>
          </div>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }, [currentEvents, handleWeekendsToggle, weekendsVisible]);

  const handleAddSchedule = () => {
    setShowModal(true);
    setDataModal({
      title: 'Create Schedule',
      children: (
        <div className="d-flex flex-column px-2">
          <TextField id="standard-basic" label="Title" variant="standard" />
          <div className="between my-3">
            <div className="col-5">
              <TextField
                fullWidth
                id="standard-Start"
                label="Start Date"
                variant="standard"
              />
            </div>
            <div className="col-5">
              <TextField
                fullWidth
                id="standard-End"
                label="End Date"
                variant="standard"
              />
            </div>
          </div>
        </div>
      ),
      labelPrimary: 'Create',
      labelSecond: 'Close',
    });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      {showModal && (
        <ModalCustom
          data={dataModal}
          handlePrimary={() => {}}
          handleClose={() => setShowModal(false)}
        />
      )}
      <div className="demo-app">
        {renderSidebar}
        <div className="demo-app__main">
          <div className="d-flex justify-content-between">
            <div>
              <div
                className="btn btn-sm btn-light shadow rounded-2 border-secondary"
                onClick={handleAddSchedule}>
                Create
              </div>
            </div>
            <Box sx={{ minWidth: 200, marginBottom: '8px' }}>
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
                      onClick={() => {
                        getCalenderStudent(student.value);
                      }}>
                      {student.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            events={dataCalender}
            eventAdd={(e) => {
              console.log('eventAdd', e);
            }}
            eventChange={(e) => {
              console.log('eventChange', e);
            }}
            eventRemove={(e) => {
              console.log('eventRemove', e);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CalenderPage;
