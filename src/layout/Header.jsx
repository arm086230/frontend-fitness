import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  
  { to : '/', text: 'Workout' },
  { to : '/new', text: 'Trainer' },
  { to : '/Booking', text: 'Booking'},
  // { to : '/WeightTraining', text: 'WeightTraining'},
]

const adminNav = [
  
  { to : '/', text: 'Workout' },
  { to : '/new', text: 'Trainer' },
  { to : '/admin/Booking', text: 'Show Booking'},
  // { to : '/WeightTraining', text: 'WeightTraining'},
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? (user.role ==="ADMIN" ? adminNav : userNav) : guestNav


  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Fitness : {user?.id ? user.username : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}