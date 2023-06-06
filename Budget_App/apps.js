const checkAmntBtn = document.getElementById("check-amount");
const totalAmnt = document.getElementById("total-amount");
const userAmnt = document.getElementById("user-amount");
const prodTitle = document.getElementById("product-title");
const totalAmntBtn = document.getElementById("total-amount-button");
const balanceVal = document.getElementById("balance-amount");
const errMsge = document.getElementById("budget-error");
const lst = document.getElementById("list");
const amnt = document.getElementById("amount");
const expenditureVal = document.getElementById("expenditure-value");
let tempAmount = 0;

totalAmntBtn.addEventListener("click", () => {
  tempAmount = totalAmnt.value;
  if (tempAmount === "" || tempAmount < 0) {
    errMsge.classList.remove("hide");
  } else {
    errMsge.classList.add("hide");
    amnt.textContent = tempAmount;
    balanceVal.textContent = tempAmount - expenditureVal.textContent;
    totalAmnt.value = "";
  }
});

const disableButtons = (bool) => {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.disabled = bool;
  });
};

const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement;
  const currentBalance = balanceVal.textContent;
  const parentAmount = parentDiv.querySelector(".amount").textContent;
  
  if (edit) {
    const parentText = parentDiv.querySelector(".product").textContent;
    prodTitle.value = parentText;
    userAmnt.value = parentAmount;
    disableButtons(true);
  }
  
  balanceVal.textContent = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureVal.textContent = parseInt(expenditureVal.textContent) - parseInt(parentAmount);
  parentDiv.remove();
};

const listCreator = (expenseName, expenseValue) => {
  const sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  


  const editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-file-pen", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  lst.appendChild(sublistContent);
};

checkAmntBtn.addEventListener("click", () => {
  if (!userAmnt.value || !prodTitle.value) {
    prodTitleErr.classList.remove("hide");
    return false;
  }
  
  disableButtons(false);
  const expenditure = parseInt(userAmnt.value);
  const sum = parseInt(expenditureVal.textContent) + expenditure;
  expenditureVal.textContent = sum;
  const totalBalance = tempAmount - sum;
  balanceVal.textContent = totalBalance;
  
  listCreator(prodTitle.value, userAmnt.value);
  
  prodTitle.value = "";
  userAmnt.value = "";
});
