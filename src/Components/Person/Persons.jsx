import React from 'react'
import Person from './Person';


const Persons = ({persons,personDelete,personCahnge}) => {
    return ( 

        <div>
            {persons.map(person=>(
                <Person
                key={person.id}
                fullname={person.fullname}
                personDelete={()=>personDelete(person.id)}
                Cahnge={event=>personCahnge(event,person.id)}
                />
            ))}
        </div>
     );
}
 
export default Persons;