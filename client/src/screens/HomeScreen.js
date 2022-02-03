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
    const [duplicateRooms, setDuplicateRooms] = useState([]);


    const filterByDate = (date) => {
        setFromDate(moment(date[0]).format('DD-MM-YYYY'));
        setToDate(moment(date[1]).format('DD-MM-YYYY'));

        let tempRooms = [];
        let availability = false;
        for (const room of duplicateRooms) {
            if (rooms.currentbookings.length > 0) {
                for (const booking of rooms.currentbookings) {
                    if (!moment(moment(date[0]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                        &&
                        !moment(moment(date[1]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                    ) {
                        if (moment(date[0]).format('DD-MM-YYYY') !== booking.fromDate && moment(date[0]).format('DD-MM-YYYY') !== booking.toDate && moment(date[1]).format('DD-MM-YYYY') !== booking.fromDate && moment(date[1]).format('DD-MM-YYYY') !== booking.toDate) {
                            availability = true;
                        }
                    }
                }
            }
            if (availability == true || rooms.currentbookings.length == 0) {
                tempRooms.push(room);
            }
            setRooms(tempRooms);
        }
    };


    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/rooms/getallrooms');
                setRooms(data.room);
                setDuplicateRooms(data.room);
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
