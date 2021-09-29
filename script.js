let btn = document.querySelector("#shorten-btn"),
  menu = document.querySelector(".shorted--links"),
  btnC = document.querySelectorAll(".btn-c");

const compose = (f, g) => (data) => g(f(data));

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

    if (liQuery.length === 3) {
      liQuery[0].parentNode.removeChild(liQuery[0]);
      menu.appendChild(newLi);
    } else {
      menu.appendChild(newLi);
    }
  });
};

const shortAndAdd = compose(shortLink, createLi);

btn.addEventListener("click", function () {
  shortAndAdd(document.querySelector("#shorten").value);

  setTimeout(function () {
    document.querySelectorAll(".btn-c").forEach(function (a, index) {
      let x = document.querySelectorAll(".shortlink");

      a.addEventListener("click", function () {
        a.classList.add("copied");
        x[index].select();
        navigator.clipboard.writeText(x[index].value);
      });
    });
  }, 1000);
});
