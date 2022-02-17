import React, { useState, useEffect } from 'react'
import { notificationContent } from "../Shared Files/notification";
import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Components/popup-form';
import {getEmployeeList, updateEmployee, deleteEmployee} from  '../Api/dashboard';


function ProjectDashBoard() {
    const [openPopup, setOpenPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [list, setList] = useState([]);

    // const fetchData = async () => {
    //     const incomingList = await getEmployeeList();
    //     setList(incomingList.data);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);    
    
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
        // fetchData();
    }

    const handleDelete = async (id) => {
        await deleteEmployee(id).then(response => {
            if(response.data == "success") return notificationContent(response.data, "deleteConfirmation");
            else return notificationContent(response.data, "deleteConfirmation");
        });
        // fetchData();
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
                    // fetchData={fetchData}
                />
                <div>
                    <MaterialTable
                        title="Employee List"
                        columns={columns}
                        data={query =>
                            new Promise((resolve, reject) => {
                                // console.log("vss----", query.page, query.pageSize)
                                let params = `_page=${query.page+1}&_limit=${query.pageSize}`
                            getEmployeeList(params).then(resp => {
                                    console.log("response----", resp)
                                    resolve({
                                        data: resp.data,// your data array
                                        page: query.page,// current page number
                                        totalCount: 20// total row number
                                    });
                                })
                            })
                        }
                        editable={{
                            onRowUpdate: (newData, oldData) =>{
                                return handleEdit(newData)
                                },
                            onRowDelete: oldData =>{
                                return handleDelete(oldData.Employee_ID);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ProjectDashBoard;