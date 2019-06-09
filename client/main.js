const renderUser = user => {
    return `
        <div>
            <p>Id: ${user.student_id}</p>
            <p>Name: ${user.name}</p>
        </div>
    `;
};

const renderUsers = users => users.map(user => renderUser(user)).join("");

fetch("/users")
    .then(res => res.json())
    .then(data => {
        document.getElementById("users").innerHTML += renderUsers(data);
    })
    .catch(e => console.log(e));

const form = document.getElementById("form");
form.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const dataToSubmit = { name };
    await fetch("/users", {
        method: "POST",
        body: JSON.stringify(dataToSubmit),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await fetch("/users");
    const data = await res.json();
    document.getElementById("users").innerHTML = renderUsers(data);
});