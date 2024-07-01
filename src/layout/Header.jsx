import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  
  { to : '/', text: 'Home' },
  { to : '/login', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  
  { to : '/', text: 'exercise posture' },
  { to : '/new', text: 'Trainer' },
  { to : '/Booking', text: 'Booking'},
  // { to : '/WeightTraining', text: 'WeightTraining'},
]

const adminNav = [
  
  { to : '/', text: 'adminWorkout' },
  {to : "/admin/showuser", text: "Showuser"},
  {to: '/admin/showworkout ',text: 'Showorkout'},
  { to : '/admin/addTainer', text: 'adminTrainer' },
  { to : '/admin/Showtainer', text: 'Showtainer'},
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
  <div className="navbar bg-blue-400 flex justify-between items-center py-2 px-9 border-b  border-gray-300">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl text-gray-600 ">Kratos Fitness : {user?.id ? user.username : 'Guest'}</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        {finalNav.map(el => (
          <li key={el.to} >
            <Link to={el.to} className="text-base text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">{el.text}</Link>
          </li>
        ))}
        {user?.id && (
          <li>
            <Link to='#' onClick={hdlLogout} className="text-base text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
  );
}
