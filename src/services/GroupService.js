import http from "../http-common";

class GroupService {

    getGroups () {
        return http.get("/University-groups");
    }

    createGroup (data) {
        return http.post("/University-groups", data);
    }
}

export default new GroupService();