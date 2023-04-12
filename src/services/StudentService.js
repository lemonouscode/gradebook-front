import HttpService from "./HttpService";


class StudentService extends HttpService {
    
    async addStudent(studentData) {
        const { data } = await this.client.post("/addnewstudent", studentData);
        return data;
    }

  }
  
  const studentService = new StudentService();
  export default studentService;
