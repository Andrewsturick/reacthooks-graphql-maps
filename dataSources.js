const { RESTDataSource } = require('apollo-datasource-rest');
const cloudinary = require("cloudinary");

class CloudinaryAPI extends RESTDataSource {
    static create() {
        return new CloudinaryAPI();
    }
    
    uploadImage(file) {
    }
        
    constructor() {
        super();
        console.log("api key", process.env.API_KEY)
        require("dotenv").config()
    cloudinary.v2.config({ 
        cloud_name: process.env.CLOUDINARY_URL, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        });

        this.baseUrl = "https://api.cloudinary.com/v1_1/andrewmaps/image/upload"

    }
}

module.exports = {CloudinaryAPI}