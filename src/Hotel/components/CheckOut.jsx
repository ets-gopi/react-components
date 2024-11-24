import React, { useEffect, useState } from "react";
import {
  BookingInfo,
  Button,
  CheckOutInfo,
  CheckOutWrapper,
  PaymentInfo,
} from "../../utils/styledComponents";
import { IoTimeOutline } from "react-icons/io5";
import { MdBedroomChild } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
const CheckOut = () => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const handlePay = () => {
    var options = {
      key: "rzp_test_bMUoTkWnEtCw2G",
      amount: "50000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_9A33XWu170gUtm",
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    if (isRazorpayLoaded) {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
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
  return (
    <React.Fragment>
      <div>CheckOut</div>
      <CheckOutWrapper>
        <CheckOutInfo>
          <div>Pay &#8377;4016 to confirm booking</div>
          <div>
            <IoTimeOutline /> TimeLeft: 16:45
          </div>
        </CheckOutInfo>
        <BookingInfo>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <FaCalendarAlt />
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <MdBedroomChild />
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <IoIosInformationCircleOutline />
            </div>
            <div></div>
          </div>
        </BookingInfo>
        <PaymentInfo>
          <div>
            <div>Grand Total</div>
            <div></div>
          </div>
          <div>
            <div>Hotel Fare</div>
            <div></div>
          </div>
          <div>
            <div>Taxes</div>
            <div></div>
          </div>
          <div>
            <div>Discount</div>
            <div></div>
          </div>
        </PaymentInfo>
      </CheckOutWrapper>

      <Button id="rzp-button1" onClick={handlePay}>
        Pay
      </Button>
    </React.Fragment>
  );
};

export default CheckOut;
