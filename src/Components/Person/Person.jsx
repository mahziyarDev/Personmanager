import React from 'react'
import "./Person.css"

const Person = ({fullname,personDelete,Cahnge}) => {
    return ( 
        <div className='card text-white bg-info p-4 mb-3 mt-3 w-25 mx-auto'>
            <div className='text-center'>
                <p className='d-block'>{`${fullname}`}</p>

                <div className='input-group justify-content-center'>
                    <input
                    type="text"
                    onChange={Cahnge}
                    placeholder={fullname} 
                    className='form-control w-50'
                    />
                    <div className='input-group-prepend'>
                        <button onClick={personDelete} className='btn btn-sm btn-danger fa fa-trash'/>
                    </div>
                </div>
                
            </div>
            
        </div>
     );
}
 
export default Person;