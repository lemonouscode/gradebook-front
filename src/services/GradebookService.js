import HttpService from "./HttpService";


class GradebookService extends HttpService {
    
    async getGradebooks(pageNumber) {
      // pageNumber = 3;
      if(typeof pageNumber !== "undefined")
      {
        pageNumber = "?page=" + pageNumber
      }
      else{
        pageNumber ="";
      }
      // console.log(pageNumber)
      
      // const {data} = await this.client.get("/gradebooks" + pageNumber);
      const {data} = await this.client.get(`/gradebooks${pageNumber}`);
      return data;
    }

    async addGradebook(gradebookData) {
      const { data } = await this.client.post("/gradebooks", gradebookData);
      return data;
    }


    async getGradebooksAndTeacher() {
      const teacherId = localStorage.getItem("userId");
      const {data} = await this.client.get("/mygradebook/" + teacherId );
      // console.log(data)
      return data;
    }

    async getSingleGradebook(gradebookId) {
      const {data} = await this.client.get("/singlegradebook/"+gradebookId);
      // console.log(data)
      return data;
    }


    async delete(id) {
      const { data } = await this.client.delete(`gradebook/${id}`);
      return data;
    }


  }


  
  const gradebookService = new GradebookService();
  export default gradebookService;