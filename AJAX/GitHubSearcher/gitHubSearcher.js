
// /*Variables*/
// const url = "https://api.github.com/users";
// const user_url = "https://api.github.com/users/";
// const userInputID = document.getElementById("userInputID");
// const cardBox = document.getElementById("cardBoxID");
// const repoButton = document.getElementById("repoButton");



// /*Function for fill card section on load page*/
// const fillCardBox = () => {

//     const xml = new XMLHttpRequest();

//     xml.open("GET", url, true);

//     xml.onreadystatechange = () => {

//         if (xml.readyState === 4 && xml.status === 200) {
//             let jsFile = JSON.parse(xml.responseText);

//             cardBox.innerHTML = "";

//             jsFile.forEach(element => {

//                 let card =
//                     `<div class=" col-12 col-sm-6 col-md-3 cardBorder mt-4"
//                     <div class="card" style="">
//                         <img src=${element.avatar_url} class="card-img-top" alt="Image...">
//                         <div class="card-body p-0">
//                             <h5 class="card-title mb-3" id="username">${element.login}</h5>
//                             <a href="#" class="btn btn-primary" id="repoButton">Go to repositori</a>
//                         </div>
//                     </div>
//                 </div>`;

//                 cardBox.innerHTML += card;
//             });
//         }
//     }

//     xml.send();
// }

// /*Function for search GitHub user*/
// const searchUsers = (e) => {

//     if (e.keyCode === 13) {

//         const xml = new XMLHttpRequest();

//         xml.open("GET", `https://api.github.com/search/users?q=${userInputID.value}`, true);

//         xml.onreadystatechange = () => {

//             if (xml.readyState === 4 && xml.status === 200) {

//                 if (JSON.parse(xml.responseText).total_count === 1) {

//                     let jsFile = JSON.parse(xml.responseText).items[0];

//                     cardBox.innerHTML = "";

//                     let card =
//                         `<div class="col-12 col-sm-6 col-md-3 cardBorder mt-4"
//                         <div class="card" style="width: 24%;">
//                             <img src=${jsFile.avatar_url} class="card-img-top" alt="Image...">
//                             <div class="card-body p-0">
//                                 <h5 class="card-title mb-3" id="username">${jsFile.login}</h5>
//                                 <a href="#" class="btn btn-primary" id="repoButton">Go to repositori</a>
//                             </div>
//                         </div>
//                     </div>`;

//                     cardBox.innerHTML += card;
//                 }
//                 else{
//                     alert("User isn't find. Try again!");
//                 }
//             }
//         }

//         xml.send();
//     }
// }

// /*Function for view repositoru*/
// const viewRepositori = () => {

//     const userName = document.getElementById("username");
//     let url = `https://api.github.com/search/users?q=${userName}`;

//     const xml = new XMLHttpRequest();

//     xml.open("GET", url, true);

//     xml.onreadystatechange = () => {

//         if (xml.readyState === 4 && xml.status === 200) {
//             console.log(JSON.parse(xml.responseText));
//         }

//     };

//     xml.send();
// }



// /*Events*/
// window.addEventListener("load", fillCardBox);
// userInputID.addEventListener("keypress", searchUsers);
// repoButton.addEventListener("click", viewRepositori);


/*Variables*/
const userInput = document.getElementById("userInputID");
const cardBox = document.getElementById("cardBoxID");
const all_users_url = "https://api.github.com/users";
const user_url = "https://api.github.com/users/";
const page = window;
const body = document.querySelector("body");
const tableInfo = document.getElementById("tableInfo");
const tableTitle = document.getElementById("tableTitle");
const reposeTable = document.getElementById("reposTable");
const cardSec = document.querySelector("#cardSec");

console.log(cardSec.setAttribute);



/*Function for filling cardBox*/
const fillingCardBox = () => {

    const xml = new XMLHttpRequest();

    xml.open("GET", all_users_url, true);

    xml.send();

    xml.onreadystatechange = () => {
        if (xml.readyState === 4 && xml.status === 200) {
            let jsObject = JSON.parse(xml.responseText);
            cardBox.innerHTML = "";
            reposTable.innerHTML = "";
            tableTitle.textContent = "";

            
            jsObject.forEach(element => {
                let cardBoxHTML =
                    `<div class="col-sm-6 col-md-4 col-lg-3 text-center">
                    <div class="card cardMargin">
                        <img veza="${element.login}" src=${element.avatar_url} class="card-img-top" alt="Image...">
                        <div veza="${element.login}" class="card-body">
                            <h5 veza="${element.login}" class="card-title" id="username">${element.login}</h5>
                        </div>
                    </div>
                </div>`;

                cardBox.innerHTML += cardBoxHTML;
            });
        }

    }

}


/* Function for search user */
const searchUser = (e) => {

    if (e.keyCode === 13) {
        const xml = new XMLHttpRequest();

        xml.open("GET", `${user_url}${userInput.value}`, true);

        xml.send();

        xml.onreadystatechange = () => {
            try {
                if (xml.readyState === 4 && xml.status === 200) {
                    let user = JSON.parse(xml.responseText);

                    if (user.total_count === 0) {
                        throw new Error("User not found. Try again.");
                    }

                    cardBox.innerHTML = "";
                    reposTable.innerHTML = "";
                    tableTitle.textContent = "";

                    let card =
                        `<div class="col-sm-6 col-md-4 col-lg-3 text-center">
                    <div class="card cardMargin">
                        <img veza="${user.login}" src=${user.avatar_url} class="card-img-top" alt="Image...">
                        <div class="card-body">
                            <h5 veza="${user.login}" class="card-title" id="username">${user.login}</h5>
                        </div>
                    </div>
                </div>`;

                    cardBox.innerHTML += card;
                    userInput.value = "";
                    userInput.style.outline = "none";
                }
            }
            catch (error) {
                alert(error.message);
            }
        }
    }
}


//Proba

const setRepositoryTable = (e) => {
    if (e.target.attributes[0].name === "veza") {
        let userName = `${e.target.attributes[0].value}`
        let userUrl = `${user_url}${userName}`;

        const xml = new XMLHttpRequest();

        xml.open("GET", userUrl, true);

        xml.send();

        xml.onreadystatechange = () => {
            if (xml.readyState === 4 && xml.status === 200) {
                let reposURL = JSON.parse(xml.responseText).repos_url;
                
                xml.open("GET", reposURL, true);

                xml.send();

                xml.onreadystatechange = () => {
                    if (xml.readyState === 4 && xml.status === 200) {
                        let repositorys = JSON.parse(xml.responseText);
                        let userName = repositorys[0].owner.login;
                        cardBox.innerHTML = "";
                        reposTable.innerHTML = `<tr>
                        <th class=" col-3 text-center">Repository name</th>
                        <th class=" col-7 text-center">Repository description</th>
                        <th class=" col-2 text-center">Last commit</th>
                        </tr>`

                        repositorys.forEach(element => {
                            let repositoryName = element.name;
                            let repositoriDescription = element.description;
                            let lastTimeComit = `${element.pushed_at.split("-")[2].slice(0,2)}.${element.pushed_at.split("-")[1]}.${element.pushed_at.split("-")[0]}.`;
                            
                            let reposInfo = 
                            `<tr>
                                <td class="text-center">${repositoryName}</td>
                                <td class="text-center">${repositoriDescription}</td>
                                <td class="text-center">${lastTimeComit}</td>
                            </tr>`;

                            reposTable.innerHTML += reposInfo;
                            tableTitle.textContent = `Repository of ${userName}`;
                            tableTitle.style.display = "block";
                            tableInfo.style.display = "block";
                            cardSec.setAttribute("class", "container cardSection pt-2 cardSectionMargin");
                            
                        });
                    }
                }
            }
        }
    }
}


/*Events*/
page.addEventListener("load", fillingCardBox);
userInput.addEventListener("keypress", searchUser);
cardBox.addEventListener("click", setRepositoryTable);







