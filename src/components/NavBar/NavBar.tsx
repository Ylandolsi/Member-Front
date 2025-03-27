import { ModeToggle } from '../DarkMode';
import { LuKeyRound } from 'react-icons/lu';
import './NavBar.scss';
import DropdownMenuDemo from './DropDown/DropDown';
export const Navbar = function () {
  return (
    <div className="NAVBAR">
      <div className="NavBar">
        <div className="name-icon">
          <p
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Members Only
          </p>
          <div>
            <LuKeyRound
              style={{
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            />
          </div>
        </div>

        <div className="drop-dark">
          <DropdownMenuDemo />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
