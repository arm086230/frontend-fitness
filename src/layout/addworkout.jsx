import React, { useState } from 'react'
import axios from 'axios'

function addworkout() {
    const [addWorkout, setAddWorkout] = useState({
        userId: '',
        img: '',
        advice: '',
        workoutType: '',
        WorkoutDate: new Date()
    })

    const hdlChange = e => {
        setAddWorkout(prv => ({...prv, [e.target.name]: e.target.value }))
        // console.log(addWorkout);
    }


    const hdlSubmit = async (e) =>{
        try {
            e.preventDefault();
            const token = localStorage.getItem('token')
            const rs = await axios.post('http://localhost:8889/auth/workout/', addWorkout, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // alert(rs.data.token)
            if (rs.status === 200) {
                alert('workout added successfully')
            }
            // console.log(rs.data)
        }catch (e) {
            console.log(e)
        }

    }

  return (
    <div className='p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 bg-gradient-to-b from-gray-200 flex justify-center items-center'>
    <div className='w-full max-w-xs'>
      <div className='text-3xl mb-5 text-black'>Addworkout</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className='form-control'>
            <span className='label-text text-black'>workoutType</span>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              name='workoutType'
              value={addWorkout.workoutType}
              onChange={hdlChange}
            />
        </label>
        <label className='form-control'>
            <span className='label-text text-black'>advice</span>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              name='advice'
              value={addWorkout.advice}
              onChange={hdlChange}
            />
        </label>
        <label className='form-control'>
            <span className='label-text text-black'>Date</span>
            <input
              type='date'
              className='input input-bordered w-full max-w-xs'
              name='WorkoutDate'
              value={addWorkout.WorkoutDate}
              onChange={hdlChange}
            />
        </label>
        <label className='form-control'>
            <span className='label-text text-black'>Image</span>
            <input
              type='text'
              className='input input-bordered w-full max-w-xs'
              name='img'
              value={addWorkout.img}
              onChange={hdlChange}
            />
        </label>
        <button
        type="submit"
        className="btn btn-primary bg-pink-400 hover:bg-pink-200 text-white px-3 py-2 md:px-4 md:py-3 rounded-md shadow-md transition-colors duration-300 text-lg md:text-xl mt-4">
        Addworkout
      </button>
      </form>
    </div>
    </div>
  )
}

export default addworkout
