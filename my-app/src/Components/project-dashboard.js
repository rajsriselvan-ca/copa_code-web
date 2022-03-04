import React, { useState, useEffect } from 'react'
import { notificationContent } from "../Shared Files/notification";
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Components/popup-form';
import {getEmployeeList, updateEmployee, deleteEmployee, getAllEmployeeList} from  '../Api/dashboard';
import Pagination from '@material-ui/lab/Pagination';


function ProjectDashBoard() {
    const [openPopup, setOpenPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [totalList, setTotalList] = useState([]);
    const [page, setPage] = useState(1);
    const [displayCount, setDisplayCount] = useState(5);
    const [totalCount, setTotalCount] = useState()
    const [record, setRecord] = useState([]);

    const fetchData = async () => {
        const params = {
            pageNumber : 0,
            countToDisplay : displayCount
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
    }

    useEffect(() => {
       fetchData();
    }, []);    
    
    const columns = [
        { title: 'Employee ID', field: 'Employee_ID' },
        { title: 'First Name', field: 'First_Name' },
        { title: 'Last Name', field: 'Last_Name' },
        { title: 'Email ID', field: 'Email_ID' },
        { title: 'Current Address', field: 'Current_Address' },
        { title: 'Experience in Years', field: 'Years_Of_Experience' },
        { title: 'Graduation', field: 'Graduation_Date' },
    ]

    const handleCreateEmployee = (status, title) => {
        setOpenPopup(status);
        setTitle(title);
    }

    const handleEdit = async (newData) => {
        await updateEmployee(newData.Employee_ID, newData).then(response => {
            if(response.data == "success") return notificationContent(response.data, "Update");
            else return notificationContent(response.data, "Update");
        });
        fetchData();
    }

    const handleDelete = async (id) => {
        await deleteEmployee(id).then(response => {
            if(response.data == "success") return notificationContent(response.data, "deleteConfirmation");
            else return notificationContent(response.data, "deleteConfirmation");
        });
        fetchData();
    }

    const handlePage = (event, value) => {
        const params = {
            pageNumber : value == 1 ? 0 : value,
            countToDisplay : displayCount
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
        setPage(value);
    }

    const handleDisplayCount = (value) => {
        setDisplayCount(value);
        const params = {
            pageNumber : page == 1 ? 0 : page,
            countToDisplay : value
        }
        getEmployeeList(params).then(response => {
            const record = response.data.data;
            const count = response.data.totalCount;
            setRecord(record);
            setTotalCount(count);
        })
    }


    return (
        <div>
            <div>
                <Button color="primary" variant="contained" style={{ margin: '10px' }} onClick={() => handleCreateEmployee(true, "Create Employee")}
                    startIcon={<AddIcon />}>
                    Create Employee
                </Button>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title={title}
                    fetchData={fetchData}
                />
                <div>
                    <MaterialTable
                        title="Employee List"
                        onChangeRowsPerPage={e => handleDisplayCount(e)}
                        columns={columns}
                        options={{
                            sorting: true,
                            search: true
                          }}
                        data={record}
                        editable={{
                            onRowUpdate: (newData, oldData) =>{
                                return handleEdit(newData)
                                },
                            onRowDelete: oldData =>{
                                return handleDelete(oldData.Employee_ID);
                            }
                        }}
                    />
                    <Pagination count={Math.round(totalCount/displayCount)+1} page={page} onChange={handlePage} />
                </div>
            </div>
        </div>
    )
}
export default ProjectDashBoard;