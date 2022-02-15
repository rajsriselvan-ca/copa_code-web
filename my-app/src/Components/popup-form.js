import React, { useState, useEffect, Fragment } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, makeStyles, TextField, TextareaAutosize, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {createEmployee} from  '../Api/dashboard';

const initialValues = {
    firstName: '',
    lastName: '',
    emailID: '',
    currentAddress: '',
    permanentAddress: '',
    graduationDate: new Date(),
    yearsOfExperience: 0,
    skillSet: '',
}

export default function Popup(props) {
    const [values, setValues] = useState(initialValues);
    const { title, children, openPopup, setOpenPopup } = props;
    // const classes = useStyle();

    const handleForm = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        })

    }

    const handleSubmit = () => {
        console.log("fiunal-->>",values )

        createEmployee(values).then((response) => {
            console.log("p--->", response)
            // if (response.data === "success") {
            //     notificationContent(response.data, "NoteSubmit");
            //     form.resetFields();
            //     clearFormValues();
            //     props.cancel(false);
            //     props.gridData();
            // } 
            // else return notificationContent("error", "NoteSubmit");
        });
    }

    const handleClose = () => {
        setOpenPopup(false)
    }

    return (
        <Dialog open={openPopup} >
            <DialogTitle >
                {title}
            </DialogTitle>
            <DialogContent >
                <form>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label="First Name"
                                name="firstName"
                                value={values.firstName}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                variant='outlined'
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                variant='outlined'
                                label="Email ID"
                                name="emailID"
                                value={values.emailID}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                variant='outlined'
                                label="SkillSet"
                                name="skillSet"
                                value={values.skillSet}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextareaAutosize
                                variant='outlined'
                                label="Current Address"
                                aria-label="minimum height"
                                minRows={2}
                                placeholder="Current Address"
                                name="currentAddress"
                                value={values.currentAddress}
                                style={{ width: 250, margin: 4 }}
                                onChange={handleForm}
                            />
                            <TextareaAutosize
                                variant='outlined'
                                label="Permanent Address"
                                aria-label="minimum height"
                                minRows={2}
                                placeholder="Permanent Address"
                                name="permanentAddress"
                                value={values.permanentAddress}
                                style={{ width: 250, margin: 4 }}
                                onChange={handleForm}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Graduation Date"
                                    value={values.graduationDate}
                                    name="graduationDate"
                                    // onChange={handleForm}
                                    animateYearScrolling
                                    onChange={date => handleForm({ target: { value: date, name: 'graduationDate' } })}
                                    style={{ margin: 6 }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                id="outlined-number"
                                label="Years Of Experience"
                                name= "yearsOfExperience"
                                type="number"
                                value={values.yearsOfExperience}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                        </Grid>
                    </Grid>
                    <div className='action-buttons'  style={{float:'right', margin:'15px'}}>
                    <Button color="primary" variant="contained" onClick={handleSubmit}
                     style={{margin: '5px'}}>
                            Submit
                        </Button>
                        <Button color="primary" variant="outlined" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}