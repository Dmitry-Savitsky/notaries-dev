import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (ClientName, ClientBirth, ClientAddress, ClientPhone, Role, Email, Password) => {
    try {

        console.log("registration request data:");
        console.log(ClientName, ClientBirth, ClientAddress, ClientPhone, Role, Email, Password)

        const { data } = await $host.post("api/user/registration", {
            ClientName,
            ClientBirth,
            ClientAddress,
            ClientPhone,
            Role,
            Email,
            Password, 
        });

        localStorage.setItem('token', data.token);
        console.log("token: " + data.token);
        localStorage.setItem('isAuth', true);
        console.log("isAuth installed");

        return jwtDecode(data.token);
    } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (Email, Password) => {
    try {
        console.log("login request data:" + Email + " " + Password);
        const { data } = await $host.post("api/user/login", { Email, Password });

        localStorage.setItem('token', data.token);        
        console.log("token:" + data.token);
        localStorage.setItem('isAuth', true);        
        console.log("isAuth installed");

        return jwtDecode(data.token);
    } catch (error) {
        // Handle login error
        console.error('Login error:', error);
        throw error;
    }
};

// export const check = async () => {
//     try {
//         const response = await $host.post('/registrationdata/auth');

//         localStorage.setItem('token', response.data);
//         return response;
//     } catch (error) {
//         // Handle check error
//         console.error('Check error:', error);
//         throw error;
//     }
// };

// export const getAllUserFeedbacks = async (id) => {
//     try {
//         const { data } = await $host.get('/feedbacks/all/user/' + id);
//         return data;
//     } catch (error) {
//         // Handle error
//         console.error('Error getting user feedbacks:', error);
//         throw error;
//     }
// };
