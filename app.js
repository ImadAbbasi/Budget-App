let totalAmounts = [];
let setBudget = ()=>{
    let totalBudget = document.getElementById('total_amount').value;
    let budgetVal = document.getElementById('budgetVal').innerText = totalBudget;
    if (!budgetVal) {
        alert("Enter the amount.")
    }else{
        localStorage.setItem("budgetVal", budgetVal);
        document.getElementById('total_amount').value = '';
        // console.log(totalBudget)
    }
}


let totalExpense = (amount)=>{
    totalAmounts.push(+amount);
    const finalExpenses = totalAmounts.reduce((current,el)=>{
        return current + el;
    },0)
    // console.log(finalExpenses)
    document.getElementById("expenseVal").innerText = finalExpenses;
    localStorage.setItem("finalExpenses", finalExpenses);
}



let addExpense = ()=>{
    let category = document.getElementById('exp_cat').value;
    let amount = document.getElementById('expense_amount').value;
    document.getElementById('exp_cat').value = '';
    document.getElementById('expense_amount').value = '';

    let expSubCon = document.getElementById("exp-sub-con");
    if (!category || !amount) {
        alert("Please add category and amount in respective fields.")
    }else{
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense_list");
        expSubCon.appendChild(expenseItem);
        const expenseItemH4 = document.createElement("input");
        expenseItemH4.classList.add("reportInput")
        expenseItemH4.value = category;
        expenseItemH4.setAttribute("readonly", "readonly");
        expenseItem.appendChild(expenseItemH4);
        const expenseItemP = document.createElement("input");
        expenseItemP.classList.add("reportInput");
        expenseItemP.value = amount;
        expenseItemP.setAttribute("readonly", "readonly")
        expenseItem.appendChild(expenseItemP);
        const expenseItemDiv = document.createElement("div");
        const edit = document.createElement("button");
        const trash = document.createElement("button");
        edit.classList.add("edit");
        edit.innerText = "Edit"
        trash.classList.add("fa-solid", "fa-trash-can", "trash");
        expenseItemDiv.appendChild(edit);
        expenseItemDiv.appendChild(trash);
        expenseItem.appendChild(expenseItemDiv);

        totalExpense(amount);
        totalSavings();

        trash.addEventListener("click", ()=>{
            expSubCon.removeChild(expenseItem);
            totalExpense(-amount);
        });

        edit.addEventListener("click", ()=>{
            if (edit.innerText.toLowerCase() == "edit") {
                expenseItemH4.removeAttribute("readonly");
                expenseItemH4.focus();
                expenseItemP.removeAttribute("readonly");
                expenseItemP.focus();
                edit.innerText = "Save";
              } else {
                expenseItemH4.setAttribute("readonly", "readonly");
                expenseItemP.setAttribute("readonly", "readonly");
                edit.innerText = "Edit";
              }
        });
    };
};



let totalSavings = ()=>{
    const totalBudget = localStorage.getItem('budgetVal');
    const expenses = localStorage.getItem('finalExpenses');
    const savings = totalBudget - expenses;
    document.getElementById("saveVal").innerText = savings;;
}



