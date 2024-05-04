
import './App.css';
import Khung from './components/KhungCalculator';
import Screen from './components/ScreenCalculator';
import ButtonBox from './components/BtnBoxCalculator';
import Button from './components/ButtonCalculator';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  return (
    <div>
      <Khung>
        <Screen/>
        <ButtonBox>
          {btnValues.flat().map((btn,i)=>
          (<Button
            value={btn}
            key={i}
          />
          ))}
        </ButtonBox>
    </Khung>
    </div>
  );
}

export default App;
