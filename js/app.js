const customColor = document.getElementById('custom-color')
customColor.style.color = '#0000FD';

const loadNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();;
    displayNews(data.data.news_category);
}
const displayNews = (categories) => {
  const displayCategory = document.getElementById('category');

  categories.forEach(category => {
      const categoryDiv = document.createElement('li');
      categoryDiv.classList.add('nav-item', 'd-block');
      categoryDiv.innerHTML = `
      <a class="nav-link disabled" href="#">${category.category_name}</a>`;
      displayCategory.appendChild(categoryDiv);
  });
}


const loadNewsBlog = () =>{
  fetch('https://openapi.programming-hero.com/api/news/category/01')
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
      <div class="col-8">
            <div class="d-flex text-black">
              <div class="flex-shrink-0">
              <img src="${news.author.img}" class="rounded-circle" style="width: 60px;" alt="Avatar"/>
              </div>
              <div class="flex-grow-1 ms-3">
                <h5 class="mb-1">${news.author.name}</h5>
                <p class="mb-2 pb-1" style="color: #2b2a2a;">${news.author.published_date}
                </p>
              </div>
              <div class="flex-grow-1 ms-5">
              <h5 class="mb-1">${news.author.name}</h5>
              <p class="mb-2 pb-1" style="color: #2b2a2a;">${news.author.published_date}
              </p>
            </div>
              </div>
            </div>
      </div>`;
       newsContainer.appendChild(newsDiv);
  })
}

loadNews();
loadNewsBlog();