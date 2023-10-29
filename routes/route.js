const express = require('express');

const router = express.Router();

const getData = require('../apicall/Translate_Text');

router.post('/',(req,res)=>{
    const data = req.body;
    console.log(data);

    const src = data.source_language;
    const content = data.content;
    const target = data.target_language;
    const serviceId = "ai4bharat/indictrans-v2-all-gpu--t4";

    getData(src, content, target, serviceId)
  .then((data) => {
    res.status(200).json({
      "status_code": 200,
      "message": "success",
      "translated_content": data.pipelineResponse[0].output[0].target
    });
  })
  .catch((error) => {
    let error_message = error && error.detail ? error.detail.message : "Unknown error";
    //Checking If Lanuguage is Correct
    if(req.body.source_language)
    {if((req.body.source_language).length!=2 || (req.body.target_language).length != 2){
        error_message="Invalid Language Codes"
    }}
    const error_response = {
      "status_code": 500,
      "message": error_message,
      "translated_content": null
    };
    res.status(500).json(error_response);
  });
})

module.exports = router;