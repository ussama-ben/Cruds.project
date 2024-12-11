let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
//get total
function gettotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result ;
        total.style.background = '#5d4564'
    }else{
        total.innerHTML ='';
        total.style.background = '#442F4A'
    }

}
//create function 
let datapro;
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

submit.onclick = function() {
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        total:total.innerHTML,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
    };

  if(title.value!='' && price.value!= '' && category.value != '' && count.value<100){
    if(mood ==='create'){
        if(newpro.count>1){
         for(let i = 0 ; i <newpro.count; i++){
             datapro.push(newpro);
         }
         }else{
             datapro.push(newpro);
     }
    }else{
         datapro[ tmp ] = newpro;
         mood = 'create';
         submit.innerHTML = 'Create';
         count.style.display = 'block';
 
    }
  }

    
    //savelocal storage
    localStorage.setItem ('product', JSON.stringify(datapro))
    console.log(datapro);
    clear()
    showdata()

};
// cleqr input
function clear(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML='';
    discount.value='';
    count.value='';
    category.value='';

}

//Read 
function showdata(){
    gettotal()
    let table ='';
    for(let i = 0 ; i<datapro.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td> 
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall'); 
    if(datapro.length>0){
      btndelete.innerHTML = `
           <button onclick="deleteall()" >Delete All (${datapro.length})</button>
      `
    }else{
        btndelete.innerHTML = '';
    }

}
showdata()
//delete 
function deletedata(i){

    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}
//deleteaall
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata()

}
//update 
function updatedata(i){
    title.value = datapro[i].title ;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount; 
    gettotal()
    count.style.display='none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
        top : 0,
        behavior : "smooth",
    })

}

//search 
let searchmood='title';
function getsearch(id){
    let search = document.getElementById('search')
  if(id == 'searchbytitle'){
    searchmood = 'title';
    search.placeholder ='search by title';
  }else{
    searchmood = 'category';
    search.placeholder = 'search by category';
  }
  search.focus();
  search.value = '';
  showdata()
    
}
function search(value){
    let table ='';
    if(searchmood == 'title'){
        for(let i = 0 ;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td> 
                </tr>
            `
            }
        }
    }else{
        for(let i = 0 ;i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td> 
                </tr>
            `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;

}