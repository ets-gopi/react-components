import React, { useEffect, useState } from "react";
import {
  BookingInfo,
  Button,
  CheckOutInfo,
  CheckOutWrapper,
  Loader,
  PaymentInfo,
} from "../../utils/styledComponents";
import { IoTimeOutline } from "react-icons/io5";
import { MdBedroomChild } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useAuth } from "../context/authContext";
import Modal from "../../components/modal/modal";
import { Link } from "react-router-dom";
let timer;
const CheckOut = () => {
  const { userInfo, userActions } = useAuth();
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
  const [checkOutData, setCheckOutData] = useState({
    checkOut: {},
    billingInfo: {},
    userSearchDetails: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    sessionExpired: false,
    afterOrderId: false,
  });
  const handlePay = () => {
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: checkOutData.checkOut.amount,
      currency: checkOutData.checkOut.currency,
      name: "Shey Hotels",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: userInfo.checkOut.orderId,
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        const data = {
          orderId: userInfo.checkOut.orderId,
          checkIn: checkOutData.userSearchDetails.checkIn,
          checkOut: checkOutData.userSearchDetails.checkOut,
          totalGuests: checkOutData.userSearchDetails.totalGuests,
          totalRooms: checkOutData.userSearchDetails.totalRooms,
          nights: checkOutData.userSearchDetails.nights,
          roomInfo: userInfo.cartInfo,
          billingInfo: {
            ...checkOutData.billingInfo,
            paymentStatus: "Paid",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          },
          customerInfo: userInfo.guestDetails,
        };
        const result = await userActions.handleBookingPayload(data);
        const { status, message } = result;
        if (status) {
          setIsModalOpen(true);
          setBookingStatus((prev) => {
            return {
              ...prev,
              success: true,
              loading: false,
              error: false,
              message:
                "Your booking has been successfully confirmed! Thank you for choosing Shey Hotels. You will receive a confirmation email shortly with your booking details.",
            };
          });
        }
      },
      prefill: {
        name: userInfo.guestDetails.name,
        email: userInfo.guestDetails.email,
        contact: "+919000090000",
      },
      theme: {
        color: "#3399cc",
      },
      retry: {
        enabled: false,
      },
    };
    if (isRazorpayLoaded) {
      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", async function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        const data = {
          orderId: userInfo.checkOut.orderId,
          checkIn: checkOutData.userSearchDetails.checkIn,
          checkOut: checkOutData.userSearchDetails.checkOut,
          totalGuests: checkOutData.userSearchDetails.totalGuests,
          totalRooms: checkOutData.userSearchDetails.totalRooms,
          nights: checkOutData.userSearchDetails.nights,
          roomInfo: userInfo.cartInfo,
          billingInfo: {
            ...checkOutData.billingInfo,
            paymentStatus: "Failed",
            razorpayPaymentId: response.error.metadata.payment_id,
            razorpayOrderId: response.error.metadata.order_id,
            razorpaySignature: "null",
          },
          customerInfo: userInfo.guestDetails,
        };
        const result = await userActions.handleForFailedBookingPayload(data);
        const { status, message } = result;
        if (status) {
          setIsModalOpen(true);
          setBookingStatus((prev) => {
            return {
              ...prev,
              error: true,
              success: false,
              loading: false,
              message:
                "Oops! Something went wrong with your booking. Please try again or contact customer support for assistance.",
            };
          });
        }
      });

      rzp1.open();
    }
  };
  const calculateTime = (timeInMilliSecs) => {
    const secs = timeInMilliSecs / 1000;
    const days = Math.floor(secs / 86400);
    const hours = Math.floor((secs % 86400) / 3600);
    const minutes = Math.floor(((secs % 86400) % 3600) / 60);
    const seconds = Math.floor(((secs % 86400) % 3600) % 60);
    return { minutes, seconds };
  };
  useEffect(() => {
    // Function to check if Razorpay is loaded
    const checkRazorpayLoaded = () => {
      if (window.Razorpay) {
        setIsRazorpayLoaded(true);
        console.log("Razorpay is loaded");
      } else {
        console.log("Razorpay is not loaded");
      }
    };

    // Check after the component is mounted
    checkRazorpayLoaded();
  }, []);
  useEffect(() => {
    if (Object.keys(userInfo.billingInfo).length > 0) {
      setCheckOutData((prev) => {
        return {
          ...prev,
          billingInfo: userInfo.billingInfo,
        };
      });
    }
    if (Object.keys(userInfo.userSearchDetails).length > 0) {
      setCheckOutData((prev) => {
        return {
          ...prev,
          userSearchDetails: userInfo.userSearchDetails,
        };
      });
    }
    if (Object.keys(userInfo.checkOut).length > 0) {
      setCheckOutData((prev) => {
        return {
          ...prev,
          checkOut: userInfo.checkOut,
        };
      });
    }

    if (
      Object.keys(userInfo.billingInfo).length === 0 &&
      Object.keys(userInfo.checkOut).length === 0 &&
      Object.keys(userInfo.userSearchDetails).length > 0
    ) {
      setIsModalOpen(true);
      setCheckOutData((prev) => {
        return {
          ...prev,
          userSearchDetails: {},
        };
      });
      setBookingStatus((prev) => {
        return {
          ...prev,
          success: false,
          error: false,
          loading: false,
          afterOrderId: true,
          sessionExpired: false,
          message:
            "Oops! Something went wrong with your orderId. Please start the booking process again.",
        };
      });
    }
  }, [userInfo.userSearchDetails, userInfo.checkOut, userInfo.billingInfo]);
  useEffect(() => {
    if (Object.keys(userInfo.checkOut).length > 0) {
      timer = setInterval(() => {
        const userD = new Date(userInfo.checkOut.expiresAt);
        const difference =
          new Date(
            userD.getFullYear(),
            userD.getMonth(),
            userD.getDate(),
            userD.getHours(),
            userD.getMinutes()
          ) - new Date();
        //console.log(difference);

        if (difference <= 0) {
          console.log(userInfo.cartInfo);
          userActions.handlUpdateRoomsAfterExpiry(userInfo.cartInfo);
          userActions.handleSessionEnd();
          setIsModalOpen(true);
          setBookingStatus((prev) => {
            return {
              ...prev,
              success: false,
              error: false,
              loading: false,
              sessionExpired: true,
              message:
                " Your session has expired due to inactivity for security and availability purposes. Please start the booking process again.",
            };
          });
          clearInterval(timer);

          setCountdown({ minutes: 0, seconds: 0 });
          return;
        }
        const res = calculateTime(difference);
        setCountdown(res);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [userInfo.checkOut]);

  return (
    <React.Fragment>
      <CheckOutWrapper>
        <CheckOutInfo>
          {Object.keys(checkOutData.checkOut).length > 0 ? (
            <React.Fragment>
              <div id="item1">
                Pay &#8377;{checkOutData?.billingInfo?.payableAmount || 0} to
                confirm booking
              </div>
              <div id="item2">
                <IoTimeOutline /> TimeLeft:{" "}
                {`${
                  countdown.minutes < 10
                    ? `0${countdown.minutes}`
                    : `${countdown.minutes}`
                }:${
                  countdown.seconds < 10
                    ? `0${countdown.seconds}`
                    : `${countdown.seconds}`
                }`}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </CheckOutInfo>
        <BookingInfo>
          {Object.keys(checkOutData.userSearchDetails).length > 0 ? (
            <React.Fragment>
              <div id="item1">
                <div>
                  <img
                    src={checkOutData.userSearchDetails.propertyImage}
                    alt="property_Image"
                  />
                </div>
                <div className="content">
                  <p>{checkOutData.userSearchDetails.propertyName}</p>
                  <label>{`${checkOutData.userSearchDetails.propertyLocation?.address}, ${checkOutData.userSearchDetails.propertyLocation?.city}, ${checkOutData.userSearchDetails.propertyLocation?.state}, ${checkOutData.userSearchDetails.propertyLocation?.country}, ${checkOutData.userSearchDetails.propertyLocation?.postalCode}`}</label>
                </div>
              </div>
              <div id="item2">
                <div className="icon">
                  <FaCalendarAlt />
                </div>
                <div className="content">
                  <div>
                    <span>CheckIn</span>
                    <p>{checkOutData.userSearchDetails.checkIn}</p>
                  </div>
                  <div>
                    <span>CheckIn</span>
                    <p>{checkOutData.userSearchDetails.checkOut}</p>
                  </div>
                </div>
              </div>
              <div id="item3">
                <div className="icon">
                  <MdBedroomChild />
                </div>
                <div>
                  <ul style={{ marginLeft: "18px" }}>
                    {userInfo.cartInfo.map((room, ind) => {
                      return (
                        <li key={room.roomId}>{`${room.roomQuantity} * ${
                          room.roomName
                        } - ${
                          room.roomQuantity * room.guestsPerRoom
                        } Guests.`}</li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div id="item4">
                <div className="icon">
                  <IoIosInformationCircleOutline />
                </div>
                <div className="content">
                  <div>
                    <span>Name</span>
                    <p>{userInfo.guestDetails.name}</p>
                  </div>
                  <div>
                    <span>Email</span>
                    <p>{userInfo.guestDetails.email}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </BookingInfo>
        <PaymentInfo>
          {Object.keys(checkOutData.billingInfo).length > 0 ? (
            <React.Fragment>
              <div id="item1">
                <div>Grand Total</div>
                <div>{checkOutData.billingInfo.payableAmount}</div>
              </div>
              <div id="item2">
                <div>Hotel Fare</div>
                <div>{checkOutData.billingInfo.totalAmount}</div>
              </div>
              <div id="item3">
                <div>Taxes</div>
                <div>{checkOutData.billingInfo.gstInfo.amount}</div>
              </div>
              <div id="item4">
                <div>Discount</div>
                <div>{checkOutData.billingInfo.discount || 0}</div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </PaymentInfo>
      </CheckOutWrapper>
      {Object.keys(checkOutData.billingInfo).length !== 0 &&
        Object.keys(checkOutData.userSearchDetails).length !== 0 &&
        Object.keys(checkOutData.checkOut).length !== 0 && (
          <div style={{ textAlign: "center", margin: "10px" }}>
            <Button id="rzp-button1" onClick={handlePay}>
              Pay Now
            </Button>
          </div>
        )}

      <Modal show={isModalOpen}>
        {bookingStatus.sessionExpired && (
          <Modal.Header>
            <Modal.Title>Session TimeOut</Modal.Title>
          </Modal.Header>
        )}
        {bookingStatus.afterOrderId && (
          <Modal.Header>
            <Modal.Title>Something went wrong</Modal.Title>
          </Modal.Header>
        )}
        {bookingStatus.loading && (
          <Modal.Header>
            <Modal.Title>Booking InProgress...</Modal.Title>
          </Modal.Header>
        )}
        {!bookingStatus.loading &&
          !bookingStatus.sessionExpired &&
          !bookingStatus.afterOrderId && (
            <Modal.Header>
              <Modal.Title>Booking Creation</Modal.Title>
            </Modal.Header>
          )}

        <Modal.Body>
          {bookingStatus.loading && (
            <div>
              <Loader />
            </div>
          )}
          {bookingStatus.success && bookingStatus.message}
          {bookingStatus.error && bookingStatus.message}
          {bookingStatus.sessionExpired && bookingStatus.message}
          {bookingStatus.afterOrderId && bookingStatus.message}
        </Modal.Body>
        <Modal.Footer>
          {!bookingStatus.loading &&
            (bookingStatus.afterOrderId ? (
              <Link
                to="/hotel-management"
                style={{ background: "green" }}
                onClick={() => {
                  setIsModalOpen(false);
                  userActions.handleSessionEnd();
                }}
              >
                Go to Home
              </Link>
            ) : (
              <Link
                to="/hotel-management"
                style={{ background: "green" }}
                onClick={() => {
                  setIsModalOpen(false);
                  userActions.handleSessionEnd();
                }}
              >
                Continue Booking
              </Link>
            ))}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default CheckOut;
