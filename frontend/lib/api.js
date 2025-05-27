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

/**
 * Saves a bytea buffer as an image file.
 * @param {Buffer} byteaBuffer - The binary image data from PostgreSQL.
 * @param {string} mimeType - The MIME type (e.g., 'image/jpeg', 'image/png').
 * @param {string} outputPath - Path to save the image (without extension).
 */
function saveByteaImage(byteaBuffer, mimeType, outputPath) {
  const extension = mimeType.split('/')[1]; // Extract 'jpeg' or 'png'
  const finalPath = outputPath.endsWith(extension)
    ? outputPath
    : `${outputPath}.${extension}`;

  fs.writeFileSync(finalPath, byteaBuffer);
  console.log('Image saved to:', finalPath);
}

/**
 * Converts binary image data to a base64 data URL for use in <img src="...">.
 * @param {Uint8Array | ArrayBuffer} byteaBuffer - The binary image data.
 * @param {string} mimeType - The image MIME type (e.g., "image/png").
 * @returns {string} - A data URL string usable in <img src="...">.
 */
export default function byteaToDataURL(byteaBuffer, mimeType) {
    let uint8Array;
    if (byteaBuffer instanceof ArrayBuffer) {
        uint8Array = new Uint8Array(byteaBuffer);
    } else if (byteaBuffer instanceof Uint8Array) {
        uint8Array = byteaBuffer;
    } else {
        throw new TypeError('Input must be an ArrayBuffer or Uint8Array');
    }

    const binary = String.fromCharCode(...uint8Array);
    const base64 = btoa(binary);
    return `data:${mimeType};base64,${base64}`;
}
