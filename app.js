let input = document.querySelector('.input');
let surahBtn = document.getElementById('surah');

surahBtn.addEventListener('click', showSurah);



function showSurah() {
    let data = input.value;
    if(data === "" || data >= 115) {
        alert("enter the number between 1-114")
    }
      axios({
        method: 'GET',
        url: 'http://api.alquran.cloud/v1/surah/'+data,
    }).then(response => printSurahToScreen(response))
    .catch(hata => console.log(hata))
    .then(() => console.log(""))
    
    
}

function printSurahToScreen(response) {
    document.querySelector('.surahSonuc').innerHTML = `
    <div class="block has-text-centered">
                    <article class="message is-info has-text-centered">
                        <div class="message-header">
                          <h1 class="subtitle has-text-white"><strong>${response.data.data.name}</strong></h1><h1 class="subtitle has-text-white"> <strong>${response.data.data.englishName}</strong></h1><h1 class="subtitle has-text-white"><strong>${response.data.data.englishNameTranslation}</strong></h1><p>${input.value}</p>
                        </div>
                      </article>
                </div>
    `;
    document.querySelector('.ayaahfield').innerHTML = `
    <div class="container">
            <article class="message is-normal">
                <div class="message-body">
                  <ol>
                
                  ${response.data.data.ayahs.map((item) => {
                    return (
                      
                      `<li>${item.text}</li>`
                    
                      
                    );
                  })}
                
                  </ol>
                 
                </div>
              </article>
        </div>
    `;
    input.value = '';
}
