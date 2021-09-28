let btn = document.querySelector("#shorten-btn"),
  menu = document.querySelector(".shorted--links");

const compose = (f, g) => (data) => g(f(data));

const shortLink = async function (data) {
  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${data}`
    );
    let link = await response.json();
    //console.log(link.result.full_short_link)
    return link;
  } catch (err) {
    console.log(err);
  }
};


const createLi = (x) => {
  x.then((a) => {

    let newLi = document.createElement("li");
    newLi.classList.add("shorted--link");
    newLi.innerHTML = `
        <span>${a.result.original_link}</span>
        <span><a href="#">${a.result.full_short_link}</a>
        <a href="${a.result.full_short_link}" class="btn">copy</a></span>
        `;
    menu.appendChild(newLi);
  });

};
const shortAndAdd = compose(shortLink, createLi);
btn.addEventListener("click", function () {
    shortAndAdd(document.querySelector("#shorten").value);
  });
