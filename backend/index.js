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
        Cards: [ {naipe:"heart", type: "A"}, {naipe:"heart", type:"2"}, {naipe:"heart", type:"3"}, {naipe:"heart", type:"4"}, {naipe:"heart", type:"5"}, {naipe:"heart", type: "6"}, {naipe:"heart", type:"7"}, {naipe:"heart", type:"Q"}, {naipe:"heart", type:"J"}, {naipe:"heart", type:"K"},
                {naipe:"spades", type: "A"}, {naipe:"spades", type:"2"}, {naipe:"spades", type:"3"}, {naipe:"spades", type:"4"}, {naipe:"spades", type:"5"}, {naipe:"spades", type: "6"}, {naipe:"spades", type:"7"}, {naipe:"spades", type:"Q"}, {naipe:"spades", type:"J"}, {naipe:"spades", type:"K"},
                {naipe:"diamonds", type: "A"}, {naipe:"diamonds", type:"2"}, {naipe:"diamonds", type:"3"}, {naipe:"diamonds", type:"4"}, {naipe:"diamonds", type:"5"}, {naipe:"diamonds", type: "6"}, {naipe:"diamonds", type:"7"}, {naipe:"diamonds", type:"Q"}, {naipe:"diamonds", type:"J"}, {naipe:"diamonds", type:"K"},
                {naipe:"clubs", type: "A"}, {naipe:"clubs", type:"2"}, {naipe:"clubs", type:"3"}, {naipe:"clubs", type:"4"}, {naipe:"clubs", type:"5"}, {naipe:"clubs", type: "6"}, {naipe:"clubs", type:"7"}, {naipe:"clubs", type:"Q"}, {naipe:"clubs", type:"J"}, {naipe:"clubs", type:"K"}]
    }
}

state.Players["player1"] = {
    Cards: [],
    score: 0
}
state.Players["player2"] = {
    Cards: [],
    score: 0
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

    one = pickUpCard()
    two = pickUpCard()


    state.Players["player1"].Cards.push(one[0])
    console.log(state.Players["player1"].Cards)
    state.Players["player2"].Cards.push(two[0])
    console.log(state.Players["player2"].Cards)
    

    one_number = numberCards(one[0].type)
    console.log(`carta do numero 1: ${one_number}`)
    two_number = numberCards(two[0].type)
    console.log(`carta do numero 2: ${two_number}`)

    if (two_number > one_number) {
        winner = 'Player 2'
        state.Players['player2'].score += 1

    }
    if (one_number > two_number) {
        winner = 'Player 1'
        state.Players['player1'].score += 1
    }
    if (one_number == two_number) {
        winner = 'Empate'
    }

    console.log(`Player 1 tem ${state.Players['player1'].score} pontos.`)
    console.log(`Player 2 tem ${state.Players['player2'].score} pontos.`)

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