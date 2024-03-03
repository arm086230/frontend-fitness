import React , {useState} from 'react'
import axios from 'axios'

function addTainer() {
  const [addTainer , setAddTainer] = useState({
    name : '',
    age : '',
    img : '',
    phone : '',
    status : '',

  })
  const hdlChange = e =>{
    setAddTainer(prv => ({...prv, [e.target.name]: e.target.value }))
  }
  const hdlSubmit = async (e) => {
    try{
      e.preventDefault();
      const token = localStorage.getItem('token')
      console.log(addTainer)
      const rs = await axios.post('http://localhost:8889/workout/createtraniner', addTainer , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(rs.status === 200){
        alert('trainer added successfully')
      }
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className='p-5 border w-4/6 min-w-[500px] mx-auto mx-auto rounded mt-5 bg-gradient-to-b from-gray-200 flex justify-center items-center'>
      <div className='w-full max-w-xs'>
        <div className='text-3xl mb-5 text-black'>Addtainer</div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <label className='form-control'>
              <span className='label-text text-black'>Name</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='name'
                value={addTainer.name}
                onChange={hdlChange}
              />
          </label>
          <label className='form-control'>
              <span className='label-text text-black'>Age</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='age'
                value={addTainer.age}
                onChange={hdlChange}

              />
          </label>
          <label className='form-control'>
              <span className='label-text text-black'>Image</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='img'
                value={addTainer.img}
                onChange={hdlChange}
              />
          </label>
          <label className='form-control'>
              <span className='label-text text-black'>Phone</span>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                name='phone'
                value={addTainer.phone}
                onChange={hdlChange}
              />
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="status"
            value={addTainer.status}
            onChange={hdlChange}
          >
            <option value="">Select Status</option>
            <option value="free">Free</option>
            <option value="unavailable">unavailable</option>
          </select>
          
          <button
        type="submit"
        className="btn btn-primary bg-pink-400 hover:bg-pink-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4">
        AddTainer
      </button>
        </form>
      </div>
    </div>
  )
}

export default addTainer

