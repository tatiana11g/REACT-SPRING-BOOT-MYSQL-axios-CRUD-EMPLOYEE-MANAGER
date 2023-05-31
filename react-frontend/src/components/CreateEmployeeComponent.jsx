import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
         /*  Crear atributos y propiedades para este estado almacenan los datos de netrado*/    
        /*  paso 2 */
         id: this.props.match.params.id,  /* declarar la identificacion obteniendola de los  props*/
         firstName: '',
         lastName: '',
         emailId: ''

    }
    
    /* vincular el controlador en el constructor  */
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);

    }

      // paso 3 obtener  datos  segun id
      componentDidMount(){

        // paso 4 verificar si agregar o actualizar si es -1 agregar no hacemos nada
        if(this.state.id === '_add'){  //si es -1 agrega
            return
        }else{
          /*   sino llena el formulario con el id*/
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }        
    }


   
       
   
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));

        // paso  5 si el id  es -1  agrega
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            // sino actualiza
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    

     /*  controlador de  eventos */
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
     /*   titulo */
    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                  {
                                     this.getTitle()
                                  } 

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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent
