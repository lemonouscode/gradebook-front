import HttpService from "./HttpService";


class TeacherService extends HttpService {
    
    async getGradebooks(pageNumber) {
      
      if(typeof pageNumber !== "undefined")
      {
        pageNumber = "?page=" + pageNumber
      }
      else{
        pageNumber ="";
      }
      // console.log(pageNumber)
      
      // const {data} = await this.client.get("/gradebooks" + pageNumber);
      const {data} = await this.client.get(`/teachers${pageNumber}`);
      return data;
    }


    async getSingleTeacher(numberId) {
      
      // console.log(pageNumber)
      const {data} = await this.client.get("/teachers/" + numberId);
      return data;
    }

    async getTeachersWithoutGradebook() {
      
      const {data} = await this.client.get("/gradebooksnoteacher/");
      return data;
    }

  }
  
  const teacherService = new TeacherService();
  export default teacherService;