var bookMarkName = document.getElementById('Name');
var bookMarkUrl = document.getElementById('url');
var submitBtn = document.getElementById('submit');
var tableBody = document.getElementById('tableBody');
var deleteBtn = document.getElementById('deleteBtn');
var closeBtn = document.getElementById('closeBtn');
var alerto = document.getElementById('dcdc');

var bookMarkList = [];

if(localStorage.getItem("bookmark") != null){
  bookMarkList =  JSON.parse(localStorage.getItem("bookmark"));
  displayBookMarks(bookMarkList);
}

submitBtn.addEventListener('click', addElement)
function addElement(){
  var bookMark ={
    Name: bookMarkName.value,
    url:bookMarkUrl.value
  };
  if(nameCheck(bookMark.Name) && urlCheck(bookMark.url)){
  bookMarkList.push(bookMark);
  localStorage.setItem("bookmark",JSON.stringify(bookMarkList));
  displayBookMarks(bookMarkList)
  }
  else{
    alerto.classList.remove('d-none')

    /* ----------Sweet alert------------ */
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Something is wrong ',
    //   text: 'The site name or url is wrong',
    //   footer: '<a href="">Why do I have this issue?</a>'
    // })
  }
}
function displayBookMarks(arr){
  cartona =``;
  for(var i=0;i<arr.length;i++){
    cartona+=`
    <tr>
      <td class="fw-semibold">${i+1}</td>
      <td class="fw-semibold">${bookMarkList[i].Name}</td>
      <td><a class="btn btn-success px-3" href="${bookMarkList[i].url}" target="_blank"><i class="fa-regular fa-eye"></i> Visit</a></td>
      <td><button class="btn btn-danger px-2" onclick="deleteB(${i})" id="deleteBtn"><i class="fa-regular fa-trash-can pe-2"></i>Delete</button></td>
    </tr>
    `
  }
  tableBody.innerHTML = cartona ;
}

function deleteB (i){
  bookMarkList.splice(i,1);
  localStorage.setItem("bookmark",JSON.stringify(bookMarkList));
  displayBookMarks(bookMarkList);
}

function nameCheck(name){
  var regex =/^[a-zA-Z]{3,10}[0-9]{0,5}$/;
  return regex.test(name); 
}
function urlCheck(url){
  const regex =/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return regex.test(url); 
}

closeBtn.addEventListener('click',function(){

  alerto.classList.add('d-none');
})

