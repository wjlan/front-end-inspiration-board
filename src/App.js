import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board.js';
import CardList from './components/CardList.js';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import axios from 'axios';





function App() {

  const [boardsList, setBoardsList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
    .then((response) => {
      const boardsListCopy = response.data.map((board) => {
        return {
          ...board
        }
      })
      setBoardsList(boardsListCopy);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const onBoardSelect = (()=>{
    console.log("huu")

  }) 

  const boardsComponent = boardsList.map((board) => {
    return (
      <ul>
        <Board board={board} onBoardSelect={onBoardSelect}></Board>
      </ul>
    )
  })


  return (
    <body>
      <div class="container">
        <header>
          <section>
            <h1>SELECTED BOARD</h1>
            <p>Owner Name</p>
          </section>
          <section>
            <h2>Create A New Card</h2>
            <NewCardForm></NewCardForm>
          </section>
        </header>
        <aside>
          <section>
            <h1>Create A New Board</h1>
            <NewBoardForm></NewBoardForm>
          </section>
          <section>
            <h1>Boards</h1>
            {boardsComponent}
          </section>
        </aside>
        <main>
          <div>
            <h1>Cards for Affirmations</h1>
            <CardList></CardList>
          </div>
        </main>
      </div>
    </body>
  );
};

export default App;
