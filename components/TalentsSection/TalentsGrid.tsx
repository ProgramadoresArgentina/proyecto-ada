
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TalentCards from './TalentCards';
const CardsPerPage = 15;
const TalentsGrid = () => {

  //mock data
  const peopleData = [
    { "id": "1", "name": "Daniela", "position": "Front-end ", "seniority": "Junior" },
    { "id": "2", "name": "Pepe", "position": "Back-end", "seniority": "Semi-senior" },
    { "id": "3", "name": "Ana", "position": "QA", "seniority": "Semi-senior" },
    { "id": "4", "name": "Julio", "position": "QA", "seniority": "Semi-senior" },
    { "id": "5", "name": "Fulanito", "position": "Fullstack", "seniority": "Junior" },
    { "id": "6", "name": "Kate", "position": "Back-end", "seniority": "Senior" },
    { "id": "7", "name": "Ana", "position": "QA", "seniority": "Semi-senior" },
    { "id": "8", "name": "John", "position": "Front-end", "seniority": "Senior" },
    { "id": "9", "name": "Mia", "position": "Back-end", "seniority": "Junior" },
    { "id": "10", "name": "Carlos", "position": "Fullstack", "seniority": "Semi-senior" },
    { "id": "11", "name": "Eva", "position": "QA", "seniority": "Senior" },
    { "id": "12", "name": "Alex", "position": "Front-end", "seniority": "Junior" },
    { "id": "13", "name": "Sophie", "position": "Back-end", "seniority": "Semi-senior" },
    { "id": "14", "name": "David", "position": "Fullstack", "seniority": "Senior" },
    { "id": "15", "name": "Isabella", "position": "QA", "seniority": "Junior" },
    { "id": "16", "name": "Michael", "position": "Front-end", "seniority": "Semi-senior" },
    { "id": "17", "name": "Emily", "position": "Back-end", "seniority": "Junior" },
    { "id": "18", "name": "Robert", "position": "Fullstack", "seniority": "Senior" },
    { "id": "19", "name": "Grace", "position": "QA", "seniority": "Semi-senior" },
    { "id": "20", "name": "William", "position": "Front-end", "seniority": "Junior" },
    // Add more people as needed
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(''); // State for the selected position filter

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(peopleData.length / CardsPerPage);

  // Filter the data based on the selected position
  const filteredData = selectedPosition
    ? peopleData.filter((person) => person.position === selectedPosition)
    : peopleData;

  const displayedData = filteredData.slice(
    currentPage * CardsPerPage,
    (currentPage + 1) * CardsPerPage
  );

  // Function to handle position filter change
  const handlePositionChange = (position) => {
    setCurrentPage(0); // Reset current page when the filter changes
    setSelectedPosition(position);
  };
  // Function to show all positions
  const showAllPositions = () => {
    setCurrentPage(0);
    setSelectedPosition(''); // Reset the position filter
  };

  return (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold text-center text-white'>
        Hace realidad tu proximo  <span className='degrade-text'> proyecto</span>
      </h1>
      {/* Position filter buttons */}
      <div className="mt-20 md:w-4/5 mx-auto">
        <select
          value={selectedPosition}
          onChange={(e) => handlePositionChange(e.target.value)}
          className="px-1 py-1 border rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 mx-4"
        >
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="">All Positions</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  md:w-4/5 mx-auto">
        {displayedData.map((person) => (
          <TalentCards
            key={person.id}
            MainCardsStyle={"rounded overflow-hidden shadow-lg bg-indigo-800 transition-transform transform hover:-translate-y-2 hover:scale-105 relative  mx-2 md:mx-3"}
            CardColor={"bg-white  w-full mt-10 px-5 py-3 flex flex-col justify-between text-black"}
            ImageColors={"w-20 h-20 rounded-full border-4 border-white absolute top-20 left-1/2 transform -translate-x-1/2      -translate-y-1/2"}
            name={person.name}
            years={person.seniority}
            seniority={person.seniority}
            position={person.position}
          />
        ))}
      </div>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        // styles
        containerClassName={"flex justify-center items-center space-x-4 my-8"}
        pageClassName={'page-item'}
        pageLinkClassName={'text-white'}
        activeClassName={'active'}
        previousClassName="bg-indigo-800 text-white px-2 py-1 rounded"
        nextClassName="bg-indigo-800 text-white px-2 py-1 rounded"
        previousLinkClassName="text-white"
        nextLinkClassName="text-white"
      />
    </div>
  );
}

export default TalentsGrid;
