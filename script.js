let bagItems;

onLoad();

function addToBag(itemId, buttonElement) {
    if (!bagItems.includes(itemId)) {
        bagItems.push(itemId);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
        displayBagCount();
    }
    buttonElement.innerHTML = "Go To Bag >";
    buttonElement.onclick = function () {
        window.location.href = "bagpage.html"; 
    };
}

function displayBagCount() {
    let bagCountElement = document.querySelector('.bag_count');
    if (bagItems.length > 0) {
        bagCountElement.innerText = bagItems.length;
        bagCountElement.style.visibility = "visible";
    } else {
        bagCountElement.style.visibility = "hidden";
    }
}

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayMenPageItems();
    displayBagCount();
    updateAlreadyAddedButtons();
}

function displayMenPageItems() {
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) {
        return;
    }

    let innerHtml = ``;
    items.forEach(item => {
        innerHtml += `
        <div class="item-container">
            <div class="img-container">
                <img src="${item.image}" alt="item-img" class="item-img">
                <span class="rating">
                    <div class="stars">${item.rating.stars} ⭐</div>
                    <hr>
                    <div class="review-count">${item.rating.count}</div>
                </span>
            </div>
            <div class="item-name">${item.company}</div>
            <div class="item-desc">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs. ${item.current_price}</span>
                <span class="original-price">Rs. ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="add-to-bag" id="add-to-bag-${item.id}" onclick="addToBag('${item.id}', this)">Add to Bag</button>
        </div>`;
    });

    itemsContainerElement.innerHTML = innerHtml;

}

function updateAlreadyAddedButtons() {
    bagItems.forEach(itemID => {
        let button = document.querySelector(`#add-to-bag-${itemID}`);
        if (button) {
            button.innerHTML = 'Go To Bag >';
            button.onclick = function () {
                window.location.href = 'bagpage.html';
            };
        }
    });
}
