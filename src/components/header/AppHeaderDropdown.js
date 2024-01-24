import {
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'


const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
      <div style={{width:"30px",height:"30px", borderRadius:"50%", backgroundColor:"purple"}}></div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Logout
          
        </CDropdownItem>
      
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
