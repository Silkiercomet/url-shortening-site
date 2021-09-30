let btn = document.querySelector("#shorten-btn"),
  menu = document.querySelector(".shorted--links"),
  btnC = document.querySelectorAll(".btn-c");

const btnInteraction = function () {

    document.querySelectorAll(".btn-c").forEach(function (a, index) {
      let x = document.querySelectorAll(".shortlink");

      a.addEventListener("click", function () {
        a.classList.add("copied");
        x[index].select();
        navigator.clipboard.writeText(x[index].value);
      });
    });

  }
 

const compose = (f, g) => (data) => g(f(data));
 
  if(localStorage.length != 0){
    
    let liOriginal=localStorage["li1"].split(","),liShort=localStorage["li2"].split(",");
    
     for(let i = 0; i < liOriginal.length; i++){
      newLi = document.createElement("li")
      newLi.classList.add("shorted--link");
       newLi.innerHTML = `
       <span>${liOriginal[i]}</span>
       <span><a href="${liShort[i]}" target="_blank" class="copied-link"><input type="text" name="link" class="shortlink" value="${liShort[i]}">${liShort[i]} </a>
       <a class="btn btn-c">copy</a></span>
       `;
      console.log(i,newLi)
     menu.appendChild(newLi);
     }
     setTimeout(btnInteraction, 1000);
    }


const shortLink = async function (data) {
  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${data}`
    );
    let link = await response.json();
    return link;
  } catch (err) {
    console.log(err);
    
  }
};
let memoizedOriginalLink = [], memoizedShortLink = []
const createLi = (x) => {
  liQuery = document.querySelectorAll(".shorted--link");
  x.then((a) => {
    
    let newLi = document.createElement("li");
    newLi.classList.add("shorted--link");
    
    newLi.innerHTML = `
        <span>${a.result.original_link}</span>
        <span><a href="${a.result.full_short_link}" target="_blank" class="copied-link"><input type="text" name="link" class="shortlink" value="${a.result.full_short_link}">${a.result.full_short_link} </a>
        <a class="btn btn-c">copy</a></span>
        `;

        
        
    if (liQuery.length  == 3) {
      liQuery[0].parentNode.removeChild(liQuery[0]);
      menu.appendChild(newLi);


      console.log(memoizedOriginalLink.length)
    } else {
      menu.appendChild(newLi);

    }
    if(memoizedOriginalLink.length == 3){
      memoizedOriginalLink.shift()
      memoizedShortLink.shift()
      memoizedOriginalLink.push([`${a.result.original_link}`])
      memoizedShortLink.push([ `${a.result.full_short_link}`])
    }else{
      memoizedOriginalLink.push([`${a.result.original_link}` ])
      memoizedShortLink.push([ `${a.result.full_short_link}`])
    }
    localStorage.setItem("li1", memoizedOriginalLink)
    localStorage.setItem("li2", memoizedShortLink)
    console.log(memoizedOriginalLink.length)
    
  });
};

const shortAndAdd = compose(shortLink, createLi);

btn.addEventListener("click", function(){
  let j = document.querySelector("#shorten"),k = document.querySelector('.form');
  if(j.value != ""){
    shortAndAdd(j.value);
    k.classList.remove("error")
    j.style.border = "none"
    setTimeout(btnInteraction, 1000);
  }else if(j.value == ""){
    k.classList.add("error")
    j.style.border = "2px solid red"
  }
});
