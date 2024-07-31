document.addEventListener('DOMContentLoaded', function() {

    async function main() {
    //   let delivery = await loadTasks();
  
      const addListButton = document.querySelector("#addList");
      addListButton.addEventListener('click', function() {
        const itemCodeInput = document.querySelector("#itemCode")
        const itemCodeIp = itemCodeInput.value;

        const itemAddrInput = document.querySelector("#address")
        const itemAddr = itemAddrInput.value;
  
        const taskUrgencySelect = document.querySelector("#taskUrgency");
        const taskUrgency = taskUrgencySelect.value;
  
        if (itemCodeIp) {
          addTask(delivery, brands, itemCodeIp, itemAddr, taskUrgency);
          renderTask(delivery);
          itemCodeInput.value = '';
          itemAddrInput.value = '';
        }
      });
  
      const saveButton = document.querySelector("#save-btn");
      saveButton.addEventListener("click", async function() {
        saveTasks(delivery);
      })
  
  
      // add three delivery
      renderTask(delivery);
    }
  
  
    function renderTask(delivery) {
      deliveryList.innerHTML = '';
      for (let dlist of delivery) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                  <ul>
                    <li>Item Code: ${dlist.itemCode}</li>
                    <li>Address: ${dlist.address}</li>
                    <li>Brand: ${dlist.brand}</li>
                    <li>Received date: ${dlist.RecvDate.year}${'-'}${dlist.RecvDate.month}${'-'}${dlist.RecvDate.day}</li>
                    <li>Category: ${dlist.category}</li>
                    <li >Urgency: <span class="badge  bg-primary">${dlist.urgency}</span></li>
                   </ul>
                  <button class="btn edit-btn btn-success btn-sm">Edit</button>
                  <button class="btn delete-btn btn-danger btn-sm">Delete</button>
                  
              `;
  
        deliveryList.appendChild(li);
  
        // select the edit button which we just created
        li.querySelector(".edit-btn").addEventListener('click', function() {
          const newItemAddr = prompt("Enter the new task address: ", dlist.address);
          const newUrgency = prompt("Enter the new urgency:", dlist.urgency);
          updateTask(delivery, dlist.id, newItemAddr, newUrgency);
          renderTask(delivery);
        });
  
        // allow deleting
        li.querySelector(".delete-btn").addEventListener('click', function() {
          const confirmation = confirm("Do you want to delete the task: " + dlist.itemCode + "?");
          if (confirmation) {
            deleteTask(delivery, dlist.id);
            renderTask(delivery);
          }
        });
  
      }
    }
  
    main();
  });