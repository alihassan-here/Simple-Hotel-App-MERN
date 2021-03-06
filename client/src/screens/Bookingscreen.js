import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';


const Bookingscreen = ({ match }) => {
    const [room, setRoom] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [totalAmount, setTotalAmount] = useState();

    const roomId = match.params.roomid;
    const fromDate = moment(match.params.fromDate, 'DD-MM-YYYY');
    const toDate = moment(match.params.toDate, 'DD-MM-YYYY');

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

    useEffect(() => {
        const postData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid });
                setRoom(data);
                setTotalAmount(data.rentperday * totalDays);
                setLoading(false);
            } catch (error) {
                setError(true)
                console.log(error);
                setLoading(false);
            }
        }
        postData();
    }, []);

    // const bookRoom = async () => {
    //     const bookingDetails = {
    //         room,
    //         userId: JSON.parse(localStorage.getItem('currentUser'))._id,
    //         fromDate,
    //         toDate,
    //         totalAmount,
    //         totalDays
    //     }
    //     try {
    //         const result = await axios.post('/api/booking/bookroom', bookingDetails);
    //     } catch (error) {

    //     }
    // }
    const onToken = async (token) => {
        console.log(token)
        const bookingDetails = {
            room,
            userId: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }
        try {
            setLoading(true);
            const result = await axios.post('/api/booking/bookroom', bookingDetails);
            setLoading(false);
            Swal.fire({
                title: 'Booking Successful',
                text: 'Your booking has been successfully made',
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            }).then(() => {
                window.location.href = '/bookings';
            })
        } catch (error) {
            console.log(error)
            setLoading(false);
            Swal.fire({
                title: 'Booking Failed',
                text: 'Your booking has failed',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


    return (
        <div className='m-5'>
            {
                loading ? (<h1><Loader /></h1>) : room ? (
                    <div>
                        <div className='row justify-content-center mt-5 bs'>
                            <div className='col-md-6'>
                                <h1>{room.name}</h1>
                                <img src={room.imageurls[0]} alt={room.name} className='bigimg' />
                            </div>
                            <div className='col-md-6'>
                                <div style={{ textAlign: 'right' }}>
                                    <h1>Booking Details</h1>
                                    <hr />
                                    <b>
                                        <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}  </p>
                                        <p>From Date: {match.params.fromDate} </p>
                                        <p>To Date: {match.params.toDate} </p>
                                        <p>Max Count: {room.maxcount}</p>
                                    </b>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <b>
                                        <h1>Amount</h1>
                                        <hr />
                                        <p>Total Days: {totalDays} </p>
                                        <p>Rent per day: {room.rentperday}</p>
                                        <p>Total Amount: {totalAmount}</p>
                                    </b>
                                </div>
                                <div style={{ float: 'right' }}>
                                    {/* <button className='btn btn primary' onClick={bookRoom}>Pay Now</button> */}
                                    <StripeCheckout
                                        amount={totalAmount * 100}
                                        currency='pkr'
                                        token={onToken}
                                        stripeKey="pk_test_51KUDthEm7PEDC4IWEZGDgpb4qhU5yH0Exwktvdbzm14Td5rCijXHXgulSehhPlKUzChoiK6Jhzq5EzdZry2l27Dv00HlGjaUXW"
                                    >
                                        <button className='btn btn primary'>Pay Now</button>
                                    </StripeCheckout>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Error />
            }
        </div>
    );

};

export default Bookingscreen;
