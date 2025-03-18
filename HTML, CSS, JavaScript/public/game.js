class Card {
    constructor(value, suit){
        this.value = value
        this.suit = suit
    }
}

function make_deck(){
    const suits = ['hearts', 'diamonds', 'spades', 'clubs']
    const face_values = ['ace', 'jack', 'queen', 'king']

    const deck = []
    for(let i = 0; i<suits.length; i++){
        deck.push(new Card(face_values[0],suits[i]))
    }

    for(let i = 2; i<=10; i++){
        for(let j = 0; j<face_values.length; j++){
            deck.push(new Card(i,suits[j]))
        }
    }

    for(let i = 1; i<face_values.length; i++){
        for(let j = 0; j<suits.length; j++){
            deck.push(new Card(face_values[i],suits[j]))
        }
    }

    return deck
}

function shuffle_deck(deck) {
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    return shuffledDeck;
}

function get_total(cards){
    let total = 0
    let ace_count = 0

    for(let i of cards){
        if(typeof i.value == "number"){
            total+= i.value
        }
        else if (i.value != 'ace'){
            total+=10
        }
        else{
            total+= 11
            ace_count++
        }
        
    }

    while (total > 21 && ace_count>0){
        total -= 10
        ace_count -= 1
    }

    return total 
}

//---------------------------------------------------------//

let player_hand = []
let dealer_hand = []
let shuffledDeck = []

//---------------------------------------------------------//

function resetBtns() {
    document.getElementById('dealButton').disabled = false
    document.getElementById('hitButton').disabled = true
    document.getElementById('stayButton').disabled = true
}

function clearDealerText(){
    document.getElementById('dealer-hand').textContent = "";
    document.getElementById('dealer-total').textContent = "";
}

function clearPlayerText(){
    document.getElementById('player-hand').textContent = "";
    document.getElementById('player-total').textContent = "";
    document.getElementById("player-status").textContent = "";
}

function clearText() {
    clearPlayerText()
    clearDealerText()
}

function showCards(hand, cards_id, total_id){
    hand.forEach(card => {
        const cardElement = document.createElement("img")
        cardElement.src = "/assets/"+card['value']+'_of_'+card['suit']+".svg"
        document.getElementById(cards_id).appendChild(cardElement)
    });
    document.getElementById(total_id).textContent = "Total: "+get_total(hand)
}

function deal(){
    const deck = make_deck();
    shuffledDeck = shuffle_deck(deck);
    dealer_hand = []
    player_hand = []
    clearText()

    console.log("Number of Cards Before Deal: ",shuffledDeck.length)

    player_hand.push(shuffledDeck.shift())
    dealer_hand.push(shuffledDeck.shift())
    player_hand.push(shuffledDeck.shift())
    dealer_hand.push(shuffledDeck.shift())


    showCards(player_hand, "player-hand", "player-total")
    showCards(dealer_hand, "dealer-hand", "dealer-total")

    const container = document.getElementById("dealer-hand");
    const firstImg = container.querySelector("img");     

    const newImg = document.createElement("img");
    newImg.src = "assets/back_of_card.svg";

    container.replaceChild(newImg, firstImg); 

    document.getElementById("dealer-total").textContent = ""
    
    if(get_total(player_hand) == 21 && get_total(dealer_hand) != 21){
        clearDealerText()
        showCards(dealer_hand, "dealer-hand", "dealer-total")
        document.getElementById("player-status").textContent = "Player Wins."
        resetBtns()
    }
    else if(get_total(player_hand) == 21 && get_total(dealer_hand) == 21){
        clearDealerText()
        showCards(dealer_hand, "dealer-hand", "dealer-total")
        document.getElementById("player-status").textContent = "Tie."
        resetBtns()
    }
    else if(get_total(player_hand) != 21 && get_total(dealer_hand) == 21){
        clearDealerText()
        showCards(dealer_hand, "dealer-hand", "dealer-total")
        document.getElementById("player-status").textContent = "Dealer Wins."
        resetBtns()
    }
    else {
        document.getElementById('dealButton').disabled = true
        document.getElementById('hitButton').disabled = false
        document.getElementById('stayButton').disabled = false
    }

    console.log("Number of Cards After Deal: ",shuffledDeck.length)

}

function hit(){
    console.log("Number of Cards Before Hit: ",shuffledDeck.length)

    clearPlayerText()
    player_hand.push(shuffledDeck.shift())

    showCards(player_hand, "player-hand", "player-total")

    if(get_total(player_hand) > 21){
        document.getElementById("player-status").textContent = "Player Busts. Dealer Wins."
        resetBtns()
    }
    console.log("Number of Cards After Hit: ",shuffledDeck.length)

}

function stay(){
    console.log("Number of Cards Before Stay: ",shuffledDeck.length)


    let dealer_total = get_total(dealer_hand)
    let player_total = get_total(player_hand)


    clearDealerText()

    showCards(dealer_hand, "dealer-hand", "dealer-total")

    while(dealer_total < 17){
        dealer_hand.push(shuffledDeck.shift())
        dealer_total = get_total(dealer_hand)
        
        clearDealerText()
        showCards(dealer_hand, "dealer-hand", "dealer-total")
    }

    if(dealer_total > 21){
        document.getElementById("player-status").textContent = "Dealer Busts. Player Wins."
        resetBtns()
    }
    else if(dealer_total > player_total){
        document.getElementById("player-status").textContent = "Dealer Wins."
        resetBtns()
    }
    else if(dealer_total == player_total){
        document.getElementById("player-status").textContent =  "Tie."
        resetBtns()
    }
    else{
        document.getElementById("player-status").textContent =  "Player Wins."
        resetBtns()
    }

    console.log("Number of Cards After Stay: ",shuffledDeck.length)

}

