import axios from 'axios';

function AllDelegates(){
    const data = axios.get("/api/delegates")
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default AllDelegates;