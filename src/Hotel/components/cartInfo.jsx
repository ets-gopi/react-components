import React, { useReducer } from "react";
import { IoIosClose } from "react-icons/io";
import { useAuth } from "../context/authContext";
import {
  CartInfoCardWrapper,
  CartInfoWrapper,
  CartInfoCard,
  QuantityButton,
  Button,
} from "../../utils/styledComponents";
import { emptyCart } from "../../assets";
import { Link } from "react-router-dom";

const CartInfo = () => {
  const { userInfo, userActions } = useAuth();
  console.log(userInfo);

  return (
    <React.Fragment>
      <CartInfoWrapper>
        {userInfo.userAddRoomsList.length > 0 ? (
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
                              userActions.handleQuantity("dec");
                            }}
                          >
                            -
                          </button>
                          <span className="value">{room.roomQuantity}</span>
                          <button
                            onClick={() => {
                              userActions.handleQuantity("inc");
                            }}
                          >
                            +
                          </button>
                        </QuantityButton>
                      </div>
                    </div>
                    <div id="price_info">
                      <h3>&#8377;{room.roomPrice}/N</h3>
                    </div>
                  </div>
                </CartInfoCard>
              );
            })}
          </CartInfoCardWrapper>
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
