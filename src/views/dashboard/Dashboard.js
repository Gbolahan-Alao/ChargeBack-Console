import {
  cilCloudDownload
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow
} from '@coreui/react';
import axios from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';


import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7059/api/dashboard-data');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data: ', error);
    }
  };

  const progressExample = [
    { title: 'All Transactions', value: dashboardData?.totalCount ?? 0, percent: 40, color: 'success' },
    { title: 'Pending', value: dashboardData?.pendingCount ?? 0, percent: 20, color: 'info' },
    { title: 'Approved', value: dashboardData?.acceptedCount ?? 0, percent: 60, color: 'warning' },
    { title: 'Rejected', value: dashboardData?.rejectedCount ?? 0, percent: 80, color: 'danger' },
  ];

  return (
    <>
      {dashboardData && (
        <WidgetsDropdown
          className="mb-4"
          all={dashboardData.totalCount}
          approved={dashboardData.acceptedCount}
          pending={dashboardData.pendingCount}
          rejected={dashboardData.rejectedCount}
        />
      )}
      <CCard className="mb-4"> 
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Transactions
              </h4>
              <div className="small text-body-secondary">January - December 2024</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
     
    </>
  )
}

export default Dashboard



