import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, message } from 'antd';
import { GetAllEvents } from '../../apicalls/events'; // Import GetAllEvents function

const Home = () => {
  const [events, setEvents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await GetAllEvents(page, itemsPerPage);
      if (response.success) {
        setEvents(response.events);
        setPageCount(response.totalPages);
        setCurrentPage(page);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Failed to fetch events. Please try again later.');
      console.error(error);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchData(selectedPage);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Search For Events"
        className="search-input"
        onChange={(e) => console.log(e.target.value)}
      />

      <Row gutter={[20]} className="mt-2">
        {events.map((event) => (
          <Col span={6} key={event._id}>
            <div className="event-card">
              <img src={event.imageUrl} alt={event.title} height={200} className="event-image" />
              <div className="event-details">
                <h1 className="event-title">{event.title}</h1>
                <p className="event-date">{event.date}</p>
                <p className="event-city">{event.city}</p>
                <p className="event-price">{event.price ? `₹${event.price.toFixed(2)}` : 'Free'}</p>

              </div>
            </div>
          </Col>
        ))}
      </Row>

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={'< previous'}
        nextLabel={'next >'}
        breakLabel={'...'}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'prev'}
        nextClassName={'next'}
        breakClassName={'break'}
      />
    </div>
  );
};

export default Home;
