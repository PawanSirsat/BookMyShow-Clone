import { message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { GetShowById } from "../../apicalls/theatre";
import { MakePayment } from "../../apicalls/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats; // 120
    const rows = Math.ceil(totalSeats / columns); // 10
    return (
      <div>
        <p className="m-4 text-center">Screen This Side</p>
        <hr />
        <div className="flex gap-1 flex-col p-2 card">
          <hr />
          {Array.from(Array(rows).keys()).map((seat, index) => {
            return (
              <div className="flex gap-1 justify-center" key={index}>
                {Array.from(Array(columns).keys()).map((column) => {
                  const seatNumber = seat * columns + column + 1;
                  let seatClass = "seat";

                  if (selectedSeats.includes(seatNumber)) {
                    seatClass += " selected-seat";
                  }
                  if (show.bookedSeats.includes(seatNumber)) {
                    seatClass += " booked-seat";
                  }

                  return (
                    seatNumber <= totalSeats && (
                      <div
                        className={seatClass}
                        key={seatNumber}
                        onClick={() => {
                          if (selectedSeats.includes(seatNumber)) {
                            setSelectedSeats(selectedSeats.filter((item) => item !== seatNumber));
                          } else {
                            setSelectedSeats([...selectedSeats, seatNumber]);
                          }
                        }}
                      >
                        <h1 className="text-sm">{seatNumber}</h1>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const onToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment({
        showId: params.id,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    show && (
      <div>
        {/* Show information */}
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-sm">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>
          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>
          <div>
            <h1 className="text-sm">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>
        {/* Seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>
        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm">
                  <b>Selected Seats</b> : {selectedSeats.join(" , ")}
                </h1>
                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show?.ticketPrice}
                </h1>
              </div>
            </div>
            <Button onClick={onToken} title="Book Now" />
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;
