const wordEl = document.getElementById("word");
const specEl = document.getElementById("specification");
const imageEl = document.getElementById("image-people");
const btnNewUser = document.getElementById("btn-new-user");
const menuItems = document.querySelectorAll(".list-menu li");

let currentUser = null;


const infoMap = {
    name: user => ({
        title: "Hi, my name is",
        value: `${user.name.first} ${user.name.last}`
    }),
    email: user => ({
        title: "My email address is",
        value: user.email
    }),
    birthday: user => ({
        title: "My birthday is",
        value: new Date(user.dob.date).toLocaleDateString("pt-BR")
    }),
    address: user => ({
        title: "My address is",
        value: `${user.location.street.number} ${user.location.street.name}`
    }),
    phone: user => ({
        title: "My phone number is",
        value: user.cell
    }),
    password: user => ({
        title: "My password is",
        value: user.login.password
    })
};


function updateInfo(type) {
    const data = infoMap[type](currentUser);
    wordEl.innerText = data.title;
    specEl.innerText = data.value;
}

async function fetchRandomUser() {
    wordEl.innerText = "Loading...";
    specEl.innerText = "Loading...";

    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        currentUser = data.results[0];

        imageEl.src = currentUser.picture.large;

       
        updateInfo("name");

    } catch (error) {
        wordEl.innerText = "Error loading user";
        specEl.innerText = "";
        console.error(error);
    }
}


menuItems.forEach(item => {
    const type = item.dataset.info;

    item.addEventListener("mouseenter", () => {
        if (currentUser) updateInfo(type);
    });
});


btnNewUser.addEventListener("click", fetchRandomUser);


fetchRandomUser();
