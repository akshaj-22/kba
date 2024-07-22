const { Schema ,model} =require('mongoose');
const demo = new Schema({
   BlogId:
      { type: String,
      required: true
      },

   title:
      { type: String,
    required: true 
      },

   author:
      { type: String,
      required: true 
      },

   content: 
      { type: String, 
      required: true 
      }

   // Add other fields as needed
}  );


const BlogDetails = model('blogdetails', demo);
module.exports= BlogDetails;