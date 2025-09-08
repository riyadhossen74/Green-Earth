const allTrees = document.getElementById("all-Tree");
const sideBar = document.getElementById("side-bar");
const items = document.getElementById("leftCart");
const leftCart = document.getElementById("leftCart");
const show = document.getElementById("shows");
// all tree
const trees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const showTrees = data.plants;

      displayTree(showTrees);
    });

  const displayTree = (plants) => {
    plants.forEach((tree) => {
      console.log(tree);
      allTrees.innerHTML += `
        <div class="bg-white p-5">
                        <img class=" mx-auto rounded-xl" src="${tree.image}">
                        <h2 onclick="lodeModul(${tree.id})" class="font-semibold mt-2 text-xl">${tree.name}</h2>
                        <p class="text-sm my-2">${tree.description}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-[#DCFCE7] p-1 px-3 text-[#15803D] rounded-full">Fruit Tree</button>
                            <p class="font-semibold text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>500</span></p>
                            </div>
                            <button class="bg-[#15803D] text-white w-full mt-5 py-2 rounded-full">Add to Cart</button>
                    </div>
        `;
    });
  };
};

// sideBar style
const catagoryList = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;

      showCatagory(categories);
    });
};

const showCatagory = (categories) => {
  categories.forEach((cat) => {
    sideBar.innerHTML += `
        <p id="${cat.id}" class="px-2 text-xl p-2 hover:text-white mt-4 hover:bg-[#15803D] hover:rounded-sm">${cat.category_name}</p>
        `;
    sideBar.addEventListener("click", (e) => {
      const allP = document.querySelectorAll("p");
      allP.forEach((p) => {
        p.classList.remove("bg-[#15803D]");
      });
      if (e.target.localName == "p") {
        e.target.classList.add("bg-[#15803D]");
        lodeSideBar(e.target.id);
      }
    });
  });
};

const lodeSideBar = (plantsId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
    .then((res) => res.json())
    .then((data) => {
      lodeCatagory(data.plants);
    });
};

const lodeCatagory = (plants) => {
  allTrees.innerHTML = "";
  plants.forEach((pl) => {
    allTrees.innerHTML += `
     <div class="bg-white p-5">
                        <img class=" mx-auto rounded-xl" src="${pl.image}">
                        <h2 onclick="lodeModul(${pl.id})" class="font-semibold mt-2 text-xl">${pl.name}</h2>
                        <p class="text-sm my-2">${pl.description}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-[#DCFCE7] p-1 px-3 text-[#15803D] rounded-full">Fruit Tree</button>
                            <p class="font-semibold text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>500</span></p>
                            </div>
                            <button id="cartBtn" class="bg-[#15803D] text-white w-full mt-5 py-2 rounded-full">Add to Cart</button>
                    </div>
    `;
  });
};
// modul
const lodeModul = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showModuls(data.plants);
    });
};

const showModuls = (plants) => {
  show.innerHTML = "";

  console.log(plants);
  show.innerHTML += `
      <h3 class="text-center font-semibold text-2xl pb-3">${plants.name}</h3>
      <img class="h-[350px] w-full mx-auto" src="${plants.image}" alt="">
      <p>Category: ${plants.category}</p>
      <p>Price: <span>${plants.price}</span></p>
      <p>Descrption: ${plants.description}</p>
      
      `;

  document.getElementById("my_modal_5").showModal();
};

// left cart add
allTrees.addEventListener("click", (e) => {
  // console.log(e.target.innerText)
  if (e.target.innerText === "Add to Cart") {
    const titel = e.target.parentNode.children[1].innerText;

    const price =
      e.target.parentNode.children[3].children[1].children[1].innerText;
    leftCart.innerHTML += `
    <div class="flex justify-between items-center mx-5 mt-4">
                        <div>
                        <h3 class="text-xl ">${titel}</h3>
                      <p class="text-sm text-gray-500 mt-2"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${price}</span></p>
                      </div>
                      <p class="mt-4"><i class="fa-solid fa-xmark"></i></p>
                      </div>
    `;
  }
});

// all tree mark

trees();
catagoryList();
