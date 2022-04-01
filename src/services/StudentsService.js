import http from "../http-common";

class StudentsService {

    getStudents() {
        return http.get("/Students");
    }

    createStudent(data) {
        return http.post("/Students", data);
    }

    getStudentsByGroup (id) {
        return http.get("/Students/byGroup?groupId=" + id)
    }

    deleteStudent (id) {
        http.delete("/Students/" + id)
    }
}

export default new StudentsService();