const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "66ad1585ad19ca34f8908414";
const BIN_ID_BRANDS = "66ad1423ad19ca34f89083a4";
const MASTER_KEY = "$2a$10$y1tgTAZW7ein9.n.wH.cdu5devx/WpoPJO8HwXrcCiHDfO8/CwB3q";

// Add task
function addTask(delivery, brands, itemCode, address, urgency) {
  brandCode = itemCode.toUpperCase().slice(0, 2);

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
  if (foundBrands) {

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

  } else {
    console.log("Delivery code not found, add list failed.");
    itemCode = itemCode.toUpperCase().slice(0, 2);
    alert("Delivery code (" + itemCode + ") is missing from list, add list failed.");
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

  if (foundRecord !== null) {
    // modify the record
    // console.log("Task found.", ",address:"+ address, ",urgency:"+urgency);

    // check address input value
    if (address !== null) {
      foundRecord.address = address;
    }
    // check urgency level input value  
    if (urgency !== null) {
      let urgencyLCase = urgency.toLowerCase();
      if (urgencyLCase == "low" || urgencyLCase == "medium" || urgencyLCase == "high") {
        foundRecord.urgency = urgencyLCase[0].toUpperCase() + urgencyLCase.slice(1);
      }

    }

  } else {
    console.log("Task is not found.");
    alert("Item code mismatch, update failed.")
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



//////////////////////    Brands portion   /////////////////////////////
// Modify brand list
function modifyBrandList(brands, mode, code, name, category) {
  if (mode === "add") {
    // add new brand
    let newlist = {
      code: code.toUpperCase(),
      name: name,
      category: category,
    }
    brands.push(newlist);

  } else {
    // find brand
    let foundBrand = null;
    i = 0;
    for (let t of brands) {
      if (t.code === code.toUpperCase()) {
        foundBrand = t;
        break;
      }
      i += 1;
    }
    if (foundBrand !== null) {
      if (mode === "delete") {
        brands.splice(i, 1);

      } else if (mode === "update") {
        if (name !== null) {
          foundBrand.name = name;
        }
        if (category !== null) {
          foundBrand.category = category;
        }

      } else if (foundBrand == null) {
        // Failed!!
        console.log("Brand code is not found.");
      }
    }else {
      console.log("Brand code not found, update list failed.");
      alert("Brand code is missing, add list failed.");
  
    }
  }
}// Modify brand list End


//async function for delivery object list
async function loadTasks() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  return response.data.record;
}

async function saveTasks(delivery) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, delivery, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;
}


//async function for brand object list
async function loadBrands() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID_BRANDS + "/latest");
  return response.data.record;
}

async function saveBrands(brands) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID_BRANDS}`, brands, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;
}





