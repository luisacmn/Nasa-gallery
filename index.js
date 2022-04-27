const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
let galleryRow = document.querySelector("#gallery-row")

//API
const base = "https://images-api.nasa.gov/"

let inputValue;

searchInput.addEventListener("change", (event) =>{
    inputValue = event.target.value
})

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    galleryRow.innerHTML=""      
    fetch(`${base}search?q=${inputValue}`)
        .then(response => response.json())                                  //converte a resposta para json
        .then(data => {
            const arr = data.collection.items                                //Guardar o array "items" do objeto "data" dentro de uma variável para depois mapear 
            const filterArray = item => item.links != null                   //Função que retorna os items do array com a propriedade "links" diferentes de null 
            const filteredArray = arr.filter(filterArray)                      //Filtrar os itens que não têm propriedadde links = null em um novo array
            console.log(filteredArray)
            filteredArray.map(item=>{                                                 //mapear esse array filtrado: Para cada item do array, desempenhar a função abaixo
                /*console.log(item)*/
                
                let newDiv = document.createElement("div")                              //criar novo elemento
                let newAnchor = document.createElement("a")
                let newImg = document.createElement("img")
                let spanBlock = document.createElement("span")
                let spanTitle = document.createElement("span")

                newDiv.className = "col-md-6 col-lg-4 item"                             //atribuir as classes
                newAnchor.className = "lightbox"
                newImg.className = "img-fluid image scale-on-hover"
                spanBlock.className = "description"
                spanTitle.className = "description-heading"

                
                newAnchor.appendChild(newImg)
                newAnchor.appendChild(spanBlock)
                spanBlock.appendChild(spanTitle)                                           //locar elemento dentro do outro
                newDiv.appendChild(newAnchor)
                galleryRow.appendChild(newDiv)

                newAnchor.setAttribute("href", `${item.links[0]?.href}`)                //inserir os valores
                newImg.setAttribute("src", `${item.links[0]?.href}`)
                spanBlock.textContent = `${item.data[0].title}`
            })                       
        })
})
