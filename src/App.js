import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data.json';
import '@fortawesome/fontawesome-free/css/all.css';

const App = () => {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6; // Number of cars per page

    // Load car data from data.json
    useEffect(() => {
        setCars(data);
    }, []);

    // Filter cars by search term
    const filteredCars = cars.filter(car =>
        car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    
    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when searching
    }, [searchTerm]);

    // Paginate the filtered cars
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="main">
            <div className="search-container">
            <input
                type="text"
                class="search-bar" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="searchicon">
             <i class="fas fa-search search-icon"></i>
            </div>
           </div>

            <div className="car-list">
                {currentCars.map((car) => (
                    <div key={car.id} className="car-card">
                      <div className="Details">
                         <img src={car.image_url} alt={car.car_name} className="image" />
                         <div className="Header">
                            <h2>{car.car_name}</h2>
                            <p className="Year">{car.year}</p>
                         </div>
                         <div className="sub1">
                            <div className="capacity">
                                 <i class="fa-solid fa-user-group"></i><p>{car.capacity}</p>
                            </div>
                            <div className="gas">
                               <i class="fa-solid fa-gas-pump"></i><p>{car.gas}</p>   
                            </div>
                          </div>
                          <div className="sub2">
                            <div className="mileage">
                            <i class="fa-solid fa-bolt"></i><p>{car.mileage}</p>
                            </div>
                            <div className="type">
                            <i class="fa-solid fa-car"></i><p>{car.car_type}</p>   
                            </div>
                          </div>
            
                         <div className="sub3">
                            <div className="Price">
                            ${car.price_per_day}<span>/Month</span>
                            </div>
                            <div className="bottom">
                                <div className="like">
                                <i class="fa-regular fa-heart"></i>
                                </div>
                                 <div className="Btn">
                                  <button className="RentNow"> Rent Now</button>
                                </div>
                            </div>
                          </div>
                        </div>
                         
                          
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    
    );
};

export default App;