const express = require('express');
const cors = require('cors');
const { Router } = require('express');

const app = express();
const routes = Router();

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)


routes.get('/', oneTurn);


const state = {
    Players: {},
    Deck : {
        size: 40,
        Cards: [ {naipe:"heart", type: "A"}, {naipe:"heart", type:"2"}, {naipe:"heart", type:"3"}, {naipe:"heart", type:"4"}, {naipe:"heart", type:"5"}, {naipe:"heart", type: "6"}, {naipe:"heart", type:"7"}, {naipe:"heart", type:"Q"}, {naipe:"heart", type:"J"}, {naipe:"heart", type:"K"}]
    }
}

state.Players["player1"] = {
    Cards: []
}
state.Players["player2"] = {
    Cards: []
}



function pickUpCard(playerId, response) {
    //Deck.Cards = Deck.Cards.sort()
    // randomCard = Math.floor(Math.random() * state.Deck.Cards.length)
    // console.log(randomCard)
    // var removedItem = state.Deck.Cards.splice(randomCard, 1)
    // state.Players[playerId].Cards.push(removedItem)
    // console.log(state.Deck.Cards)
    // console.log(state.Players[playerId].Cards)
    // return state.Players[playerId].Cards
    randomCard = Math.floor(Math.random() * state.Deck.Cards.length)
    var removedItem = state.Deck.Cards.splice(randomCard, 1)
    console.log(state.Deck.Cards)
    return removedItem
}

async function oneTurn(request, response) {
    // console.log(state.Players["player1"].Cards)
    // state.Players["player1"].Cards = pickUpCard("player1")
    // console.log(state.Players["player1"].Cards)
    // state.Players["player2"].Cards = pickUpCard("player2")
    // console.log(state.Players["player2"].Cards)

    state.Players["player1"].Cards.push(pickUpCard())
    console.log(state.Players["player1"].Cards[0])
    state.Players["player2"].Cards.push(pickUpCard())
    console.log(state.Players["player2"].Cards[0])
    

    one = numberCards(state.Players["player1"].Cards[0][0].type)
    console.log(`carta do numero 1 ${one}`)
    two = numberCards(state.Players["player2"].Cards[0][0].type)
    console.log(`carta do numero 2 ${two}`)

    if (two > one) {
        winner = 'Player 2'
    }
    if (one > two) {
        winner = 'Player 1'
    }
    if (one == two) {
        winner = 'Empate'
    }

    return response.json(winner)
}


function numberCards(type) {
    switch(type) {
        case 'A':
          return 7
          break;
        case '2':
          return 8
          break;
        case '3':
          return 9
          break;
        case '4':
          return 0
          break;
        case '5':
          return 1
          break;
        case '6':
          return 2
          break;
        case '7':
          return 3
          break;
        case 'Q':
          return 4
          break;
        case 'J':
          return 5
          break;
        case 'K':
          return 6
          break;
    
        default:
          return 100
      }
}