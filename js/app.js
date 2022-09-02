const customColor = document.getElementById('custom-color')
customColor.style.color = '#0000FD';


const loadPhone = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    // displayPhone(data.data, dataLimit);
}
loadPhone()