import React,{Component} from 'react';
import Persons from './Components/Person/Persons';
import {Alert,Button} from "react-bootstrap"
import {ToastContainer,toast} from "react-toastify"

class App extends Component {
    
    state = { 
        person:[],
        fullname:"",
        showePersons:true
    }

     //button for show and hide person
    handleShowPerson =()=>{
        this.setState({
            showePersons : !this.state.showePersons,
        })
    }

    //for delete Person
    handleDeletePerson =id=>{
        const persons = [...this.state.person];
        const filteredPersons = persons.filter(p=>p.id !== id);
        this.setState({person:filteredPersons})

        const personIndex = persons.findIndex(p => p.id === id);
        const person = persons[personIndex];
        toast.error(`${person.fullname} باموفقیت حذف شد `,{
            position : "top-right",
            closeButton : true,
            closeOnClick : true,
        })
    }

    // for edit person
    handleNameChange = (event,id) =>{
        //دیستراکچرینگ با نام دیگر
        const { person: allPersons } = this.state;

        //گرفتن کاربر با ایدی ان از ارایه
        const personIndex = allPersons.findIndex(p => p.id === id);

        //ریختن کاربر داخل یک متغیر دیگر
        const person = allPersons[personIndex];

        //تغییر نام کاربر توسط  پارامتر ارسالی
        person.fullname = event.target.value;
        
        //کپی گرفتن از کل کاربران 
        const persons = [...allPersons];

        //کاربر ی که توسط ایدی پیدا کردیم را مقدار تغییری را به ان می دهیم
        persons[personIndex] = person;

        //تغییر استیت با استیت جدی برای نمایش تغییرات
        this.setState({ perosn:persons });
    }

    //for add new person
    handleNewPerson=()=>{
        const persons = [...this.state.person];
        const person = {
            id:Math.floor(Math.random()*1000),
            fullname:this.state.fullname
        };

        if (person.fullname !== "" && person.fullname !== " ") {
            persons.push(person);
            this.setState({
                person : persons,
                fullname : ""
            });
            toast.success("شخص با موفقیت اضافه شد",{
                position : "bottom-right",
                closeButton : true,
                closeOnClick : true,

            })
        }
        
    }

    setFullname = event =>{
        this.setState({
            fullname : event.target.value
        })
    }

    render() { 
        // for object destratchering
        const{person,showePersons} = this.state; 


        let persons = null;
        let badgeStyle = [];
        if (showePersons) {
            persons = <Persons
            persons={person} 
            personDelete={this.handleDeletePerson}
            personCahnge={this.handleNameChange}
            />;
        }
        if(person.length <=1) badgeStyle.push("badge-danger");
        if(person.length <=2) badgeStyle.push("badge-warning");
        if(person.length >=3) badgeStyle.push("badge-success");
        return (
            <div className='rtl text-center'>

                <Alert variant='info'>
                    <h5>مدیریت کننده اشخاص  </h5>
                </Alert>
                <Alert variant='light'>
                    تعداد اشخاص : <span className={`badge badge-pill ${badgeStyle.join(' ')}`}>{person.length}</span>
                </Alert>
                
                <div className='m-2 p-2'>

                    <form className='form-inline justify-content-center' onSubmit={event=>event.preventDefault()}>
                        <div className='input-group w-25'>
                            <input
                                type="text" 
                                placeholder='اسم بهم بده' 
                                onChange={this.setFullname} 
                                value={this.state.fullname}
                                className='form-control'
                            />
                            <div className='input-group-prepend'>
                            <Button
                                onClick={this.handleNewPerson}
                                className=' fa fa-plus-square'
                                variant='success'
                                size="sm"
                                />
                            </div>
                            

                        </div>
                    </form>

                </div>
                <br/>
                <Button onClick={this.handleShowPerson} variant={this.state.showePersons ? "info" : "danger"}>نمایش اشخاص</Button>
                
                {persons}
                <ToastContainer/>
            </div>
          );
    }
}
 
export default App;