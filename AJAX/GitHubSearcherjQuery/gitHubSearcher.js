
/*Variables*/
const userInput = $("#userInputID");
const cardBox = $("#cardBoxID");
const all_users_url = "https://api.github.com/users";
const user_url = "https://api.github.com/users/";
const page = $("document");
const body = $("body");
const tableInfo = $("#tableInfo");
const tableTitle = $("#tableTitle");
const reposeTable = $("#reposTable");
const cardSec = $("#cardSec");

/*Function for filling cardBox*/
let request = $.ajax({
    url: all_users_url,
    method: "GET",
});

request.done(function (objects) {

    reposeTable.empty();
    tableTitle.empty();

    $(objects).each(function (index, element) {

        let cardBoxHTML =
            `<div class="col-sm-6 col-md-4 col-lg-3 text-center">
            <div class="card cardMargin">
                <img veza="${element.login}" src=${element.avatar_url} class="card-img-top" alt="Image...">
                <div veza="${element.login}" class="card-body">
                    <h5 veza="${element.login}" class="card-title" id="username">${element.login}</h5>
                </div>
            </div>
        </div>`;

        cardBox.append(cardBoxHTML);
    });
});

request.fail(function (errorData) {
    console.log(errorData.status);
});



/* Function for search user */
userInput.keypress(function (e) {

    if (e.originalEvent.keyCode === 13) {

        let request1 = $.ajax({
            url: `${user_url}${userInput.val()}`,
            method: "GET",
        });

        request1.done(function (objects) {
            tableTitle.empty();
            reposeTable.empty();
            
            let cardBoxHTML =
                `<div class="col-sm-6 col-md-4 col-lg-3 text-center">
                <div class="card cardMargin">
                    <img veza="${objects.login}" src=${objects.avatar_url} class="card-img-top" alt="Image...">
                    <div veza="${objects.login}" class="card-body">
                        <h5 veza="${objects.login}" class="card-title" id="username">${objects.login}</h5>
                    </div>
                </div>
            </div>`;

            cardBox.empty();
            cardBox.append(cardBoxHTML);
        });

        request1.fail(function (errorData) {
            alert("User not found. Try again.");
        });
    }
});


/*Function for priview repository table*/
cardBox.on("click", function (e) {
    if (e.target.attributes[0].name === "veza") {

        let userName = `${e.target.attributes[0].value}`
        let userUrl = `${user_url}${userName}`;

        const request2 = $.ajax({
            url: userUrl,
            method: "GET",
        });

        request2.done(function (objects) {
            let repositorysURL = objects.repos_url;

            const userRepositorys = $.ajax({
                url: repositorysURL,
                method: "GET",
            });

            userRepositorys.done(function (repository) {
                cardBox.empty();
                reposeTable.empty();
                reposeTable.append(
                    `<tr>
                        <th class=" col-3 text-center">Repository name</th>
                        <th class=" col-7 text-center">Repository description</th>
                        <th class=" col-2 text-center">Last commit</th>
                    </tr>`);

                $(repository).each(function (index, element) {
                    let repositoryName = element.name;
                    let userName = element.owner.login;
                    let repositoryDescription = element.description;
                    let lastCommit = `${element.pushed_at.split("-")[2].slice(0, 2)}.${element.pushed_at.split("-")[1]}.${element.pushed_at.split("-")[0]}.`;
                   
                    let reposInfo =
                    `<tr>
                        <td class="text-center">${repositoryName}</td>
                        <td class="text-center">${repositoryDescription}</td>
                        <td class="text-center">${lastCommit}</td>
                    </tr>`;

                    reposeTable.append(reposInfo);

                    tableTitle.text(`Repository of ${userName}`);
                    tableTitle.css("display", "block");
                    tableInfo.css("display", "block");

                });
            });

            userRepositorys.fail(function (errorData) {
                console.log(errorData.status);
            });
        });

        request.fail(function (errorData) {
            console.log(errorData.status);
        });
    }
});






// //Proba

// const setRepositoryTable = (e) => {
//     if (e.target.attributes[0].name === "veza") {
//         let userName = `${e.target.attributes[0].value}`
//         let userUrl = `${user_url}${userName}`;

//         const xml = new XMLHttpRequest();

//         xml.open("GET", userUrl, true);

//         xml.send();

//         xml.onreadystatechange = () => {
//             if (xml.readyState === 4 && xml.status === 200) {
//                 let reposURL = JSON.parse(xml.responseText).repos_url;

//                 xml.open("GET", reposURL, true);

//                 xml.send();

//                 xml.onreadystatechange = () => {
//                     if (xml.readyState === 4 && xml.status === 200) {
//                         let repositorys = JSON.parse(xml.responseText);
//                         let userName = repositorys[0].owner.login;
//                         cardBox.innerHTML = "";
//                         reposTable.innerHTML = `<tr>
//                         <th class=" col-3 text-center">Repository name</th>
//                         <th class=" col-7 text-center">Repository description</th>
//                         <th class=" col-2 text-center">Last commit</th>
//                         </tr>`

//                         repositorys.forEach(element => {
//                             let repositoryName = element.name;
//                             let repositoriDescription = element.description;
//                             let lastTimeComit = `${element.pushed_at.split("-")[2].slice(0, 2)}.${element.pushed_at.split("-")[1]}.${element.pushed_at.split("-")[0]}.`;

//                             let reposInfo =
//                                 `<tr>
//                                 <td class="text-center">${repositoryName}</td>
//                                 <td class="text-center">${repositoriDescription}</td>
//                                 <td class="text-center">${lastTimeComit}</td>
//                             </tr>`;

//                             reposTable.innerHTML += reposInfo;
//                             tableTitle.textContent = `Repository of ${userName}`;
//                             tableTitle.style.display = "block";
//                             tableInfo.style.display = "block";
//                             cardSec.setAttribute("class", "container cardSection pt-2 cardSectionMargin");

//                         });
//                     }
//                 }
//             }
//         }
//     }
// }


// /*Events*/
// page.addEventListener("load", fillingCardBox);
// userInput.addEventListener("keypress", searchUser);
// cardBox.addEventListener("click", setRepositoryTable);







