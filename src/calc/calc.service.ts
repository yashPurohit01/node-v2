import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';
import { error } from 'console';

@Injectable()
export class CalcService {
    
  calculateExpression(calcBody: CalcDto) {

    const { expression } = calcBody

    function isDigit(value:string) {
      return value >= '0' && value <= '9';
  }
  
  function isOperator(value:string) {
      return ['+', '-', '*', '/'].includes(value);
  }

      let expressionEvaluation = [];
      let currentValue = '';
  
      // Iterate through each character in the expression
      for (let i = 0; i < expression.length; i++) {
          let char = expression[i];
  
          // If the character is a digit or a dot (for decimals), add it to the current token
          if (isDigit(char) || char === '.') {
              currentValue += char;
          } else if (isOperator(char)) {
              // If the character is an operator, push the current token (if any) and the operator to the expressionEvaluation array
              if (currentValue !== '') {
                  expressionEvaluation.push(parseFloat(currentValue));
                  currentValue = '';
              }
              expressionEvaluation.push(char);
          } else if (char !== ' ') {
              // If the character is not a digit, operator, or space, return an error for invalid characters
              return "Invalid character: " + char;
          }
      }
  
      // Push the last token to the expressionEvaluation array
      if (currentValue !== '') {
          expressionEvaluation.push(parseFloat(currentValue));
      }
  
      // Error handling if the expression is empty or starts/ends with an operator
      if (expressionEvaluation.length === 0 || isOperator(expressionEvaluation[0]) || isOperator(expressionEvaluation[expressionEvaluation.length - 1])) {
        throw new HttpException({
          statusCode:400,
          message:"Invalid expression provided",
          error:"Bad Request"
        },HttpStatus.BAD_REQUEST);
      }
  
      // Perform the calculation
      let result = expressionEvaluation[0];
      for (let i = 1; i < expressionEvaluation.length; i += 2) {
          let operator = expressionEvaluation[i];
          let operand = expressionEvaluation[i + 1];
  
          switch (operator) {
              case '+':
                  result += operand;
                  break;
              case '-':
                  result -= operand;
                  break;
              case '*':
                  result *= operand;
                  break;
              case '/':
                  if (operand === 0) {
                      return "Division by zero error";
                  }
                  result /= operand;
                  break;
              default:
                  return "Invalid operator";
          }
      }

    return {result}


  }
}
