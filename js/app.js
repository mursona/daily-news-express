const customColor = document.getElementById('custom-color')
customColor.style.color = '#0000FD';

const loadNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data.news_category);
}
const displayNews = (categories) => {
  const displayCategory = document.getElementById('category');

  categories.forEach(category => {
      const categoryDiv = document.createElement('li');
      categoryDiv.classList.add('nav-item', 'd-block');
      categoryDiv.innerHTML = `
      <a class="nav-link text-secondary" href="#">${category.category_name}</a>`;
      displayCategory.appendChild(categoryDiv);
  });
}


const newsCount = async() => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  NewsCount(data.data.news_category);
}
const NewsCount = (categoriesCount) => {
  const displayCategoryCount = document.getElementById('categoryCount');
  categoriesCount.forEach(categorycount => {
      const countLength = document.createElement('div');
      let count = categorycount.category_id;
      let intcount = parseInt(count);
      countLength.innerText = intcount;
      displayCategoryCount.appendChild(countLength);
  });
}

const loadNewsBlog = () =>{
  fetch(`https://openapi.programming-hero.com/api/news/category/01`)
  .then(res => res.json())
  .then(data => displayDailyNews(data.data))
}

const displayDailyNews = news =>{
 
  const newsContainer = document.getElementById('news-image');
  news.forEach(news => {
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('row', 'bg-color', 'm-5');
      newsDiv.innerHTML = `
          <div class="col-md-4">
             <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
          <div class="card-body">
             <h5 class="card-title">${news.title}</h5>
             <p class="card-text">${news.details}</p>

    <div class="row d-flex justify-content-start align-items-center h-100">
      <div class="col-12">
            <div class="d-flex text-black">
              <div class="flex-shrink-0">
              <img src="${news.author.img}" class="rounded-circle text-secondary" style="width: 60px;" alt="Avatar"/>
              </div>
              <div class="flex-grow-1 ms-2">
                <h6 class="mb-1">${news.author.name}</h6>
                <p class="mb-2 pb-1 text-secondary">${news.author.published_date}
                </p>
              </div>
              <div class="flex-grow-1 ms-2 mt-2">
              <p class="mb-2 pb-1 text-secondary"><i class="fa-regular fa-eye"></i> ${news.total_view}
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
       newsContainer.appendChild(newsDiv);
  })
}
newsCount();
loadNews();
loadNewsBlog();