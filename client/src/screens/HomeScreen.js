import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

function HomeScreen() {
    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState();
    const [error, setError] = useState();



    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/rooms/getallrooms');
                setRooms(data.room);
                setLoading(false);
            } catch (error) {
                setError(true)
                console.log(error);
                setLoading(false);
            }
        }
        getData();
    }, [])
    return (
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                {
                    loading ? <Loader /> : rooms.length > 1 ? (rooms.map(room => {
                        return <div className='col-md-9 mt-2'>
                            <Room room={room} key={room._id} />
                        </div>
                    })) : (<Error />)
                }
            </div>
        </div>
    );
}

export default HomeScreen;
