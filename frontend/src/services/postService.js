import axios from 'axios';
const API_URL = 'http://127.0.0.1:5000/comments'; 
export const fetchComments = async () => {
  try{
    const response = await axios.get(API_URL)
    return response.data;
  } catch(err){
    console.error('Error fetching posts',err);
    return [];
  }
};