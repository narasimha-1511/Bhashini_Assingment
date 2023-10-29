//Get data of source languages
  const keyValues = {
    "en": "English",
    "as": "Assamese",
    "bn": "Bengali",
    "brx": "Bodo",
    "doi": "Dogri",
    "gom": "Goan Konkani",
    "gu": "Gujarati",
    "hi": "Hindi",
    "kn": "Kannada",
    "ks": "Kashmiri",
    "mai": "Maithili",
    "ml": "Malayalam",
    "mni": "Manipuri",
    "mr": "Marathi",
    "ne": "Nepali",
    "or": "Oriya",
    "pa": "Punjabi",
    "sa": "Sanskrit",
    "sat": "Santali",
    "sd": "Sindhi",
    "ta": "Tamil",
    "te": "Telugu",
    "ur": "Urdu"
  }

const TranslateData = new Promise((resolve,reject)=>{
    fetch('https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline',{
        headers:{
      "userID":"9f55ae82e8204e4c86625573098e7707",
      "ulcaApiKey":"52d075f861-561b-42fe-8b00-8a034acb4deb"
        },
        method:"POST",
        body:JSON.stringify({
         "pipelineTasks" : [
             {
                 "taskType": "translation"
             }
         ],
         "pipelineRequestConfig" : {
             "pipelineId" : "64392f96daac500b55c543cd"
         }
        })    
     }).then(reponse=>reponse.json())
     .then((data)=>{
         resolve(data.languages);
     })
});

TranslateData.then((dataa)=>{
    //iterate over the data and create options
    
    // console.log(dataa);
    stopLoading();

    for(let key in dataa){
        let option = document.createElement('option');
        option.value = dataa[key].sourceLanguage;
        option.innerText = keyValues[option.value];
        document.getElementById('source-language').appendChild(option);
    }

    return dataa;
}).then((data)=>{
    //add event listener to the source language and fill the target language
    document.getElementById('source-language').addEventListener('change',(e)=>{
        //Get the Source Data From the data
        let sourceData = data.filter((item)=>item.sourceLanguage === e.target.value);
        sourceData[0].targetLanguageList.map((e)=>{
            let option = document.createElement('option');
            option.value = e;
            option.innerText = keyValues[e];
            document.getElementById('target-language').appendChild(option);
        })
    })

    //set default value of source language to english
    document.getElementById('source-language').value = "en";

    //setting default english target list
    let sourceData = data.filter((item)=>item.sourceLanguage === "en");
        sourceData[0].targetLanguageList.map((e)=>{
            let option = document.createElement('option');
            option.value = e;
            option.innerText = keyValues[e];
            document.getElementById('target-language').appendChild(option);
        })
})

//add event listener to the translate button
document.getElementById('translate').addEventListener('click',()=>{

    startLoading();
   const source =  document.getElementById('source-language').value || "en";
   const target = document.getElementById('target-language').value || "te";
   const content = document.getElementById('source-text').value || "Hello World";
   
   console.log("Clicked!!")
   
    const res =  fetch('scaler/translate',{
        method:"POST",
        headers:{
         "Content-Type": "application/json",
         "Accept": "application/json"
        },
     body:JSON.stringify({
         "source_language": source,
         "content": content,
         "target_language": target
       }),
    });

    res.then((data)=>{
        return data.json();
    }).then((data)=>{
        console.log(data);
        document.getElementById('target-text').value = data.translated_content;
        stopLoading();
    })
})

function stopLoading(){
const spinner = document.querySelector('.loading-spinner');
  spinner.style.display = 'none';
}
function startLoading(){
  const spinner = document.querySelector('.loading-spinner');
  spinner.style.display = 'block';
}
