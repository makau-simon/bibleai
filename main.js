const area = document.querySelector("#area")

const verse = document.querySelector("#verse")

const loadingScreen = document.querySelector("#loading-screen")

const results = document.querySelector("#results")

const getContextBtn = document.querySelector("#getContext")

const OPENROUTER_API_KEY = "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";

const url = "https://openrouter.ai/api/v1/chat/completions";



const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENROUTER_API_KEY}`
};




function fetchResponse() {
  loadingScreen.style.display = "flex"
  let question = `Provide a clear, concise, and detailed summary of the context of the Bible verse ${verse.value}. Your response should include the following elements: what the verse actually says from RSV bible and make sure you provide the entire verse how is it from the bible the background of the book (author, date, purpose, and setting), the historical and cultural context at the time of writing, the key theological themes relevant to the verse, the original intended audience and why the verse mattered to them, and a summary of how scholars typically interpret the verse within its broader passage. If relevant, you may also include how the verse is applied in modern Christian life in point form. Please format your response using markdown with clear section headings for each element and make sure is valid markdown compatible with marked.js js library.And if i provide a wrong verse you tell me the verse is wrong`
  
  const body = {
    model: "nousresearch/deephermes-3-mistral-24b-preview:free",
    messages: [
    {
      role: "user",
      content: question
    }]
  };
  
  //show loading screen 
  fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        //show error message
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //hide loading screen
      results.style.display = "block"
      loadingScreen.style.display = "none"
      const content = data.choices[0].message.content;
      area.innerHTML = marked.parse(content)
    })
    .catch(error => {
      //show error message
      loadingScreen.style.display = "none"
      alert("An error occured please try again.")
    })
}

getContextBtn.addEventListener("click", () => {
  area.value = ""
  if (verse.value !== "") {
    fetchResponse()
  }else{
    alert("Enter a bible verse!")
  }
})

/*fetch("file.md").then(response=>{return response.text()}).then(data=>{
  area.innerHTML = marked.parse(data)
})*/

document.getElementById('exportPdf').addEventListener('click', function() {
  let fileName =
    prompt("Please enter a file name\n(without the .pdf part):").trim()
  if(fileName){

  var options = {
    filename:fileName,
    margin: 10,
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }
  html2pdf().from(data).set(options).save()
  }
})