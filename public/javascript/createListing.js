async function createListing() {
    let username = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;
    let item = document.getElementById("inputItem").value;

    let category = document.getElementById("inputCategory").value;

    let description = document.getElementById("inputDescription").value;
    let price = document.getElementById("inputPrice").value;

    let image = document.getElementById("inputImages").value;

    const listingData = {
        username: username,
        email: email,
        item: item,
        category: category,
        description: description,
        price: price
    }

    fetch("http://localhost:3030/post-listing", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listingData
        }),
    })
        .then(response => response.json())
        .then(data => { })
}
