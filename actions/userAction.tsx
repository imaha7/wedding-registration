import axios from "../utils/axios";

export const getUsers = async ({ name }: any) => {
    let response = await axios.get('/posts?name=' + name);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const checkUser = async ({ username }: any) => {
    let response = await axios.get('/check?username=' + username);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const showUser = async ({ id }: any) => {
    let response = await axios.get('/posts/' + id);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const createUser = async ({ username, name, invited_guests_count, status, congrats_words }: any) => {
    let response = await axios.post('/posts', { username: username, name: name, invited_guests_count: invited_guests_count, status: status, congrats_words: congrats_words });
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteUser = async ({ id }: any) => {
    let response = await axios.delete('/posts/' + id);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};