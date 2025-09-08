 const prices = document.getElementsByClassName("takaAD").innerText
    const addedPrice = document.getElementById("taka").innerText
    const totalPrice = Number(price + addedPrice)
    addedPrice = totalPrice.innerText



    const addedPrice = Number(document.getElementById("taka").innerText) || 0;
    const totalPrice = addedPrice + Number(price);
    document.getElementById("taka").innerText = totalPrice;