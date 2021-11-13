import { notification } from 'antd';

export const notificationContent = (type, code) => {
    if(code === "Registration") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "User Sucessfully Registered !!" : "User Failed to Registered",
          });
    } else if(code === "Login") {
        notification[type]({
            message: type,
            description: type === 'success' ?  "User Sucessfully Login !!" : "User Failed to Login",
          });
    }
}
