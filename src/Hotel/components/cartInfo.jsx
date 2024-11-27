import React, { useEffect, useReducer, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import {
  CartInfoCardWrapper,
  CartInfoWrapper,
  CartInfoCard,
  QuantityButton,
  Button,
  BillingInfoWrapper,
  Loader,
} from "../../utils/styledComponents";
import { emptyCart } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import format from "../../utils/formatDate";
import Modal from "../../components/modal/modal";

const CartInfo = () => {
  const { userInfo, userActions } = useAuth();
  const navigate = useNavigate();
  const [bookingPayload, setBookingPayload] = useState({
    checkIn: "",
    checkOut: "",
    totalGuests: 0,
    totalRooms: 0,
    nights: 0,
    roomInfo: [],
    billingInfo: {
      totalAmount: 0,
      payableAmount: 0,
      gstInfo: {
        rate: 0,
        amount: 0,
        sgst: 0,
        cgst: 0,
      },
    },
    customerInfo: {
      name: "",
      email: "",
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelectedGuests, setUserSelectedGuests] = useState(null);
  const [isUserConfirmedBooking, setIsUserConfirmedBooking] = useState(false);

  useEffect(() => {
    let nights = 0;
    if (
      Object.keys(userInfo.guestDetails).length > 0 &&
      Object.keys(userInfo.userSearchDetails).length > 0
    ) {
      nights = Math.floor(
        (new Date(userInfo.userSearchDetails.checkOut) -
          new Date(userInfo.userSearchDetails.checkIn)) /
          86400000
      );
      setBookingPayload((prev) => {
        return {
          ...prev,
          checkIn: userInfo.userSearchDetails.checkIn,
          checkOut: userInfo.userSearchDetails.checkOut,
          totalGuests: userInfo.userSearchDetails.totalGuests,
          nights: nights,
          customerInfo: userInfo.guestDetails,
        };
      });
    }
    if (userInfo.cartInfo.length > 0 && userInfo.count > 0) {
      const { highestRoomPrice, totalRoomsPricePerNight, totalGuestsByUser } =
        userInfo.cartInfo.reduce(
          (acc, room) => {
            if (room.roomPrice > acc.highestRoomPrice) {
              acc.highestRoomPrice = room.roomPrice;
            }
            acc.totalRoomsPricePerNight =
              acc.totalRoomsPricePerNight + room.roomQuantity * room.roomPrice;
            acc.totalGuestsByUser =
              acc.totalGuestsByUser + room.roomQuantity * room.guestsPerRoom;
            return acc;
          },
          {
            highestRoomPrice: 0,
            totalRoomsPricePerNight: 0,
            totalGuestsByUser: 0,
          }
        );
      console.log(
        "highestRoomPrice",
        highestRoomPrice,
        "totalRoomsPricePerNight",
        totalRoomsPricePerNight,
        "totalGuestsByUser",
        totalGuestsByUser
      );
      let gstInfo = { rate: 0, amount: 0, cgst: 0, sgst: 0 },
        totalAmount,
        payableAmount;
      if (highestRoomPrice <= 7500) {
        gstInfo.rate = 12;
      } else {
        gstInfo.rate = 18;
      }

      // calculate the totalAmount
      totalAmount = totalRoomsPricePerNight * nights;
      gstInfo.amount = totalAmount * (gstInfo.rate / 100);
      gstInfo.sgst = gstInfo.amount / 2;
      gstInfo.cgst = gstInfo.amount / 2;

      payableAmount = totalAmount + gstInfo.amount;

      // modify the user selected rooms info according to backend.
      const roomsInfo = userInfo.cartInfo.map((room, ind) => {
        return {
          roomId: room.roomId,
          roomName: room.roomName,
          guestsPerRoom: room.guestsPerRoom,
          roomPrice: room.roomPrice,
          roomQuantity: room.roomQuantity,
        };
      });

      setUserSelectedGuests((prev) => (prev = totalGuestsByUser));

      setBookingPayload((prev) => {
        return {
          ...prev,
          billingInfo: {
            totalAmount: totalAmount,
            gstInfo: gstInfo,
            payableAmount: payableAmount,
          },
          nights: nights,
          totalRooms: userInfo.count,
          roomInfo: roomsInfo,
        };
      });
    }
  }, [userInfo.cartInfo, userInfo.userSearchDetails, userInfo.guestDetails]);
  //console.log(bookingPayload);
  const handleModalPopUp = () => {
    setIsModalOpen(false);
  };

  const handleBookNow = async () => {
    console.log("bookingPayload", bookingPayload);
    const data = {
      amount: bookingPayload.billingInfo.payableAmount,
      currency: "INR",
      checkIn: bookingPayload.checkIn,
      checkOut: bookingPayload.checkOut,
      totalRooms: bookingPayload.totalRooms,
      nights: bookingPayload.nights,
      roomInfo: bookingPayload.roomInfo,
      billingInfo: bookingPayload.billingInfo,
    };
    const { checkOut } = await userActions.handleCreateOrderId(data);
    navigate(`/hotel-management/checkout?orderId=${checkOut.orderId}`);
  };
  return (
    <React.Fragment>
      <CartInfoWrapper>
        {userInfo.cartInfo.length > 0 ? (
          <React.Fragment>
            <CartInfoCardWrapper>
              {userInfo.cartInfo.map((room, ind) => {
                return (
                  <CartInfoCard key={ind}>
                    <div id="image_container">
                      <img src={room.thumbnailImage} alt="" />
                    </div>
                    <div id="content_container">
                      <div id="name_container">
                        <div>
                          <p>{room.roomName}</p>
                          <label>{`${room.roomType}/${room.bedType}`}</label>
                        </div>
                        <div>
                          <div>
                            <IoIosClose
                              style={{ fontSize: "30px", cursor: "pointer" }}
                              onClick={() => {
                                userActions.handleRemoveRoom(room.roomId);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div id="count_info">
                        <div>
                          <p>
                            <strong>Beds : </strong>
                            {room.beds_count}
                          </p>
                        </div>
                        <div>
                          <label>
                            <strong>Qty</strong>
                          </label>
                          <QuantityButton id="quantity">
                            <button
                              onClick={() => {
                                if (
                                  room.roomQuantity > 1 &&
                                  room.roomQuantity <= room.roomsLeft
                                ) {
                                  userActions.handleQuantity(
                                    "dec",
                                    room.roomId
                                  );
                                }
                              }}
                            >
                              -
                            </button>
                            <span className="value">{room.roomQuantity}</span>
                            <button
                              onClick={() => {
                                if (room.roomQuantity < room.roomsLeft) {
                                  userActions.handleQuantity(
                                    "inc",
                                    room.roomId
                                  );
                                }
                              }}
                            >
                              +
                            </button>
                          </QuantityButton>
                        </div>
                      </div>
                      <div id="price_info">
                        <h3>&#8377;{room.roomQuantity * room.roomPrice}/N</h3>
                      </div>
                    </div>
                  </CartInfoCard>
                );
              })}
            </CartInfoCardWrapper>
            <BillingInfoWrapper>
              <div id="title">
                <h3>Booking Details</h3>
              </div>
              <div id="userBillingInfo">
                <div id="userSearchInfo">
                  <div className="item">
                    <div>{`${format(
                      new Date(bookingPayload?.checkIn)
                    )} to ${format(
                      new Date(bookingPayload?.checkOut)
                    )}`}</div>{" "}
                    <div>
                      <FaCalendarAlt />
                    </div>
                  </div>
                  <div className="item">
                    <div>Guests</div>
                    <div>{bookingPayload?.totalGuests}</div>
                  </div>
                  <div className="item">
                    <div>name</div>
                    <div>{bookingPayload?.customerInfo?.name}</div>
                  </div>
                  <div className="item">
                    <div>email</div>
                    <div>{bookingPayload?.customerInfo?.email}</div>
                  </div>
                </div>
                <div id="billingDetails">
                  <h3>Billing Details</h3>
                  <div className="couponInfo">
                    <input
                      type="text"
                      id="coupon"
                      name="coupon"
                      placeholder="Enter Coupon Code..."
                    />
                    <Button>Apply</Button>
                  </div>
                  <div className="item">
                    <div>{`Room price ( ${bookingPayload.totalRooms} Rooms * ${bookingPayload.nights} N )`}</div>{" "}
                    <div>&#8377;{bookingPayload.billingInfo.totalAmount}</div>
                  </div>
                  <div className="item">
                    <div>Coupon discount</div>{" "}
                    <div>
                      &#8377;
                      {bookingPayload.billingInfo.discount
                        ? bookingPayload.billingInfo.discount
                        : 0}
                    </div>
                  </div>

                  <div className="item">
                    <div>Total Amount</div>{" "}
                    <div>&#8377;{bookingPayload.billingInfo.totalAmount}</div>
                  </div>
                  <div className="item">
                    <div>Taxes & fees </div>
                    <div>
                      &#8377;{bookingPayload.billingInfo.gstInfo.amount}
                    </div>
                  </div>
                  <div className="item">
                    <div>Payable Amount</div>{" "}
                    <div>&#8377;{bookingPayload.billingInfo.payableAmount}</div>
                  </div>
                </div>
              </div>
              <div id="book_button">
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </BillingInfoWrapper>
          </React.Fragment>
        ) : (
          <div id="emptyCart">
            <Link to={"/hotel-management/get-started/"}>
              <img src={emptyCart} alt="emptyCart" />
            </Link>
          </div>
        )}
      </CartInfoWrapper>
      <Modal show={isModalOpen}>
        <Modal.Header closeButton onHide={handleModalPopUp}>
          <Modal.Title>Review Selection</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {userSelectedGuests !== null && bookingPayload.totalGuests !== 0 && (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p>
                  You had searched for {bookingPayload.totalGuests} Guests. Your
                  have only selected Rooms to fit
                  <strong
                    style={{
                      color: `${
                        userSelectedGuests < bookingPayload.totalGuests
                          ? "red"
                          : "green"
                      }`,
                    }}
                  >
                    &nbsp;{userSelectedGuests} Guests.
                  </strong>{" "}
                </p>
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
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          {
            <Button
              disabled={userSelectedGuests < bookingPayload.totalGuests}
              onClick={handleBookNow}
            >
              Confirm Booking
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default CartInfo;
