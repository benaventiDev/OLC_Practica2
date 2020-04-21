

class Lexer {
    source;
    size;
    currentPos;
    lineCounter;
    colCounter;



    Analyze(sourceText) {
        this.source = sourceText + "\0";
        this.size = this.source.length;
        this.currentPos = 0;
        this.lineCounter = 1;
        this.colCounter = 0;

    }

    constructor() {}




    LexerTest() {
        let a = "abb";
        let b = "abc";
        if (a === b) {
            console.log("Equal");
        } else {
            console.log("Not equal");
        }

    }

    getNextToken(){
        let token = this.processNextToken();
        return token;
    }


    processNextToken() {
        let lexeme = "";
        let char;
        let initColCounter = 0;
        let state = 0;
        while (currentPos < size) {
            char = source[currentPos];

            switch (state) {
                case 0:
                    if (char === ">") {// ***
                        state = 24; lexeme += char;
                    } else if (char === "<") {// ***
                        state = 22; lexeme += char;
                    } else if (char === ">") {// ***
                        state = 24;  lexeme += char;
                    } else if (char === "=") {// ***
                        state = 28; lexeme += char;
                    } else if (char === "!") {// ***
                        state = 26; lexeme += char;
                    } else if (char === "&") {// ***
                        state = 20; lexeme += char;
                    } else if (char === "|") {// ***
                        state = 30; lexeme += char;
                    } else if (char === "+") {// ***
                        state = 32; lexeme += char;
                    } else if (char === "-") {// ***
                        state = 34; lexeme += char;
                    } else if (char === "*") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.TIMES);
                    } else if (char === "/") { // ***
                        state = 2;  lexeme += char;
                    } else if (char === "{") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.OPEN_CURLY_BRACES);
                    } else if (char === "}") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.CLOSE_CURLY_BRACES);
                    } else if (char === "(") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.OPEN_PARENTHESIS);
                    } else if (char === ")") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.CLOSE_PARENTHESIS);
                    } else if (char === ",") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.COMMA);
                    } else if (char === ".") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.DOT);
                    } else if (char === ";") {
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.SEMI_COLON);
                    } else if (isNumber(char)) { // ***
                        state = 12; lexeme += char;
                    } else if (char === "_") {// ***
                        state = 14; lexeme += char;
                    } else if(isLetter(char)){ // ***
                        state = 14; lexeme += char;
                    } else if (char === "\"") { // ***
                        state = 9; lexeme += char;
                    } else if (char === "\0") {
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.EOF);
                    } else if(char === '\n'){
                        this.colCounter = 0; this.currentPos++; this.lineCounter++;
                        continue;
                    }else if (isBlank(char)) {
                        // DO Nothing
                    }else{
                        lexeme += char;
                        //TODO: Error state = ?
                    }
                    this.colCounter++;this.currentPos++;
                    initColCounter++;
                    break;
                case 1:
                    //Empty state
                    break;
                case 2:
                    if(char === '/'){
                        state = 3;
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                    }else if(char === '*'){
                        state = 5;
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                    }else{
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        //Error
                    }
                    break;
                case 3:
                    if(char === '\n'){
                        state = 0;
                        lexeme = "";
                        this.colCounter = 0; this.currentPos++; this.lineCounter++; // Success case end of comment
                    } else if(char === '\0'){
                        return null;
                    } else{
                        this.colCounter++; this.currentPos++;
                        lexeme += char; //TODO: esto se puede eliminar
                    }
                    break;
                case 4:
                    //Empty state
                    break;
                case 5:
                    if(char === '\n'){
                        lexeme += char; //TODO: esto se puede eliminar
                        this.colCounter = 0; this.currentPos++; this.lineCounter++;
                    }else if(char === "*"){
                        lexeme += char; //TODO: esto se puede eliminar
                        this.colCounter++;this.currentPos++;
                        state = 7;
                    } else if(char === '\0'){
                        //TODO: error EOF reached comment unclosed
                    } else {
                        lexeme += char; //TODO: esto se puede eliminar
                        this.colCounter++;this.currentPos++;
                    }
                    break;
                case 6:
                    //Empty state
                    break;
                case 7:
                    if(char === '/'){
                        state = 0;
                        lexeme = "";
                        this.colCounter++;this.currentPos++; // Success case end of comment
                    }else{
                        state = 5;
                    }
                    break;
                case 8:
                    //empty state
                    break;
                case 9:
                    if(char === '\"'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++; return new Token(lexeme, this.lineCounter, initColCounter, Type.STRING);
                    }else if(char === '\n'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        //TODO: error
                    }else if(char === '\0'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        //TODO: return null with error
                    }else {
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                    }
                    break;
                case 10:
                    //empty state
                    break;
                case 11:
                    //empty state
                    break;
                case 12:
                    if(isNumber(char)){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.NUMBER);
                    }
                    break;
                case 13:
                    //empty state
                    break;
                case 14:
                    if(isLetter(char) || char === '_'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.ID);
                    }
                    break;
                case 15:
//empty state
                    break;
                case 16:
//empty state
                    break;
                case 17:
//empty state
                    break;
                case 18:
//empty state
                    break;
                case 19:
//empty state
                    break;
                case 20:
                    if(char === '&'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.AND);
                    }else{
                        //TODO: error
                    }
                    break;
                case 21:
//empty state
                    break;
                case 22:
                    if(char === '='){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.LESS_EQUAL);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.LESS_THAN);
                    }
                case 23:
//empty state
                    break;
                case 24:
                    if(char === '='){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.GREATER_EQUAL);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.GREATER_THAN);
                    }

                case 25:
//empty state
                    break;
                case 26:
                    if(char === '='){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.NOT_EQUAL);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.NOT);
                    }


                case 27:
//empty state
                    break;
                case 28:
                    if(char === '='){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.COMPARISON);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.ASSIGNATION);
                    }

                case 29:

                    break;
                case 30:
                    if(char === '|'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.OR);
                    }else{
                        //TODO: error
                    }
                    break;
                case 31:
                    if(char === '+'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.INCREMENTO);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.PLUS);
                    }
                case 32:

                    break;
                case 34:
                    if(char === '-'){
                        lexeme += char;
                        this.colCounter++;this.currentPos++;
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.DECREMENTO);
                    }else{
                        return new Token(lexeme, this.lineCounter, initColCounter, Type.MINUS);
                    }
                case 35:

                    break;
                case 36:

                    break;
                case 37:

                    break;

                default:

            }
            
        }
        return null;
    }
}


function isNumber(str){
    return str.length === 1 && str.match(/[0-9]/i);
}
function isLetter(str){
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

function isBlank(str){
    if(str === ""){
        return true
    }
    //TODO check if is number return true
}

//ici2

class Token {
    lexeme;
    row;
    column;
    type;
    state;

    constructor(lexeme, row, column, type) {
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
        this.type = type;
    }
    
}




let Type = {
    OPEN_CURLY_BRACES: 1, CLOSE_CURLY_BRACES: 2, OPEN_PARENTHESIS: 3, CLOSE_PARENTHESIS: 4,
    INT: 5, DOUBLE: 6, CHAR: 7, BOOL: 8, STRING_TYPE: 9,
    PLUS: 10, MINUS: 11, TIMES: 12, DIVISION: 13,  ASSIGNATION: 14,
    VOID: 15, CONSOLE: 16, WRITE:  17,
    GREATER_THAN: 18, GREATER_EQUAL: 19, LESS_THAN: 20, LESS_EQUAL: 21, COMPARISON: 22, NOT: 23, NOT_EQUAL: 24, OR: 25, AND: 26,
    IF: 27, SWITCH: 28, CASE: 29, BREAK: 30, DEFAULT: 31, FOR: 32, INCREMENTO: 33, DECREMENTO: 34, WHILE: 35, DO: 36, CONTINUE: 37,
    COMMA: 38, COLON: 39, SEMI_COLON: 40, ID: 41, STRING: 42, NUMBER: 43, ERROR: 44, COMMENT: 45, MAIN: 46, RETURN: 47,
     EOF: 48, DOT: 49

}

<!--ici-->




