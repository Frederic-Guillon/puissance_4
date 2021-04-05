const app = {
    grid : [],
    row : [],
    currentPlayer: 'O',
    
    init: function() {
        app.grid = [
            ['','','','','','',''], 
            ['','','','','','',''], 
            ['','','','','','',''], 
            ['','','','','','',''], 
            ['','','','','','',''], 
            ['','','','','','',''], 
        ];

        app.displayGrid();

        elements = document.getElementsByClassName('column');
        //console.log(elements);            
            
        for (element of elements) {
            element.addEventListener("click",app.handleClickColumn);
        }
    },

    displayLine : function(num_column) {
        //console.log("num_column: " + num_column);

        divRow = document.createElement("div");
        divRow.classList.add("row");

        body = document.querySelector('body');
        body.appendChild(divRow);
        
        let num = 0;
        //for (currentCell of app.grid[num_column]) {
        for (let num_line = 0; num_line < app.grid[num_column].length; num_line++) {
            let currentCell = app.grid[num_column][num_line];
            divEl = document.createElement("div");
            divEl.classList.add("cell");
            divEl.classList.add("position_"+num_column+"_"+num_line);
            divRow.appendChild(divEl);
            divEl.textContent = currentCell;

            if (num_column == 0) {
                divEl.classList.add("column");
                divEl.setAttribute('rel', num++);
            }
        }    
    },
    
    
    displayGrid : function() {
        console.log(app.grid);
        
        for (rowIndex in app.grid) {
            app.displayLine(rowIndex);
        }
    },

    handleClickColumn : function() {
        let num_column = this.getAttribute('rel');
        console.log("num_column: " + num_column);
        let num_line = 5;
        //tant que la cellule sélectionné n'est pas vide et 
        //que le numéro de la ligne est supérieur à zéro alors :
        while (app.grid[num_line][num_column] != "" && num_line > 0) {
            num_line--; //on décrémente de 1 le numéro de la ligne
        }
        //si la ligne est vide alors on rempli avec le jeton du joueur
        if (app.grid[num_line][num_column] == "") {
            app.grid[num_line][num_column] = app.currentPlayer;
            document.querySelector(".position_" + num_line + "_" + num_column).textContent = app.currentPlayer;
            //on regarde si on a un gagnant
            let winner = app.detectWinner(num_line, num_column);
            if (winner) {
                alert(app.currentPlayer + " a gagné !");
            } else {
                app.switchPlayer();
            }
        } else {
            alert("Colonne entièrement remplie. Merci de choisir une autre colonne !");
        }


    },

    switchPlayer: function() {
        if (app.currentPlayer == "O") {
            app.currentPlayer = "X";
        } else {
            app.currentPlayer = "O";
        }
    },
    detectWinner: function(num_line, num_column) {
        //variable nombre d'occurence jeton joueur
        let repeat = 0;
        let valueCellCurrentPlayer = app.currentPlayer;
        let num_line_origin = num_line;
        let num_column_origin = num_column;
        //tant que il n'y a pas 4 occurrences du jeton du joueur courant
        //ET que l'on n'a pas un jeton adverse à côté
        //ET qu'on a pas atteint le bord de la grille du puissance 4 alors :

        //sur la droite
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 1");
            num_column++;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_column < 7 );
        
        //sur la gauche
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        if (repeat < 4) {
            repeat--;
        } else {
            return (repeat >= 4);
        }
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 2");
            num_column--;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_column >= 0 );

        
        repeat = 0;
        //vers le bas
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 3");
            num_line++;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_line < 6 );

        repeat = 0;
        //diagonale haut gauche
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 4");
            num_line--;
            num_column--;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_line >= 0 && num_column >= 0);

        //diagonale bas droite
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        if (repeat < 4) {
            repeat--;
        } else {
            return (repeat >= 4);
        }
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 5");
            num_line++;
            num_column++;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_line < 6 && num_column < 7);
        
        
        
        //diagonale bas gauche
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        if (repeat < 4) {
            repeat = 0;
        } else {
            return (repeat >= 4);
        }
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 6");
            num_line++;
            num_column--;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_line < 6 && num_column >= 0);

        if (repeat < 4) {
            repeat--;
        } else {
            return (repeat >= 4);
        }
        //diagonale haut droite
        num_line = num_line_origin;
        num_column = num_column_origin;
        console.log("num_line:" + num_line);
        console.log("num_column:" + num_column);
        do {
            valueCellCurrentPlayer = document.querySelector(".position_" + num_line + "_" + num_column).innerHTML;
            if (valueCellCurrentPlayer == app.currentPlayer) {
                repeat++;
            }
            console.log("position: " + num_line + "," + num_column + " valeur: " + valueCellCurrentPlayer);
            console.log("repeat: " + repeat + " while 7");
            num_line--;
            num_column++;
        } while (repeat < 4 && valueCellCurrentPlayer == app.currentPlayer && num_line >= 0 && num_column < 7);

        return (repeat >= 4);
    }

}

document.addEventListener('DOMContentLoaded', app.init);