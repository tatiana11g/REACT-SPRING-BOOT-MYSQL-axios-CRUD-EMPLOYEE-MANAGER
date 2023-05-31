import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            /*  Crear atributos y propiedades para este estado almacenan los datos de mapeado*/ 
         id: this.props.match.params.id,  /* declarar la identificacion obteniendola de los  props*/
         firstName: '',
         lastName: '',
         emailId: ''
      }
    
    /* vincular el controlador en el constructor  */
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    }

                                                                                                                                                                                                                                                           
    componentDidMount(){                                                                              
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{                                                                                                                                                                                   
            let employee = res.data;
           /*  pasamos los valores  a cada caja de texto del form */
            this.setState({firstName: employee.firstName,
                lastName: employee.lastName,
                emailId : employee.emailId
            });
        });
    }



    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
   
    

 /*    controlador de  eventos */
    changeFirstNameHandler= (event) => {
    /* event.target.value obtenemos o extraemos este valors */
   /*  y usamos el metodo  this.setState para agregar oasignar */
     this.setState({firstName:event.target.value})
    }

    changeLastNameHandler= (event) => {
     this.setState({lastName:event.target.value})
        }


     changeEmailHandler= (event) => {
         this.setState({emailId:event.target.value})
      }

       /* redirijiendo */
      cancel(){
        this.props.history.push('/employees');
    }




    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                               <h3 className = "row">Add Employee</h3>
                               <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> First Name: </label>
                                               {/* estado en un componente 
                                               tomar el valor vacio del atributo this.state.firstName 
                                               Se llama el evento controlador */} 
                                       
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        {/* Campo lastName */}
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                          {/* Campo emailId */}
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>


                       
                               </div>
                             </div>
                        </div>
                  </div>

            </div>
        )
    }
}

export default UpdateEmployeeComponent
