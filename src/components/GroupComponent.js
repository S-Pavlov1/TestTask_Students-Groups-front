import React from "react";
import GroupService from "../services/GroupService";
import { Link} from "react-router-dom";
import StudentsComponent from "./StudentsComponent";

class GroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeGroupName = this.onChangeGroupName.bind(this)
        this.state = {
            groups:[],
            groupName : null,
            groupId : 1337
        }
    }

    componentDidMount() {
        GroupService.getGroups().then((response) => {
            this.setState({ groups: response.data})
            console.log(response.data);
        });
    }

    onChangeGroupName(name) {
        this.setState({
            groupName: name.target.value
        })
    }

    createGroup(groupName) {
        const data = {
            number: groupName,
            studentsCount: 0
        };
        console.log(this.state.groupId);
            GroupService.createGroup(data).then((response) => {
                this.setState({groupId: response.data.id}, () => {
                    window.location.replace('/students/' + this.state.groupId);
                })
                console.log(response.data);
            });
        console.log(this.state.groupId);
    }

    render() {
        return (
            <div className="my-div">
                <h1> Группы университета ScaleApps </h1>
                <table width="500px">
                    <thead>
                    <tr>
                        <td width="100px">Номер</td>
                        <td width="300px">Количество студентов</td>
                        <td width="100px">Действия</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.groups.map(
                            group =>
                                <tr key = {group.id}>
                                    <td>{group.number}</td>
                                    <td>{group.studentsCount}</td>
                                    <td>
                                        <button>
                                            <Link to={'/students/' + group.id}>
                                                edit
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <input
                    type="text"
                    className="my-textArea"
                    placeholder="Номер группы"
                    id="groupName"
                    onChange={this.onChangeGroupName}
                    name="groupName"
                />
                    <button
                    className="my-button"
                    type="submit"
                    onClick={() => this.createGroup(this.state.groupName)}>
                        {/*<Link to={'/students/' + this.state.groupId}>*/}
                            Добавить новую группу
                        {/*</Link>*/}
                    </button>
            </div>
        )
    }
}

export default GroupComponent