import axiosClient from './axiosClient';

// MOCK API
function StudentApiMock(id) {
  let infoStudent;
  switch (id) {
    case 1:
      infoStudent = {
        info: {
          id: '1',
          name: 'son',
          email: 'son@gmail.com',
          birthday: '1/1/2001',
          phone: '0123456789',
          address: 'bac ninh',
          level: '1',
        },
        service_student: [
          {
            learn_swimming: false,
            shuttle_bus: false,
            learn_dancing: false,
          },
        ],
      };
      break;
    case 2:
      infoStudent = {
        info: {
          id: '2',
          name: 'doan',
          email: 'doan@gmail.com',
          birthday: '1/1/2001',
          phone: '1234567890',
          address: 'ha noi',
          level: '2',
        },
        service_student: [
          {
            learn_swimming: true,
            shuttle_bus: true,
            learn_dancing: true,
          },
        ],
      };
      break;

    case 3:
      infoStudent = {
        info: {
          id: '3',
          name: 'van',
          email: 'van@gmail.com',
          birthday: '3/1/2001',
          phone: '2345678901',
          address: 'bac ha',
          level: '3',
        },
        service_student: [
          {
            learn_swimming: false,
            shuttle_bus: true,
            learn_dancing: false,
          },
        ],
      };
      break;

    default:
      break;
  }

  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(infoStudent);
    }, 1000);
  });

  return myPromise.then(() => {
    return infoStudent;
  });
}

function StudentCalenderApiMock(id) {
  let calender;
  switch (id) {
    case 1:
      calender = [
        {
          title: 'doan van son',
          start: '2023-05-15',
          end: '2023-05-17',
        },
        {
          title: 'hihi',
          start: '2023-05-20',
          end: '2023-05-26',
        },
        {
          title: 'haha',
          start: '2023-04-29',
          end: '2023-05-01',
        },
      ];
      break;
    case 2:
      calender = [
        {
          title: 'sondoan',
          start: '2023-05-23T04:30:00+07:00',
          end: '2023-05-23T06:30:00+07:00',
        },
        {
          title: 'hihi',
          start: '2023-05-24',
          end: '2023-05-26',
        },
        {
          title: 'haha',
          start: '2023-05-28',
          end: '2023-05-29',
        },
      ];
      break;

    default:
      break;
  }

  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(calender);
    }, 1000);
  });

  return myPromise.then(() => {
    return calender;
  });
}

//  API
const studentApi = {
  getStudent() {
    return [
      { label: 'son', value: 1 },
      { label: 'doan', value: 2 },
      { label: 'van', value: 3 },
    ];
  },

  getStudentInfo(config) {
    return axiosClient.get('/student', config);
  },

  getStudentCalender(config) {
    return axiosClient.get('/calender', config);
  },

  getStudentInfoApiMock(id) {
    return StudentApiMock(id);
  },

  getStudentCalenderApiMock(id) {
    return StudentCalenderApiMock(id);
  },
};

export default studentApi;
