class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {

    //all sudoku file's characters to myArray
    const myArray = sudoku.split("");

    //function to check if a character is numeric
    function isNumber(char) {
      if (typeof char !== 'string') {
        return false;
      }
      if (char.trim() === '') {
        return false;
      }
      return !isNaN(char);
    }    

    //all numeric charaters from myArray to NumArr
    var NumArr = [];
    var c=0;
    for(let n=0; n<=myArray.length; n++){
      if(isNumber(myArray[n])){
        NumArr[c]=myArray[n];
        c++;
      }
    }

    //a boolean to determine if sudoku field has zeroes
    var incomplete = false;

    //a function to check if a given array has duplicate values
    function checkDupe(array){
      for(let i=0; i<9; i++){
        let ar=[0,0,0,0,0,0,0,0,0,0,0]; //e.g. ar[4]==0 if there are no "4"-s in subgroup[i], 1 or more otherwise
        for(let j=0; j<=9; j++){
          let curInt = array[i][j];
          ar[curInt]++;
        }
        for (let j=1; j<=9; j++){
          if (ar[j]>=2){
            return true;
          }
        }
      }
    }


    //check subgroup duplicates (and zeroes)
    var subgroup = [[],[],[],[],[],[],[],[],[]];

    for(let i=0; i<=80; i++){
      if(NumArr[i]==0){
        incomplete = true;
      }
      let formula = Math.floor(i/27)*3+Math.floor((i%9)/3); //a formula to determine which (0-8) block the number belongs to
      subgroup[formula].push(NumArr[i]);
    }
    if(checkDupe(subgroup)){
      return "Sudoku is invalid."
    }

    //check column duplicates
    var subgroup = [[],[],[],[],[],[],[],[],[]];

    for(let i=0; i<=80; i++){
      let formula = i%9; //a formula to determine which (0-8) column the number belongs to
      subgroup[formula].push(NumArr[i]);
    }
    if(checkDupe(subgroup)){
      return "Sudoku is invalid."
    }

    //check row duplicates
    var subgroup = [[],[],[],[],[],[],[],[],[]];

    for(let i=0; i<=80; i++){
      let formula = Math.floor(i/9); //a formula to determine which (0-8) row the number belongs to
      subgroup[formula].push(NumArr[i]);
    }
    if(checkDupe(subgroup)){
      return "Sudoku is invalid."
    }

    //result if no invalids
    if(incomplete==true){
      return "Sudoku is valid but incomplete.";
    }
    else return "Sudoku is valid.";

  }
}

module.exports = Validator
