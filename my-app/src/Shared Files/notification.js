import { notification } from 'antd';

export const notificationContent = (type, code) => {
    if (code === "Submission") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Employee Sucessfully Submitted !!" : "Failed to Submit",
          });
    } else if(code === "Update") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Employee Sucessfully Updated !!" : "Failed to Update",
          });
    } else if(code === "NoteSubmit") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Your Notes Sucessfully Submitted !!" : "Failed to Submit Your Notes",
          });
    } else if(code === "deleteConfirmation") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Employee Deleted Successfully!!" : "Failed to Delete Employee",
          });
    } 
}
