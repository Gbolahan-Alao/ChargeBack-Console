import { RiArrowDropDownLine } from 'react-icons/ri'
import './Merchants.css'

const merchants = ['Team PT', 'Fair Money', 'Palmpay']
const Merchants = () => {
  return (
    <div className="merchants-body">
      <div className='add-merchant'>
        <a href='#'>Add Merchants</a>
      </div>
      <div className="merchants-table">
        {merchants.map((merchant) => {
          return (
            <div className="merchant-item">
              <p>{merchant}</p>
              <RiArrowDropDownLine />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Merchants
