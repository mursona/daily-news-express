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
loadNews();

