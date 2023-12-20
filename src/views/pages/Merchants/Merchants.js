import { useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './Merchants.css';

const merchants = ['Team PT', 'Fair Money', 'Palmpay'];

const Merchants = () => {
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close the options
        setSelectedMerchant(null);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropdownToggle = (merchant) => {
    setSelectedMerchant(selectedMerchant === merchant ? null : merchant);
  };

  const handleOptionClick = (merchant, option) => {
    // Perform navigation based on the selected merchant and option
    // Replace '/destination' with the actual path you want to navigate to
    console.log(`Navigating to ${merchant} - Option: ${option}`);
  };

  return (
    <div className="merchants-body">
      <div className="add-merchant">
        <a href="#">Add Merchants</a>
      </div>
      <div className="merchants-table">
        {merchants.map((merchant) => (
          <div key={merchant} className="merchant-item">
            <p>{merchant}</p>
            {selectedMerchant === merchant && (
              <div className="dropdown-options" ref={dropdownRef}>
                <div
                  className="option"
                  onClick={() => handleOptionClick(merchant, 'Option 1')}
                >
                  Transactions
                </div>
                <div
                  className="option"
                  onClick={() => handleOptionClick(merchant, 'Option 2')}
                >
                  Add user
                </div>
                <div
                  className="option"
                  onClick={() => handleOptionClick(merchant, 'Option 3')}
                >
                 Settings
                </div>
              </div>
            )}
            <RiArrowDropDownLine onClick={() => handleDropdownToggle(merchant)} />
          </div>
        ))}
      </div>
    </div>   
  );
};

export default Merchants;


















// import { RiArrowDropDownLine } from 'react-icons/ri'
// import './Merchants.css'

// const merchants = ['Team PT', 'Fair Money', 'Palmpay']
// const Merchants = () => {
//   return (
//     <div className="merchants-body">
//       <div className='add-merchant'>
//         <a href='#'>Add Merchants</a>
//       </div>
//       <div className="merchants-table">
//         {merchants.map((merchant) => {
//           return (
//             <div className="merchant-item">
//               <p>{merchant}</p>
//               <RiArrowDropDownLine />
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Merchants
