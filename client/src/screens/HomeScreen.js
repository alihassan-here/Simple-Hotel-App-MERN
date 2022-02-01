import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


function HomeScreen() {
    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const filterByDate = (date) => {
        const startDate = moment(date[0].format('DD-MM-YYYY'));
        const endDate = moment(date[1].format('DD-MM-YYYY'));
        console.log(startDate);
        console.log(endDate);
        let startD = startDate._i;
        let endD = endDate._i;
        let diff = endD - startD;
        // const totalDays = moment.duration((startDate._i).diff(endDate._i));
        setFromDate(startDate._i);
        setToDate(endDate._i);
        // console.log(fromDate);
    };



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
            <div className='row'>
                <div className='col-md-3 mt-5'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>



            <div className='row justify-content-center mt-5'>
                {
                    loading ? <Loader /> : rooms.length > 1 ? (rooms.map(room => {
                        return <div className='col-md-9 mt-2'>
                            <Room room={room} key={room._id} fromDate={fromDate} toDate={toDate} />
                        </div>
                    })) : (<Error />)
                }
            </div>
        </div>
    );
}

export default HomeScreen;
