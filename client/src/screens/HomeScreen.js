import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

import moment from 'moment';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import e from 'express';
const { RangePicker } = DatePicker;


function HomeScreen() {
    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [type, setType] = useState('all')


    const filterByDate = (date) => {
        setFromDate(moment(date[0]).format('DD-MM-YYYY'));
        setToDate(moment(date[1]).format('DD-MM-YYYY'));

        let tempRooms = [];
        let availability = false;
        for (const room of duplicateRooms) {
            if (rooms.currentbookings.length > 0) {
                for (const booking of rooms.currentbookings) {
                    if (!moment(moment(date[0]).format('DD-MM-YYYY')))
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

    // const filterbySearch = () => {
    //     let tempRooms = duplicateRooms.filter(room => {
    //         return room.name.toLowerCase().includes(searchKey.toLowerCase());
    //     })
    //     // let tempRooms = [];
    //     // for (const room of duplicateRooms) {
    //     //     if (room.name.toLowerCase().includes(searchKey.toLowerCase())) {
    //     //         tempRooms.push(room);
    //     //     }
    //     // }
    //     setRooms(tempRooms);
    // }

    // const filterByType = (e) => {
    //     let tempRooms = duplicateRooms.filter(room => {
    //         return room.type.toLowerCase() == e.toLowerCase();
    //         // let tempRooms = [];
    //         // for (const room of duplicateRooms) {
    //         //     if (room.type == type) {
    //         //         tempRooms.push(room);
    //         //     }
    //         // }
    //     })
    //     setRooms(tempRooms);
    // }


    return (
        <div className='container'>
            <div className='row bs'>
                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                {/* <div className='col-md-5'>
                    <input type='text' className='form-control' placeholder='Search room'
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }
                        }
                        onKeyUp={filterbySearch}
                    />
                </div>
                <div className='col-md-3'>
                    <select className='form-control' value={type} onChange={filterByType(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='delux'>Delux</option>
                        <option value='non-delux'>Non-Delux</option>
                    </select>
                </div> */}
            </div>



            <div className='row justify-content-center mt-5'>
                {
                    loading ? <Loader /> : (rooms.map(room => {
                        return <div className='col-md-9 mt-2'>
                            <Room room={room} key={room._id} fromDate={fromDate} toDate={toDate} />
                        </div>
                    }))
                }
            </div>
        </div>
    );
}

export default HomeScreen;
