import axios from 'axios';


export const addBlog = async (data) => {
    let response = await axios.post('https://blogify2-vbhx.onrender.com/addblog', data)
    return response;
}


export const getAllBlog = async () => {
    let response = await axios.get('https://blogify2-vbhx.onrender.com/allblog')
    return response;
}

export const getSingleBlogDetails = async (id) => {
    let response = await axios.get(`https://blogify2-vbhx.onrender.com/getblogbyid/${id}`)
    return response;
}

export const editBlog = async (id, data) => {
    let response = await axios.patch(`https://blogify2-vbhx.onrender.com/editblog/${id}`, data)
    return response;
}