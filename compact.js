const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-btn")
let galleryRow = document.querySelector("#compact-gallery")

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
        .then(response => response.json())                                                            //converte a resposta para json
        .then(data => {
            const arr = data.collection.items                                                         //Guardar o array "items" do objeto "data" dentro de uma variável para depois mapear 
            const filterArray = item => item.links != null && item.data[0].media_type != "video"      //Função que retorna os items do array com a propriedade "links" diferentes de null e a propriedade "media type" diferente de video                                                                   
            const filteredArray = arr.filter(filterArray)                                             //Filtrar os itens que não têm propriedadde links = null em um novo array
            console.log(filteredArray)
            filteredArray.map(item=>{                                                                 //mapear esse array filtrado: Para cada item do array, desempenhar a função abaixo
                
                let newDiv = document.createElement("div")                                            //criar novo elemento
                let newAnchor = document.createElement("a")
                let newImg = document.createElement("img")
                let spanBlock = document.createElement("span")
                let spanTitle = document.createElement("span")
                let spanDescription = document.createElement("span")

                newDiv.className = "col-md-6 col-lg-4 item zoom-on-hover"                             //atribuir as classes
                newAnchor.className = "lightbox"
                newImg.className = "img-fluid image"
                spanBlock.className = "description"
                spanTitle.className = "description-heading"
                spanDescription.className="description-body"

                galleryRow.appendChild(newDiv)                                                        //locar elemento dentro da estrutura 
                newDiv.appendChild(newAnchor)
                newAnchor.appendChild(newImg)
                newAnchor.appendChild(spanBlock)
                spanBlock.appendChild(spanTitle) 
                spanBlock.appendChild(spanDescription)                                          

                newAnchor.setAttribute("href", `${item.links[0]?.href}`)                             //inserir os valores
                newAnchor.setAttribute("target", "_blank")
                newImg.setAttribute("src", `${item.links[0]?.href}`)
                spanTitle.textContent = `${item.data[0].title}`
                spanDescription.textContent = `${item.data[0].description}`

            })                       
        })
})

