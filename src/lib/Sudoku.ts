class Sudoku {
    gridsize: string = '9x9';
    unsolved: number[][];
    solved: number[][];

    constructor(unsolved: number[][], solvedString?: string) {
        this.unsolved = unsolved;
        if (solvedString) {
            this.solved = this.fromString(solvedString);
        } else {
            const result = this.solve(this.unsolved);
            this.solved = result.board;
        }
    }

    fromString(sudokuString: string): number[][] {
        if (sudokuString.length !== 81) {
            throw new Error("Invalid input string length.");
        }

        const arr: number[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: number[] = [];
            for (let j = 0; j < 9; j++) {
                row.push(parseInt(sudokuString[i * 9 + j]));
            }
            arr.push(row);
        }
        return arr;
    }

    pprint(): void {
        for (const row of this.solved) {
            console.log(row.join(' '));
        }
    }

    print(): string {
        let ret = ""
        for (const row of this.solved) {
            ret += row.join(' ');
            ret += "\n";
        }
        return ret
    }

    printProblem(): string {
        let ret = ""
        for (const row of this.unsolved) {
            ret += row.join(' ');
            ret += "\n";
        }
        return ret
    }

    htmlPrint(): string {
        let html: string = '<table>';
        for (const row of this.solved) {
            html += '<tr>';
            for (const cell of row) {
                html += '<td>' + cell + '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }

    solve(board: number[][]): { board: number[][], solved: boolean } {
        const emptyCell = this.findEmptyCell(board);
        if (!emptyCell) {
            return { board: board, solved: true };
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(board, row, col, num)) {
                board[row][col] = num;
                const result = this.solve(board);
                if (result.solved) {
                    return result;
                }
                board[row][col] = 0;  // Reset the cell (backtrack)
            }
        }
        return { board: board, solved: false };  // No solution is found
    }

    findEmptyCell(board: number[][]): [number, number] | null {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;  // No empty cells found
    }

    isValidMove(board: number[][], row: number, col: number, num: number): boolean {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }
        return true;
    }
}

class DemoSudoku extends Sudoku {
    
    constructor() {
        const gridsize="4x4"
        const unsolved = [
            [0, 2, 3, 0],
            [2, 1, 0, 3],
            [3, 4, 2, 1],
            [4, 0, 1, 0],
        ];
        const solved = [
            [1, 2, 3, 4],
            [2, 1, 4, 3],
            [3, 4, 2, 1],
            [4, 3, 1, 2],
        ];

        const solvedString = "1234214334214312"

        super(unsolved, solvedString);
      }

      fromString(sudokuString: string): number[][] {
        if (sudokuString.length !== 16) {
            throw new Error("Invalid input string length.");
        }

        const arr: number[][] = [];
        for (let i = 0; i < 4; i++) {
            const row: number[] = [];
            for (let j = 0; j < 4; j++) {
                row.push(parseInt(sudokuString[i * 4 + j]));
            }
            arr.push(row);
        }
        return arr;
    }



}

// export Sudoku;
export default DemoSudoku;