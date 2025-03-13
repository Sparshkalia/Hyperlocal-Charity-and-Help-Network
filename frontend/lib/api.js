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
