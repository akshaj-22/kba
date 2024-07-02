descriptions = [];
amounts = [];
categories = [];

function addexpense() {
    const dinput = document.getElementById("description");
    const ainput = document.getElementById("amount");
    const cinput = document.getElementById("category");
    const elist = document.getElementById("expenselist");

    let d = dinput.value.trim();
    let a = Number(ainput.value.trim());
    let c = cinput.value.trim();

    if (d !== "" && !isNaN(a) && (c === "1" || c === "2" || c === "3")) {
        descriptions.push(d);
        amounts.push(a);
        categories.push(c);
        let li = document.createElement("li");
        li.textContent = `Expense Description: ${d} , Expense Amount: ${a}`;

        switch(c){
            case "1": li.classList.add("food")
            break;
            case "2": li.classList.add("transport");
            break;
            case "3": li.classList.add("entertainment");
        }

        const cbtn=document.createElement("button");
        cbtn.textContent="Complete";
        cbtn.onclick=function(){
            li.classList.toggle("completed")
        }
        li.appendChild(cbtn);

        const edbtn=document.createElement("button");
        edbtn.textContent="Edit Description";
        edbtn.onclick=function(){
            let newd=prompt("Enter new Description",d);
            if(newd!==null && newd.trim()!==""){
                const dindex=descriptions.indexOf(d);
                descriptions[dindex]=newd;
                li.firstChild.textContent=`Expense Description: ${newd} , Expense Amount: ${a}`;
                d=newd;
            }
        }
        li.appendChild(edbtn);


        const rmbtn=document.createElement("button");
        rmbtn.textContent="Remove";
        rmbtn.onclick=function(){
            elist.removeChild(li);
            const dindex=descriptions.indexOf(d);
            descriptions.splice(dindex,1);
            amounts.splice(dindex,1);
            categories.splice(dindex,1);

        }
        li.appendChild(rmbtn);

        elist.appendChild(li);
        dinput.value = '';
        ainput.value = '';
        cinput.value = '';
    } else {
        alert("Invalid input. Please enter a valid description, amount, and category.");
    }
}