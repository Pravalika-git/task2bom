// let container=document.getElementsByClassName("container")[0];
// let btnContainer=document.getElementsByClassName("btn-container")[0];
// async function getData(){
//     try {
//    let response= await fetch("http://localhost:8000/product")
//         if (!response.ok){
//          throw new Error("HTTPS invaild",response.status)
//         }
//         let result = await response.json();
//         localStorage.setItem("products",JSON.stringify(result));
//         let products = JSON.parse(localStorage.getItem("products"))
//         displayData(products);
        
//     } catch (err) {
//         console.error(err) 
//     }
//   }
//     function displayData(products){
//         container.innerHTML=``;
//         if (products==null){
//              container.innerHTML=`<h1>No Data Avalible</h1>`

//         }
//         else{
           
//            products.forEach(obj=>{
//             let {image,title,description,price,category} = obj;
//             let item = document.createElement("div");
//             item.id="item";
//             item.innerHTML=`
//             <img src='${image}'>
//             <p>${title} , price ${price}</p>
//             <p>${description}</p>
//             <p><b>${category}</b></p>
//             `;
//             container.appendChild(item)
//            }) 
//            displayButtons();
//         }
//     }
// function  displayButtons(){
//     btnContainer=innerHTML=``
//     let products = JSON .parse(localStorage.getItem("products"))
//     let allButton = document.createElement("button")
//     allButton.innerHTML=``
//     allButton.addEventListener("click",function(){
//         displayData(products)

//     })

//     btnContainer.appendChild(allButton)
//      let categoryArr=products.map(obj=>(obj.category));
//  Array.from(new Set(categoryArr)).forEach(ele=>{
//     // console.log(ele)
//     let button = document.createElement("button")
//     button.innerHTML=ele;
//     button.addEventListener("click",function() {
//         filterData(ele,products);

//     })
//     btnContainer.appendChild(button);

  
//  });
  
// }
// function  filterData(ele,products){
//     let categoryArr = products.filter(obj=>obj.category==ele)
//     displayData(categoryArr)
  
// }

// getData();


let container = document.getElementsByClassName("container")[0];
let btnContainer = document.getElementsByClassName("btn-container")[0];


// let id = document.getElementById("id");
async function getproducts() {
    try {
        let response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
            throw new Error("HTTP Errror : ", response.status);
        }
        let result = await response.json();
        localStorage.setItem("products", JSON.stringify(result));
        // localStorage.setItem("products",JSON.stringify("AddData"))
        let products = JSON.parse(localStorage.getItem("products"));
        displayData(products);
    } catch (err) {
        console.error(err);
    }
}


function displayData(products) {
    container.innerHTML = ``;
    if (products == null) {
        container.innerHTML = `<h1>No Data Available</h1>`;
    }
    else {
        products.forEach(obj => {
            let { image, title, price, description, category } = obj;
            let item = document.createElement("div");
            item.id = "item";
            item.innerHTML = `
            <img src = '${image}'> 
            <p class="Title">Title : ${title} , Price : ${price}</p>
            <p class="Description">Description : ${description}</p>
            <p class="Category"><b>Category : ${category}</b></p>
            <button onclick="AddData('${obj.id}')">Add Data</button>
            <button onclick ="DeleteData('${obj.id}')">DeleteData</button>
            `;
            container.appendChild(item);
        });
        displayButtons();
    }
}
function displayButtons() {
    btnContainer.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products"));


    let select = document.createElement("select");
    select.id = "categoryDropdown";
    select.innerHTML = `<option value="all">All Categories</option>`;

    let categoryArr = products.map(obj => obj.category);
    let uniqueCategories = Array.from(new Set(categoryArr));

    uniqueCategories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });

  
    select.addEventListener("change", function () {
        let selectedCategory = select.value;
        if (selectedCategory === "all") {
            displayData(products);
        } else {
            filterData(selectedCategory, products);
        }
    });

    btnContainer.appendChild(select);
}





// function displayButtons() {
//     btnContainer.innerHTML = ``;
//     let products = JSON.parse(localStorage.getItem("products"));
  
    
//     let allButton = document.createElement("button");
//     allButton.innerHTML = `All Data`;
//     allButton.addEventListener("click", function () {
//         displayData(products);

//     })
//     btnContainer.appendChild(allButton);
//     let categoryArr = products.map(obj => obj.category);
//     Array.from(new Set(categoryArr)).forEach(ele => {
//         let button = document.createElement("button");
//         button.innerHTML = ele;
//         button.addEventListener("click", function () {
//             filterData(ele, products);
//         })
//         btnContainer.appendChild(button);
//     })
// }

// function filterData(ele, products) {
//     let categoryArr = products.filter(obj => obj.category == ele);
    
//     displayData(categoryArr);
// }

async function DeleteData(id) {
    try {
        let response = await fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" });
        
        if (response.ok) {
            let products = JSON.parse(localStorage.getItem("products"));
            
          
            products = products.filter(obj => obj.id != id);
            localStorage.setItem("products", JSON.stringify(products))
            displayData(products);
            alert("Data Deleted");
        } else {
            alert("Failed to delete data");
        }
    } catch (err) {
        console.error("Error deleting data:", err);
    }
}

// function Addata() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let cartContainer = document.getElementById("cart");

//     cartContainer.innerHTML = ""; 

//     if (cart.length === 0) {
//         cartContainer.innerHTML = "<p>No items in cart</p>";
//         return;
//     }

//     cart.forEach(item => {
//         let div = document.createElement("div");
//         div.innerHTML = `<p>${item.title} - $${item.price}</p>`;
//         cartContainer.appendChild(div);
//     });
// }


getproducts();

// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(() => {
//         document.getElementById("loadingScreen").style.opacity = "0";
//         setTimeout(() => {
//             document.getElementById("loadingScreen").style.display = "none";
//         }, 500);
//     }, 1500); 
    
// });














