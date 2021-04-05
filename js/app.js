const app = {
    grid : [],
    row : [],
    currentPlayer: 'O',
    winner: false,
    
    init: function() {
        document.querySelector('body').innerHTML = "";
        app.winner = false;
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
            
        for (let element of elements) {
            element.addEventListener("click",app.handleClickColumn);
        }
    },

    displayLine : function(rowIndex) {
        //console.log("rowIndex: " + rowIndex);

        divRow = document.createElement("div");
        divRow.classList.add("row");

        body = document.querySelector('body');
        body.appendChild(divRow);
        
        let num = 0;
        //for (currentCell of app.grid[rowIndex]) {
        for (let num_column = 0; num_column < app.grid[rowIndex].length; num_column++) {
            let currentCell = app.grid[rowIndex][num_column];
            divEl = document.createElement("div");
            divEl.classList.add("cell");
            divEl.classList.add("position_"+rowIndex+"_"+num_column);
            divRow.appendChild(divEl);
            divEl.textContent = currentCell;

            if (rowIndex == 0) {
                divEl.classList.add("column");
                divEl.setAttribute('rel', num++);
            }
        }    
    },
    
    
    displayGrid : function() {
        console.log(app.grid);
        
        for (let rowIndex in app.grid) {
            app.displayLine(rowIndex);
        }
    },

    handleClickColumn : function() {
        let num_column = this.getAttribute('rel');
        console.log("num_column: " + num_column);
        let num_line = 5;

        if (app.winner == false) {
            //tant que la cellule sélectionné n'est pas vide et 
            //que le numéro de la ligne est supérieur à zéro alors :
            while (app.grid[num_line][num_column] != "" && num_line > 0) {
                num_line--; //on décrémente de 1 le numéro de la ligne
            }
            //si la ligne est vide alors on rempli avec le jeton du joueur
            if (app.grid[num_line][num_column] == "") {
                app.grid[num_line][num_column] = app.currentPlayer;
                document.querySelector(".position_" + num_line + "_" + num_column).textContent = app.currentPlayer;
                for (let i = 0; i < app.grid.length; i++) {
                    console.log(app.grid[i]);
                }

                //on regarde si on a un gagnant
                app.winner = app.detectWinner(num_line, num_column);
                if (app.winner) {
                    alert(app.currentPlayer + " a gagné !");
                } else {
                    app.switchPlayer();
                }
            } else {
                alert("Colonne entièrement remplie. Merci de choisir une autre colonne !");
            }
        } else {
            let reponse = confirm("La partie est déjà terminé. Souhaitez en relancer une nouvelle ?");

            if (reponse) {
                app.init();
            }
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
        let data = { valueCellCurrentPlayer: valueCellCurrentPlayer, repeat: repeat, num_line: num_line, num_column: num_column, num_line_origin: num_line_origin, num_column_origin: num_column_origin};
        //tant que il n'y a pas 4 occurrences du jeton du joueur courant
        //ET que l'on n'a pas un jeton adverse à côté
        //ET qu'on a pas atteint le bord de la grille du puissance 4 alors :

        //sur la droite
        do {
            data = app.checkDirection('right', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_column < 7 );
        
        //sur la gauche
        data = app.reinitLineColumn(data);
        if (data.repeat < 4) {
            data.repeat--;
        } else {
            return (data.repeat >= 4);
        }
        do {
            data = app.checkDirection('left', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_column >= 0 );

        
        if (data.repeat < 4) {
            data.repeat = 0;
        } else {
            return (data.repeat >= 4);
        }
        //vers le bas
        data = app.reinitLineColumn(data);
        do {
            data = app.checkDirection('down', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_line < 6 );

        if (data.repeat < 4) {
            data.repeat = 0;
        } else {
            return (data.repeat >= 4);
        }
        //diagonale haut gauche
        data = app.reinitLineColumn(data);
        do {
            data = app.checkDirection('d_up_left', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_line >= 0 && data.num_column >= 0);

        if (data.repeat < 4) {
            data.repeat--;
        } else {
            return (data.repeat >= 4);
        }
        //diagonale bas droite
        data = app.reinitLineColumn(data);
        do {
            data = app.checkDirection('d_down_right', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_line < 6 && data.num_column < 7);
        
        if (data.repeat < 4) {
            data.repeat = 0;
        } else {
            return (data.repeat >= 4);
        }
        //diagonale bas gauche
        data = app.reinitLineColumn(data);
        do {
            data = app.checkDirection('d_down_left', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_line < 6 && data.num_column >= 0);

        if (data.repeat < 4) {
            data.repeat--;
        } else {
            return (data.repeat >= 4);
        }
        //diagonale haut droite
        data = app.reinitLineColumn(data);
        do {
            data = app.checkDirection('d_up_right', data);
        } while (data.repeat < 4 && data.valueCellCurrentPlayer == app.currentPlayer && data.num_line >= 0 && data.num_column < 7);

        return (data.repeat >= 4);
    },


    checkDirection :  function(direction, data) {
        data.valueCellCurrentPlayer = document.querySelector(".position_" + data.num_line + "_" + data.num_column).innerHTML;
        if (data.valueCellCurrentPlayer == app.currentPlayer) {
            data.repeat++;
        }
        console.log("position: " + data.num_line + "," + data.num_column + " valeur: " + data.valueCellCurrentPlayer);
        console.log("repeat: " + data.repeat + " while 1");

        switch(direction) {
            case "right" :
                data.num_column++;
                break;
            case "left" :
                data.num_column--;
                break;
            case "down" :
                data.num_line++;
                break;
            case "d_up_left" :
                data.num_line--;
                data.num_column--;
                break;
            case "d_down_right" :
                data.num_line++;
                data.num_column++;
                break;
            case "d_down_left" :
                data.num_line++;
                data.num_column--;
                break;
            case "d_up_right" :
                data.num_line--;
                data.num_column++;
                break;
        }

        return data;
    },


    reinitLineColumn : function(data) {
        data.num_line = data.num_line_origin;
        data.num_column = data.num_column_origin;
        console.log("num_line:" + data.num_line);
        console.log("num_column:" + data.num_column);

        return data;
    }





};

document.addEventListener('DOMContentLoaded', app.init);