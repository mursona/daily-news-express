const customColor = document.getElementById('custom-color')
customColor.style.color = '#0000FD';

// load category news 
const loadNews = () =>{
  let url = `https://openapi.programming-hero.com/api/news/categories`
      fetch(url)
      .then(res => res.json())
      .then(data => navbarItems(data.data.news_category))
      // Error handeling
      .catch(error => console.log(error))
}

const dafaultCategoriesShow = () =>{
  let url = `https://openapi.programming-hero.com/api/news/category/01`
      fetch(url)
      .then(res => res.json())
      .then(data => CetegoriesDetails(data.data))
      // Error handeling
      .catch(error => console.log(error))
}
//Default Categories
dafaultCategoriesShow()

// Dynamic navbar 
const navbarItems = (navitems) =>{
  const ul = document.getElementById('categories-nav')
  navitems.forEach(item =>{
      let navCategory = document.createElement('li')
      navCategory.classList.add('nav-item')
      navCategory.innerHTML = `
          <a onclick="displayDetails('${item.category_id}')"  class="nav-link active text-secondary" aria-current="page" href="#">${item.category_name}</a>
          `
          ul.appendChild(navCategory) 
  })
  
}

// all cetegories  show
const displayDetails = (Id) =>{
  let url = `https://openapi.programming-hero.com/api/news/category/${Id}`
      fetch(url)
      .then(res => res.json())
      .then(data => CetegoriesDetails(data.data))
      // Error handeling
      .catch(error => console.log(error))
}
// categories details 
const CetegoriesDetails = (newsPosts) =>{
  spinners(true)
  let totalNewsItem = newsPosts.length
  let categoryShowing = document.getElementById('category-showing')
      categoryShowing.innerHTML = ' '
      let h6 = document.createElement('h6')
      h6.innerText = ` ${totalNewsItem} items found for This Categorys`
      categoryShowing.appendChild(h6)
  let categoriesDiv = document.getElementById('categoryShow')
      categoriesDiv.innerHTML = ' '
      // sorting the arry by total number
  let newsSorting =  newsPosts.sort(function(a,b){
          return b.total_view - a.total_view
  })
  newsSorting.forEach(news =>{
      let div = document.createElement('div')
          div.classList.add('row', 'bg-color', 'my-5', 'px-5')
          div.innerHTML = `
          <div class="col-md-3">
          <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
         </div>
         <div class="col-md-9 mt-3 mb-3 bg-white">
         <div class="card-body">
           <h5 class="card-title">${news.title}</h5>
           <p class="card-text">${news.details.slice(0,500)}<span>
           <a  onclick="categoryDetailsInfo('${news._id}')"  class="btn border-none" data-bs-toggle="modal" data-bs-target="#exampleModal">See More...</a>
           </span></p>


           <div class="row d-flex justify-content-start align-items-center h-100">
          <div class="col-12">
          <div class="d-flex text-black">
            <div class="flex-shrink-0">
            <img src="${news.author.img}" class="rounded-circle text-secondary" style="width: 60px;" alt="Avatar"/>
            </div>
            <div class="flex-grow-1 ms-2">
              <h6 class="mb-1">${news.author.name ? news.author.name : "No data Available"}</h6>
              <p class="mb-2 pb-1 text-secondary">${news.author.published_date ? news.author.published_date : "No Data Available"}
              </p>
            </div>
            <div class="flex-grow-1 ms-2 mt-2">
            <p class="mb-2 pb-1 text-secondary"><i class="fa-regular fa-eye"></i>${news.total_view ? news.total_view : "No Data Available"}
            </p>
            </div>
            <div class="flex-grow-1 ms-2 mt-2">
            <p class="mb-2 pb-1 text-secondary"><i class="fa-solid fa-star-half-stroke"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></p>
            </div>
            <span><i class="fa-sharp fa-solid fa-arrow-right"></i></span>
            </div>
            </div>
          </div>
    </div>`;
      categoriesDiv.appendChild(div)
  })
  
  spinners(false)
}
// details info 
const categoryDetailsInfo = (NewsId) =>{
  let url = `https://openapi.programming-hero.com/api/news/${NewsId}`
      fetch(url)
      .then(res => res.json())
      .then(data => categoryDetailsInfoInModal(data.data[0]))
      .catch(error => console.log(error))
}

const categoryDetailsInfoInModal = (categoryInfo) =>{
let modalBody = document.getElementById('modal_info')
  modalBody.innerHTML = `
  <img src="${categoryInfo.thumbnail_url}" alt="">
  <h4>${categoryInfo.title}</h4>
  <p>${categoryInfo.details}</p>
  <p>Author : ${categoryInfo.author.name ? categoryInfo.author.name : "No data Available"}</p>
  <p>Publish Date : ${categoryInfo.author.published_date ? categoryInfo.author.published_date : "No Data Available"}</p>
  `
}
// spinner spinners 
const spinners = (isspinners) =>{
      let spinnner = document.getElementById('spinner')
      if(isspinners){
          spinnner.classList.remove('d-none')
      }else{
          spinnner.classList.add('d-none')
      }
  }

loadNews()