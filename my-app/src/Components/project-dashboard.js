import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { notificationContent } from "../Shared Files/notification";
// import FormDetails from "../Components/modal";
import { Button, Box } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Components/popup-form';


function ProjectDashBoard() {
    let history = useHistory();
    const [openPopup, setOpenPopup] = useState(false);
    const [title, setTitle] = useState("");

    const data = [
        { employee_ID: 1, first_Name: "Raj Sri Selvan", last_Name: "Ponnulingam", email_ID: "rajsriselvan@gamil.com" },
        { employee_ID: 2, first_Name: "Aaravind", last_Name: "Shanmugaraj", email_ID: "vsaravindhan@gamil.com" }
    ]
    const columns = [
        { title: 'Employee ID', field: 'employee_ID' },
        { title: 'First Name', field: 'first_Name' },
        { title: 'Last Name', field: 'last_Name' },
        { title: 'Email ID', field: 'email_ID' },
    ]

    const fetchData = async () => {
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateEmployee = (status, title) => {
        setOpenPopup(status);
        setTitle(title);
    }

    // const handleDelete = async (record) => {
    //     const id = record.note_id;
    //     await deleteNote(id).then(response => {
    //         if(response.data == "success") return notificationContent(response.data, "deleteConfirmation");
    //         else return notificationContent(response.data, "deleteConfirmation");
    //     });
    //     fetchData();
    // }

    // const searchHandler = (value) => {
    //     setSearchTerm(value);
    //     if(value !== "") {
    //         const newList = allNotesList.filter(record => {
    //             return Object.values(record).join(" ").toLowerCase().includes(value.toLowerCase());
    //         });
    //         setSearchResult(newList);
    //     } else {
    //         setSearchResult(noteList);
    //     }
    // }
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
                />
                <div>
                    <MaterialTable
                        title="Employee List"
                        columns={columns}
                        data={data}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        //   setData([...dataUpdate]);

                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        //   setData([...dataDelete]);
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ProjectDashBoard;