import { notification } from 'antd';

export const notificationContent = (type, code) => {
    if(code === "Registration") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "User Sucessfully Registered !!" : "User Already Exist, Please try with new user id.",
          });
    } else if(code === "Login") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "User Sucessfully Logged In !!" : "User Failed to Login, Please check the credentials",
          });
    } else if(code === "UserExist") {
        notification[type]({
            message: type,
            description: "User already exist, Please try with different Email ID !!",
        })
    } else if(code === "NoteSubmit") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Your Notes Sucessfully Submitted !!" : "Failed to Submit Your Notes",
          });
    } else if(code === "deleteConfirmation") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "Your Notes Deleted Successfully!!" : "Failed to Delete Your Notes",
          });
    } 
}
