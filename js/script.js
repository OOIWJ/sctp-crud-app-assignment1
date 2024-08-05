document.addEventListener('DOMContentLoaded', function () {

  async function main() {
    let delivery = await loadTasks();
    let brands = await loadBrands();

    const addListButton = document.querySelector("#addList");
    addListButton.addEventListener('click', function () {
      const itemCodeInput = document.querySelector("#itemCode")
      const itemCodeValue = itemCodeInput.value;

      const itemAddrInput = document.querySelector("#address")
      const itemAddr = itemAddrInput.value;

      const taskUrgencySelect = document.querySelector("#taskUrgency");
      const taskUrgency = taskUrgencySelect.value;

      document.getElementById('itemCode').disabled = false;

      if (document.querySelector("#addList").innerText == "Update") {
        if (itemCodeValue) {
          updateTask(delivery, dlistID, itemAddr, taskUrgency);
          renderTask(delivery);
        }

      } else if (document.querySelector("#addList").innerText == "Add List") {
        if (itemCodeValue) {
          addTask(delivery, brands, itemCodeValue, itemAddr, taskUrgency);
          renderTask(delivery);
        }
      }
      itemCodeInput.value = '';
      itemAddrInput.value = '';
      document.querySelector("#addList").innerText = "Add List";

    });

    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function () {
      saveTasks(delivery);
      alert("Delivery list have been saved.")
    })


    // add delivery list to memory
    renderTask(delivery);
  } //main function end


  function renderTask(delivery) {
    deliveryList.innerHTML = '';
    for (let dlist of delivery) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
                  <ul class="col-8">
                    <li>Item Code: ${dlist.itemCode}</li>
                    <li>Address: ${dlist.address}</li>
                    <li>Brand: ${dlist.brand}</li>
                    <li>Received date: ${dlist.RecvDate.year}${'-'}${dlist.RecvDate.month}${'-'}${dlist.RecvDate.day}</li>
                    <li>Category: ${dlist.category}</li>
                    <li>Urgency level: <span class="badge  bg-primary">${dlist.urgency}</span></li>
                   </ul>  
                  <button class="btn edit-btn btn-success btn-sm">Edit</button>  
                  <button class="btn delete-btn btn-danger btn-sm">Delete</button>
              `;

      deliveryList.appendChild(li);

      li.querySelector(".edit-btn").addEventListener('click', function () {
        document.getElementById('itemCode').value = dlist.itemCode;
        document.getElementById('itemCode').disabled = true;
        document.getElementById('address').value = dlist.address;
        document.getElementById('taskUrgency').value = dlist.urgency;
        document.querySelector("#addList").innerText = "Update";
        dlistID = dlist.id;
        document.getElementById('deliveryListTitle').scrollIntoView({ behavior: 'smooth' });

      });

      // allow deleting
      li.querySelector(".delete-btn").addEventListener('click', function () {
        const confirmation = confirm("Do you want to delete the task: " + dlist.itemCode + "?");
        if (confirmation) {
          deleteTask(delivery, dlist.id);
          renderTask(delivery);
        }
      });

    }
  } // renderTask function end

  //brands 
  async function mainBrands() {
    let brands = await loadBrands();

    const addBrandListButton = document.querySelector("#addBrandList");
    addBrandListButton.addEventListener('click', function () {
      const codeInput = document.querySelector("#code")
      const code = codeInput.value;

      const nameInput = document.querySelector("#name")
      const name = nameInput.value;

      const categoryInput = document.querySelector("#category");
      const categoryValue = categoryInput.value;

      document.getElementById("code").disabled = false;

      if (document.querySelector("#addBrandList").innerText == "Add List") {
        if (code) {
          modifyBrandList(brands, "add", code, name, categoryValue);
          renderBrands(brands);
        }
      } else if (document.querySelector("#addBrandList").innerText == "Update") {
        if (code) {
          modifyBrandList(brands, "update", bListBrandCode, name, categoryValue);
          renderBrands(brands);
        } 
      }
      codeInput.value = '';
      nameInput.value = '';
      categoryInput.value = '';
      document.querySelector("#addBrandList").innerText = "Add List";

    });

    const brandSaveButton = document.querySelector("#brand-save-btn");
    brandSaveButton.addEventListener("click", async function () {
      ;
      saveBrands(brands);
      alert("Brand list have been saved.");
    })

    // add brands
    renderBrands(brands);
  } //mainBrands function end

  function renderBrands(brands) {
    brandList.innerHTML = '';
    for (let blist of brands) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
                  <ul class="col-8">
                    <li>Code: ${blist.code} </li>
                    <li>Name: ${blist.name}</li>
                    <li>Category: ${blist.category}</li>
                   </ul>
                  <button class="btn brand-edit-btn btn-success btn-sm">Edit</button>
                  <button class="btn delete-btn btn-danger btn-sm">Delete</button>
                  
              `;

      brandList.appendChild(li);

      li.querySelector(".brand-edit-btn").addEventListener('click', function () {
        document.getElementById('code').value = blist.code;
        document.getElementById('name').value = blist.name;
        document.getElementById('category').value = blist.category;
        document.querySelector("#addBrandList").innerText = "Update";
        document.getElementById("code").disabled = true;
        bListBrandCode = blist.code;
        document.getElementById('brandListTitle').scrollIntoView({ behavior: 'smooth' });

      });

      // allow deleting
      li.querySelector(".delete-btn").addEventListener('click', function () {
        const confirmation = confirm("Do you want to delete the brand list: " + blist.code + "?");
        if (confirmation) {
          modifyBrandList(brands, "delete", blist.code, blist.name, blist.category);
          renderBrands(brands);
        }
      });

    }
  } //renderBrands function end

  main();
  mainBrands();
});



