import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import UpdateEmployeeComponent from './UpdateEmployeeComponent'
import CreateEmployeeComponent from './CreateEmployeeComponent'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        //vincular  esta son rutas
        this.addEmployee = this.addEmployee.bind(this); //ruta
        this.editEmployee = this.editEmployee.bind(this); // ruta
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    
   

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            //de la matriz employees va a filtrar el empleado de ese id
            //una vez eliminado de la bd eliminamos este empleado de la lista  (actualizamos)
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    // ruta
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    //ruta
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }


   //llamar al servicio del get
  componentDidMount(){
    EmployeeService.getEmployees().then((res) => {
        this.setState({ employees: res.data});
    });
}


   
    addEmployee(){
        //llamada  a la ruta crear empleado que configuramos del componente en el app
        this.props.history.push('/add-employee/_add');
    }
     


    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                     </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     //codigo javascript para mostrar los datos dinamicamente
                                    this.state.employees.map(
                                        employee => 
                                         //campos como estan en el backend
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                             <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                 
                                       </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
