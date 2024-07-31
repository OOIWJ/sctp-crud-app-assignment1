// Brand list
let brands = [
  {
    code: "CK",
    name: "Calvin Klein",
    category: "Fashion"
  },
  {
    code: "LE",
    name: "Lego",
    category: "Toy"
  },
  {
    code: "NI",
    name: "Nike",
    category: "Athleticwear"
  }
]


//Delivery list
let delivery = [
  {
    id: 100001, // unique identify each todo in the list
    brand: "Calvin Klein",
    itemCode: "CK10001",
    category: "Fashion",
    RecvDate: {
      year: 2024,
      month: 7,
      day: 19,
    },
    address: "Tiong Bharu",
    urgency: "High",
  },
  {
    id: 100002,
    brand: "Lego",
    itemCode: "LE10001",
    category: "Toy",
    RecvDate: {
      year: 2024,
      month: 7,
      day: 19,
    },
    address: "Boon Lay",
    urgency: "Low",
  },
];

///////////////////////////////////////////

// Add task
function addTask(delivery, brands, itemCode, address, urgency) {
  brandCode = itemCode.toUpperCase().slice(0,2);

  // define date
  let toDay = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };


  // define brand
  let foundBrands = null;
  for (let t of brands) {
    if (t.code === brandCode) {
      foundBrands = t;
    }
  };

  // Find brands
  if (foundBrands){
  
    // create the object that represents the record
    let taskRecord = {
      id: parseInt(Math.random() * 100000), // stop gap measure: use random number for ids is only valid for testing
      itemCode: itemCode,
      brand: foundBrands.name,
      category: foundBrands.category,
      RecvDate: toDay,
      address: address,
      urgency: urgency,
    };
    // add the record to the array
    delivery.push(taskRecord);

  }else{
    console.log("Brand code not found, add list failed.")
  }


} //function addTask End


// Update task list
function updateTask(delivery, id, address, urgency) {
  let foundRecord = null;
  for (let t of delivery) {
    if (t.id === id) {
      foundRecord = t;
    }
  }

  if (foundRecord){
    // modify the record
    foundRecord.address = address;
    foundRecord.urgency = urgency;
  } else{
    console.log("Task is not found.")
  }

}//Update task list End

// Delete task list
function deleteTask(delivery, id) {
  let index = null;
  for (let i = 0; i < delivery.length; i++) {
    if (delivery[i].id == id) {
      index = i;
      break;
    }
  }
  if (index !== null) {
    delivery.splice(index, 1);
  } else {
    console.log("Task is not found.");
  }

} //Delete task list End

//////////////////////6666666666666666666/////////////////////////////
// Add brand list



// Modify brand list
function modifyBrandList(brands, mode, code, name, category) {
  if (mode === "add"){
    // add new brand
    let newlist = {
      code: code,
      name: name,
      category: category,
    }
      brands.push(newlist);

  }else {

  let foundBrand = null;
  for (let t of brands) {
    if (t.code === code) {
      foundBrand = t;
    }
  }

  if (foundBrand && mode ==="update"){
    // modify the record
    foundBrand.name = name;
    foundBrand.category = category;
  } else{
    console.log("Task is not found.")
  }
}// Modify brand list End

  }












  }
  
  







  
  






