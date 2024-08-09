import { data } from "./newsAPI.js";

const containerElement = document.querySelector("main");
const showMoreBtn = document.getElementById("show-more-btn");
const allButtonElement = document.getElementById("all-btn");
const entertainmentButtonElement = document.getElementById("entertainment-btn");
const businessButtonElement = document.getElementById("business-btn");
const politicsButtonElement = document.getElementById("politics-btn");
const sportsButtonElement = document.getElementById("sport-btn");
const techButtonElement = document.getElementById("tech-btn");
const searchInputElement = document.getElementById('search-input');

const maxInitialCards = 7;
let displayedCards = 0;
let remainingNews = [];
let debounceTimeout = null;
let currentSearchTerm = "";

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, "<span class='highlight'>$1</span>");
};

const createCard = (news, searchTerm = "") => {
  const card = document.createElement("div");
  card.classList.add("card");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  const titleElement = document.createElement("h1");

  titleElement.innerHTML = highlightText(news.title, searchTerm);
  titleDiv.appendChild(titleElement);

  const dateElement = document.createElement("div");
  dateElement.classList.add("date");
  dateElement.innerText = news.dateAndTime;

  const catElement = document.createElement("div");
  catElement.innerText = news.category;

  const contentElement = document.createElement("p");
  contentElement.classList.add("content");

  contentElement.innerHTML = highlightText(news.content, searchTerm);

  card.appendChild(titleDiv);
  card.appendChild(dateElement);
  card.appendChild(catElement);
  card.appendChild(contentElement);

  containerElement.appendChild(card);
};

let showCategory = 'all';

const displayInitialCards = (categories) => {
  containerElement.innerHTML = "";
  displayedCards = 0;
  remainingNews = [];

  const uniqueNews = new Set();

  data.forEach((news) => {
    if ((categories.includes('all') || categories.includes(news.category)) && !uniqueNews.has(news.title)) {
      if (displayedCards < maxInitialCards) {
        createCard(news);  
        displayedCards++;
      } else {
        remainingNews.push(news); 
      }
      uniqueNews.add(news.title);
    }
  });

  showMoreBtn.style.display = remainingNews.length > 0 ? "grid" : "none";
};

const displayAllCards = () => {
  remainingNews.forEach((news) => createCard(news));
  showMoreBtn.style.display = "none"; 
};

const toggleActiveClass = (buttonElement) => {
  if (buttonElement.id === "all-btn") {
    document.querySelectorAll(".btn").forEach((button) => button.classList.remove("active"));
    buttonElement.classList.add("active");
    displayInitialCards(["all"]);
  } else {
    buttonElement.classList.toggle("active");

    const allButton = document.getElementById("all-btn");
    if (buttonElement.classList.contains("active")) {
      allButton.classList.remove("active");
    }

    const activeButtons = document.querySelectorAll(".btn.active");
    if (activeButtons.length === 0) {
      allButton.classList.add("active");
      displayInitialCards(["all"]);
    } else {
      const selectedCategories = Array.from(activeButtons).map(button => button.id.replace('-btn', ''));
      displayInitialCards(selectedCategories);
    }
  }
};

allButtonElement.classList.add("active");

allButtonElement.addEventListener("click", () => toggleActiveClass(allButtonElement));
businessButtonElement.addEventListener("click", () => toggleActiveClass(businessButtonElement));
entertainmentButtonElement.addEventListener("click", () => toggleActiveClass(entertainmentButtonElement));
politicsButtonElement.addEventListener("click", () => toggleActiveClass(politicsButtonElement));
sportsButtonElement.addEventListener("click", () => toggleActiveClass(sportsButtonElement));
techButtonElement.addEventListener("click", () => toggleActiveClass(techButtonElement));

displayInitialCards(["all"]);

showMoreBtn.addEventListener("click", displayAllCards);

const displayFilteredNews = (searchTerm) => {
  containerElement.innerHTML = "";
  displayedCards = 0;

  const uniqueNews = new Set(); 

  data.forEach((news) => {
    if ((news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         news.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !uniqueNews.has(news.title)) {

      createCard(news, searchTerm); 
      displayedCards++;
      uniqueNews.add(news.title);
    }
  });

  showMoreBtn.style.display = displayedCards > maxInitialCards ? "grid" : "none";
};

const debouncedSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    currentSearchTerm = searchInputElement.value.trim();

    if (currentSearchTerm) {
      displayFilteredNews(currentSearchTerm);
    } else {
      const activeButtons = document.querySelectorAll(".btn.active");
      if (activeButtons.length === 0 || allButtonElement.classList.contains("active")) {
        displayInitialCards(["all"]);
      } else {
        const selectedCategories = Array.from(activeButtons).map(button => button.id.replace('-btn', ''));
        displayInitialCards(selectedCategories);
      }
    }
  }, 300);
};

searchInputElement.addEventListener('input', debouncedSearch);











// import { data } from "./newsAPI.js";
// const containerElement = document.querySelector("main");
// const showMoreBtn = document.getElementById("show-more-btn");
// const allButtonElement = document.getElementById("all-btn");
// const entertainmentButtonElement = document.getElementById("entertainment-btn");
// const businessButtonElement = document.getElementById("business-btn");
// const politicsButtonElement = document.getElementById("politics-btn");
// const sportsButtonElement = document.getElementById("sports-btn");
// const techButtonElement = document.getElementById("tech-btn");
// const searchInputElement = document.getElementById('search-input');
// const searchIconElement = document.getElementById('search-icon');


// searchIconElement.addEventListener('click', () => {
//   const searchInput = searchInputElement.value;
//   alert("searched for", searchInput);
// });

// const maxInitialCards = 7;
// let displayedCards = 0;

// const createCard = (news) => {
//   const card = document.createElement("div");
//   card.classList.add("card");

//   const titleDiv = document.createElement("div");
//   titleDiv.classList.add("title");
//   const titleElement = document.createElement("h1");
//   titleElement.innerText = news.title;
//   titleDiv.appendChild(titleElement);

//   const dateElement = document.createElement("div");
//   dateElement.classList.add("date");
//   dateElement.innerText = news.dateAndTime;

//   const catElement = document.createElement("div");
//   catElement.innerText = news.category;

//   const contentElement = document.createElement("p");
//   contentElement.classList.add("content");
//   contentElement.innerText = news.content;

//   card.appendChild(titleDiv);
//   card.appendChild(dateElement);
//   card.appendChild(catElement);
//   card.appendChild(contentElement);

//   containerElement.appendChild(card);
// };

// let showCategory = 'all';

// const displayInitialCards = (category) => {
//   containerElement.innerHTML = "";
//   displayedCards = 0;
//   showCategory = category;
//   console.log("showcatgory", { showCategory });
//   data.forEach((news) => {
//     if (category === "all" && displayedCards < maxInitialCards) {
//       createCard(news);
//       displayedCards++;
//     } else if (news.category === category && displayedCards < maxInitialCards) {
//       createCard(news);
//       displayedCards++;
//     }
//     showMoreBtn.style.display = "grid";
//   });
// };

// const displayAllCards = (category) => {
//   data.slice(displayedCards).forEach((news) => {
//     if (category === news.category) createCard(news);
//     else if( category === 'all') createCard(news);
//   });
//   showCategory = 'all';
//   showMoreBtn.style.display = "none";
// };

// displayInitialCards("all");

// showMoreBtn.addEventListener("click", () => displayAllCards(showCategory));
// allButtonElement.addEventListener("click", () => displayInitialCards("all"));
// businessButtonElement.addEventListener("click", () => displayInitialCards("business"));
// entertainmentButtonElement.addEventListener("click", () => displayInitialCards("entertainment"));
// politicsButtonElement.addEventListener("click", () => displayInitialCards("politics"));
// sportsButtonElement.addEventListener("click", () => displayInitialCards("sport"));
// techButtonElement.addEventListener("click", () => displayInitialCards("tech"));
