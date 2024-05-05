import { useContext } from "react";
import { CalcContext } from "../Context/CalculatorContext";

const getStyleName = btn => {
    const className = {
      '=': 'equals',
      'x': 'opt',
      '-': 'opt',
      '+': 'opt',
      '/': 'opt',
    }
    return className[btn]
  }
  
const Button = ({ value }) => {
    const { calc, setCalc } = useContext(CalcContext);
  
    // User click comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        });
    }
  
    // User click C
    const resetClick = () => {
        setCalc({ sign: '', num: 0, res: 0 })
    }
  
    // User click number
    const handleClickButton = () => {
        const numberString = value.toString()

        let numberValue;
        if(numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }
  
    // User click operation
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }
  
    // User click equals
    const equalsClick = () => {
        if (calc.res !== null && calc.num !== null && calc.sign) {
            let result;
    
            // Kiểm tra xem calc.sign có phải là một trong các phép toán hợp lệ hay không
            if (calc.sign === '/' && calc.num === 0) {
                // Xử lý trường hợp chia cho 0
                result = "Error";
            } else {
                const math = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                };
    
                // Xử lý trường hợp phép toán trừ giữa hai số âm
                if (calc.sign === '-' && typeof calc.res === 'number' && typeof calc.num === 'number') {
                    result = calc.res + calc.num;
                } else {
                    result = math[calc.sign](calc.res, calc.num);
                }
            }
    
            setCalc({
                res: result,
                sign: '',
                num: 0
            });
        }
    }
  
    // User click percent
    const persenClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }
  
    // User click invert button
    const invertClick = () => {
        setCalc({
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: ''
        })
    }
  
    const handleBtnClick = () => {
        const results = {
            '.': commaClick,
            'C': resetClick,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick,
            '%': persenClick,
            '+-': invertClick
        }
        if (results[value]) {
            return results[value]()
        } else {
            return handleClickButton()
        }
    }
  
    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
    );
}

export default Button;
