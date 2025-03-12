class Card {
    constructor(value, suit){
        this.value = value
        this.suit = suit
    }
}

function make_deck(){
    const suits = ['heart', 'diamonds', 'spades', 'clubs']
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

function print_cards(cards){
    for (const i of cards) {
        console.log(i.value + " of " + i.suit);
    }
    console.log(get_total(cards))
    console.log('----------------------------')
}

function deal(shuffledDeck){
    const player_hand = []
    const dealer_hand = []

    player_hand.push(shuffledDeck.shift())
    dealer_hand.push(shuffledDeck.shift())
    player_hand.push(shuffledDeck.shift())
    dealer_hand.push(shuffledDeck.shift())

    console.log("Player's Hand:")
    print_cards(player_hand)

    if(get_total(dealer_hand) == 21){
        console.log("Player's Hand:")
        print_cards(player_hand)
        console.log("Dealer's Hand:")
        print_cards(dealer_hand)

        if(get_total(player_hand) == 21){
            console.log("Tie")
            
            
        }
        
        else{
            console.log("Player Loses")
            
        }
    }

    if(get_total(player_hand) ==  21){
        console.log("Dealer's Hand:")
        print_cards(dealer_hand)

        if(get_total(dealer_hand) == 21){
            console.log("Tie")
            
        }
        else{
            console.log("Player Wins!")
            
        }
    }
    else{
        console.log("Dealer's Hand:")
        console.log("Hidden")
        console.log(dealer_hand[1].value + " of " + dealer_hand[1].suit)
        console.log('----------------------------')
    }
    return [player_hand, dealer_hand]
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

function hit(player_hand, dealer_hand, shuffled_deck){
    let total = 0

    player_hand.push(shuffled_deck.shift())

    console.log("Player's Hand:")
    print_cards(player_hand)
    total = get_total(player_hand)

    if (total > 21){
        total = get_total(player_hand)
        console.log("Total Value:", total)
        console.log("BUST")
        console.log("Player Loses")

    }

    console.log("Total Value: ",total)
    console.log('--------------------------')
    console.log("Dealer's Hand:")
    console.log("Hidden")
    console.log(dealer_hand[1].value + " of " + dealer_hand[1].suit)
    console.log('----------------------------')
}

function stay(player_hand, dealer_hand, shuffled_deck){

    let player_total = get_total(player_hand)
    let dealer_total = get_total(dealer_hand)

    console.log("Player's Hand:")
    print_cards(player_hand)
    console.log("Dealer's Hand:")
    print_cards(dealer_hand)

    if(dealer_total >= 17){
        if(player_total > dealer_total){
            console.log("Player Wins!")
            
        }
        else if(player_total==dealer_total){
            console.log("Tie")
            
        }
        else{
            console.log("Player Loses")
            
        }
    }
    while(dealer_total < 17){
        dealer_hand.push(shuffled_deck.shift())
        dealer_total = get_total(dealer_hand)

        console.log("Player's Hand:")
        print_cards(player_hand)
        console.log("Dealer's Hand:")
        print_cards(dealer_hand)
    }

    if(dealer_total > 21){
        console.log("Dealer Busts")
        console.log("Player Wins!")
        
    }
    else if(player_total > dealer_total){
        console.log("Player Wins!")
        
    }
    else if(player_total==dealer_total){
        console.log("Tie")
        
    }
    else{
        console.log("Player Loses")
        
    }
}

function resetGame(){

    document.getElementById('player-hand').textContent=""
    document.getElementById('player-total').textContent=""
    document.getElementById('dealer-hand-1').textContent=""
    document.getElementById('dealer-hand-2').textContent=""
    document.getElementById('dealer-hand').textContent=""
    document.getElementById('dealer-total').textContent=""


} 