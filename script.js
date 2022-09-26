const searchBtn = document.querySelector(".search-user");
const searchForm = document.querySelector(".search-form");
const userContainer = document.querySelector(".user-container");
const input = document.querySelector("input");

let GITAPI = "https://api.github.com/users/";
const myUsername = "samuelberhane";

getUser(myUsername);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  if (inputValue) {
    getUser(inputValue);
    input.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue) {
    getUser(inputValue);
    input.value = "";
  }
});

function getUser(myUsername) {
  userContainer.innerHTML = "";
  let xml = new XMLHttpRequest();
  xml.open("GET", `${GITAPI}${myUsername}`);
  xml.onload = function () {
    if (xml.status == 200) {
      let user = JSON.parse(xml.responseText);
      console.log(user);
      let userInfo = document.createElement("div");
      userInfo.classList.add("user-info");
      userInfo.innerHTML = `
        <img src="${user.avatar_url} alt="" />
        <h2 class="user-name">
          User Name: <span class="username">${isNull(user.login)}</span>
        </h2>
        <h2 class="real-name">
          Real Name: <span class="name">${isNull(user.name)}</span>
        </h2>
        <h3 class="location">Location: <span class="country">${isNull(
          user.location
        )}</span></h3>
        <h4 class="repos">
          Number of Repository: <span class="number">${isNull(
            user.public_repos
          )}</span>
        </h4>
        `;
      userContainer.appendChild(userInfo);
    }
  };
  xml.send();

  let xmlRepos = new XMLHttpRequest();
  xmlRepos.open("GET", `${GITAPI}${myUsername}/repos`);
  xmlRepos.onload = function () {
    if (xmlRepos.status == 200) {
      let repos = JSON.parse(xmlRepos.responseText);
      let userRepos = document.createElement("div");
      userRepos.classList.add("repos-name");
      userRepos.innerHTML = `
          <h3>Repositories:</h3>
          <div class="all-repos">
          </div>
          `;
      let allRepos = userRepos.querySelector(".all-repos");
      repos.forEach((repo) => {
        let eachrepo = document.createElement("p");
        eachrepo.classList.add("repo");
        eachrepo.innerText = `${repo.name}`;
        allRepos.appendChild(eachrepo);
      });
      userContainer.appendChild(userRepos);
      userContainer.appendChild(allRepos);
    }
  };
  xmlRepos.send();
}

function isNull(item) {
  if (item == null) return "";
  return item;
}
