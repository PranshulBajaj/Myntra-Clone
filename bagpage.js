const CONVENIENCE_FEES = 99;
let bagItemObjs;

onLoad();
function onLoad(){
    loadBagItemsObjs();
    displayBagItems();
    displayPriceContainer();
    displayBagCount();
}

function loadBagItemsObjs(){
    bagItemObjs=bagItems.map(itemID=>{
        for(let i=0;i<items.length;i++){
            if(itemID==items[i].id){
                return items[i];
            }
        }
    })
}

function displayBagItems(){
    let bagPageItemsElement = document.querySelector('.bagItems');
    let bagInnerHtml=``;
    bagItemObjs.forEach(item => {bagInnerHtml+=generateItemHtml(item)});
    bagPageItemsElement.innerHTML=bagInnerHtml;
}

function removeBagItem(removeItemId){
    bagItems=bagItems.filter(itemID=> itemID!==removeItemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    onLoad();
}

function generateItemHtml(item){
       return `
       <div class="bagItemContainer">
            <div class="leftPart">
                <img class="bag-item-img" src="${item.image}" alt="item_img">
            </div>
            <div class="rightPart">
                <div class="bag-item-company">${item.company}</div>
                <div class="bag-item-name">${item.item_name}</div>
                <div class="bag-item-price">
                    <span class="current-price">₹${item.current_price}</span>
                    <span class="original-price">₹${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% off)</span>
                </div>
                <div class="bag-item-return-period">
                    <span class="return-time">${item.return_period} days</span> return available
                </div>
                <div class="bag-item-delivery-period">
                    Delivery by <span class="delivery-period">${item.delivery_date}</span> 
                </div>
            </div>
            <div class="remove-bag-item">
                <button class="material-symbols-outlined" onclick="removeBagItem('${item.id}')">delete</button>
            </div>
        </div>
        `;
    
}

function displayPriceContainer(){
    let priceContainerElement = document.querySelector('.priceCalculation');
    let noOfItems=bagItems.length;
    let totalAmount=0;
    let TotalDiscount=0;
    bagItemObjs.forEach(item => totalAmount+=item.original_price );
    bagItemObjs.forEach(item => TotalDiscount+=(item.original_price-item.current_price) );

    let totalMRP=totalAmount-TotalDiscount+CONVENIENCE_FEES;
    let priceInnerHtml=`
    <div class="heading">PRICE DETAILS(${noOfItems} Items) </div>
                    <div class="totalMRP">
                        <span class="left">Total MRP</span>
                        <span class="right">Rs ${totalAmount}</span>
                    </div>
                    <div class="TotalDiscount">
                        <span class="left">Discount on MRP</span>
                        <span class="right">- Rs ${TotalDiscount}</span>
                    </div>
                    <div class="convenienceFee">
                        <span class="left">Convenience Fee</span>
                        <span class="right">Rs ${CONVENIENCE_FEES}</span>
                    </div>
                    <hr>
                    <div class="totalAmount">
                        <span class="left">Total Amount</span>
                        <span class="right">Rs ${totalMRP}</span>
                    </div>
                    <button class="place-order">Place Order</button>
    `;

    priceContainerElement.innerHTML=priceInnerHtml;
}

