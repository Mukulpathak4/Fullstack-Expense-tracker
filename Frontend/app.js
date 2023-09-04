let form = document.getElementById('form');
let itemList = document.getElementById('users');
let flag = false;

window.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/expense")
        .then((response) => {
           
            response.data.allUsers.forEach((ele) => {
                showNewUseronScreen(ele);
               
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    let sellingprice = document.getElementById('sellingprice').value;
    let productname = document.getElementById('productname').value;

    let obj = {
        id,
        sellingprice,
        productname
    };
    postRequest = async () => {
        try {

            if(flag==false){
           
            const response = await axios.post("http://localhost:3000/expense", obj);
            console.log(response);
            console.log(response.data.newExpenseDetail);
            location.reload();
            //showNewUseronScreen(response.data.newExpenseDetail);
            return;
            }
            else
            {
                console.log(obj.id);
                const response = await axios.post(`http://localhost:3000/expense/${obj.id}`, obj);
                console.log(response.data);
                flag = false;
                location.reload();
            }
        } catch (err) {
            document.body.innerHTML += "<h4>Something went wrong !</h4>";
            console.log(err);
        }
    }
    postRequest();
}
function deleteUserfromapi(id) {
    try {
        axios.delete(`http://localhost:3000/expense/${id}`)
            .then(() => {
                deleteUser(id);
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        document.body.innerHTML += "<h4>Something went wrong!</h4>";
        console.log(err);
    }
}


function showNewUseronScreen(userDetails) {
    const d = document.getElementById('users');
    console.log(userDetails.id);
    let li = `<li id="${userDetails.id}"> '${userDetails.sellingprice}','${userDetails.productname}'
     <button onclick="deleteUserfromapi('${userDetails.id}')">Delete</button>
    </li>`;

    d.innerHTML = d.innerHTML + li;

    // Calculate and update the total expense
    const totalexpense = document.getElementById('totalexpense');
    const currentTotal = parseFloat(totalexpense.textContent) || 0; // Get the current total, default to 0 if not present
    const sellingPrice = parseFloat(userDetails.sellingprice);
    
    // Add the current user's selling price to the total
    const newTotal = currentTotal + sellingPrice;

    totalexpense.textContent = newTotal.toFixed(2); // Display the updated total with 2 decimal places
}

   function deleteUser(id) {
    let child = document.getElementById(id)
    let parent=document.getElementById('users')
    parent.removeChild(child)
    
}