import * as React from "react";
import StudentsService from "../services/StudentsService";
import { Link, useParams} from "react-router-dom";

class StudentsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeStudentName = this.onChangeStudentName.bind(this)
        this.state = {
            students:[],
            studentName : null,
            groupId: this.props.params.id
        }
    }

    componentDidMount() {
        console.log(this.state.groupId)
        StudentsService.getStudentsByGroup(this.state.groupId).then((response) => {
            this.setState({ students: response.data})
            console.log(response.data);
        });
    }

    onChangeStudentName(name) {
        this.setState({
            studentName: name.target.value
        })
    }

    createStudent (studentName) {
        const data = {
            fullName: this.state.studentName,
            acceptanceDate: new Date(),
            group: this.state.groupId
        };
        console.log(data);
        StudentsService.createStudent(data).then((response) => {
            console.log(response.data);
        });
    }

    deleteStudent (id) {
        StudentsService.deleteStudent(id)
    }

    render() {
        return (
            <div className="App my-div">
                <h1> Стундентики ScaleApps {this.state.groupId}</h1>
                <table width="500px">
                    <thead>
                    <tr>
                        <td width="100px">Дата принятия</td>
                        <td width="300px">ФИО студента</td>
                        <td width="100px">Действия</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.students.map(
                            student =>
                                <tr key = {student.student_id}>
                                    <td>{new Date(student.acceptanceDate).toLocaleDateString()}</td>
                                    <td>{student.fullName}</td>
                                    <td><button onClick={() => this.deleteStudent(student.student_id)}> delete </button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <input
                    type="text"
                    className="my-textArea"
                    placeholder="ФИО"
                    id="studentName"
                    onChange={this.onChangeStudentName}
                    name="studentName"
                />
                <button
                    className="my-button"
                    type="submit"
                    onClick={() => this.createStudent(this.state.groupName)}
                >Добавить нового студента</button>
                <Link to="/">
                    <button className="my-button" >Вернуться к списку групп</button>
                </Link>
            </div>
        )
    }

}

export default (props) => (
    <StudentsComponent
        {...props}
        params={useParams()}
    />
);
//export default withRouter(StudentsComponent)