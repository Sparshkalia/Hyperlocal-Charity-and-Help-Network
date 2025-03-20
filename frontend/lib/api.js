import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

/**
 * Login user with provided credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise<{user_id: number, username: string}>} User data on successful login
 * @throws {Error} On failed login attempt
 */
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/login`,
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

/**
 * Add new user
 * @param {string} username - Username
 * @param {string} email - Email
 * @param {string} password - Password
 * @param {string} full_name - Full name
 * @returns {Promise<{user_id: number, username: string}>} User data on successful registration
 * @throws {Error} On failed registration attempt
 */
export const addNewUser = async (username, password, email, full_name) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/user`,
            { username, password, email, full_name },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
};


/**
 * Update user information
 * @param {number} user_id - User ID
 * @param {string} [full_name] - Updated full name (optional)
 * @param {string} [profile_pic] - Updated profile picture (optional)
 * @param {string} [profile_pic_type] - Type of profile picture (optional)
 * @param {string} [password] - Updated password (optional)
 * @returns {Promise<{user_id: number, username: string, email: string, password: string, profile_pic: string, profile_pic_type: string, created_at: string}>} Updated user data
 * @throws {Error} On failed update attempt
 */
export const updateUser = async (user_id, full_name, profile_pic, profile_pic_type, password) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/user/${user_id}`,
            { full_name, profile_pic, profile_pic_type, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('User update failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'User update failed. Please try again.');
    }
};
