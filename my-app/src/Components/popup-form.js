import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, TextField, TextareaAutosize, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createEmployee } from '../Api/dashboard';
import { notificationContent } from '../Shared Files/notification';
var moment = require('moment');

const initialValues = {
    firstName: '',
    lastName: '',
    emailID: '',
    currentAddress: '',
    permanentAddress: '',
    graduationDate: moment(new Date()).format('D MMMM YYYY'),
    yearsOfExperience: 0,
    skillSet: '',
}

export default function Popup(props) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [hasError, setHasError] = useState(false);
    const { title, openPopup, setOpenPopup, fetchData } = props;


    const handleForm = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const fieldValidation = () => {
        let temp = {}
        temp.firstName = values.firstName ? "" : "Please Enter First Name";
        temp.lastName = values.lastName ? "" : "Please Enter Last Name";
        temp.emailID = (/$^|.+@.+..+/).test(values.emailID) && values.emailID.length > 0 ? "" : "Please Enter Valid Email ID";
        temp.skillSet = values.skillSet ? "" : "Please Enter SkillSet";
        let yearsOfExperience = 0;
            yearsOfExperience = parseInt(values.yearsOfExperience);
            if (yearsOfExperience > 0 && yearsOfExperience < 25) {
                temp.yearsOfExperience = "";
            } else {
                temp.yearsOfExperience = "Please Enter a Valid Year of Experience";
            }
        setErrors({
            ...temp
        });
        return Object.values(temp).some(x => x !== "");
    }

    const handleSubmit = (e) => {
        setHasError(fieldValidation());
        if (!fieldValidation()) {
            createEmployee(values).then((response) => {
                if (response.data === "success") {
                    notificationContent("success", "Submission");
                    setValues(initialValues);
                    handleClose();
                    fetchData();
                }
                else {
                    notificationContent("error", "Submission");
                }
            });
        }
        else {
            return
        }
    }

    const handleClose = () => {
        setOpenPopup(false);
        setValues(initialValues);
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
                                required={true}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                variant='outlined'
                                label="First Name"
                                name="firstName"
                                value={values.firstName}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                required={true}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                variant='outlined'
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                required={true}
                                error={!!errors.emailID}
                                helperText={errors.emailID}
                                variant='outlined'
                                label="Email ID"
                                name="emailID"
                                value={values.emailID}
                                style={{ margin: 4, width: '90%' }}
                                onChange={handleForm}
                            />
                            <TextField
                                required={true}
                                error={!!errors.skillSet}
                                helperText={errors.skillSet}
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
                                    onChange={handleForm}
                                    animateYearScrolling
                                    onChange={date => handleForm({ target: { value: moment(date).format('D MMMM YYYY'), name: 'graduationDate' } })}
                                    style={{ margin: 6 }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                required={true}
                                error={!!errors.yearsOfExperience}
                                helperText={errors.yearsOfExperience}
                                id="outlined-number"
                                label="Years Of Experience"
                                name="yearsOfExperience"
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
                    <div className='action-buttons' style={{ float: 'right', margin: '15px' }}>
                        <Button color="primary" variant="contained" onClick={(e) => handleSubmit(e)}
                            style={{ margin: '5px' }}>
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