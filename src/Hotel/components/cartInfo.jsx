import React, { useEffect, useReducer, useState } from "react";
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
} from "../../utils/styledComponents";
import { emptyCart } from "../../assets";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import format from "../../utils/formatDate";

const CartInfo = () => {
  const { userInfo, userActions } = useAuth();
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
  useEffect(() => {
    if (
      localStorage.getItem("userSearchRoomData") &&
      JSON.parse(localStorage.getItem("userSearchRoomData"))
    ) {
      const data = JSON.parse(localStorage.getItem("userSearchRoomData"));
      setBookingPayload({
        ...bookingPayload,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        totalGuests: data.totalGuests,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <CartInfoWrapper>
        {userInfo.userAddRoomsList.length > 0 ? (
          <React.Fragment>
            <CartInfoCardWrapper>
              {userInfo.userAddRoomsList.map((room, ind) => {
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
                  {/* <div className="item">
                    <div>rooms</div>
                    <div>{userInfo.count}</div>
                  </div> */}
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
                    <div>Taxes & fees </div>
                    <div>
                      &#8377;{bookingPayload.billingInfo.gstInfo.amount}
                    </div>
                  </div>
                  <div className="item">
                    <div>Coupon discount</div>{" "}
                    <div>
                      &#8377;{bookingPayload.billingInfo.gstInfo.amount}
                    </div>
                  </div>
                  <div className="item">
                    <div>Total Amount:</div>{" "}
                    <div>&#8377;{bookingPayload.billingInfo.totalAmount}</div>
                  </div>
                  <div className="item">
                    <div>Payable Amount:</div>{" "}
                    <div>&#8377;{bookingPayload.billingInfo.payableAmount}</div>
                  </div>
                </div>
              </div>
              <div id="book_button">
                <Button>Book Now</Button>
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
    </React.Fragment>
  );
};

export default CartInfo;
