import axios from "axios";

const BASE_URL ='https://youtube-v31.p.rapidapi.com'

const options = {
    params: {
        // relatedToVideoId: '7ghhRHRP6t4',
        // part: 'id,snippet',
        // type: 'video',
        maxResults: '50'
    },
    headers: {
        'X-RapidAPI-Key': 'fdaa937932mshde31aa96a218994p178b0djsnc61b5fdb6ad0',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchFromAPI = async (url) => {
    const {data} = await axios.get (`${BASE_URL}/${url}`, options);
    return data;
}