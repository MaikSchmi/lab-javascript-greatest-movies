// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
const movie = [
    {
      title: 'The Shawshank Redemption',
      year: 1994,
      director: 'Frank Darabont',
      duration: '2h 22min',
      genre: ['Crime', 'Drama'],
      score: 9.3
    },
]

function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director).filter((value, index, self) => self.indexOf(value) === index);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(currentElement => currentElement.director === "Steven Spielberg" && currentElement.genre.includes("Drama")).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    return parseFloat((moviesArray.reduce((sum, movie) => {
        if (typeof movie.score === "number") {
            return sum + movie.score;
        } else {
            return sum + 0;
        }
    }, 0) / moviesArray.length).toFixed(2)) || 0;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return parseFloat((moviesArray.filter(movie => movie.genre.includes("Drama")).reduce((sum, movie) => {
        if (typeof movie.score === "number") {
            return sum += movie.score;
        } else {
            return sum += 0;
        }
    }, 0) / moviesArray.filter(movie => movie.genre.includes("Drama")).length).toFixed(2)) || 0;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray.slice().sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map(currentElement => currentElement.title).sort().slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const newArr = JSON.parse(JSON.stringify(moviesArray));

    // Loop through array
    for (let i = 0; i < newArr.length; i++) {
        // Get index duration and split at "h"
        let tempDuration = newArr[i].duration.split("h");
        // If more than 1 element in array and 2nd element is not empty string
        if (tempDuration.length > 1 && tempDuration[1] !== "") {
            // Remove space (after "h")
            tempDuration[1].replace(" ", "");
            // Loop through tempduration[1]
            for (let j = 0; j < tempDuration[1].length; j++) {
                // Count until letter "m"
                if (tempDuration[1][j] === "m") {
                    // Take all values until "m"
                    tempDuration[1] = tempDuration[1].slice(0, j);
                    break;
                }
            }
            newArr[i].duration = parseInt(tempDuration[0]) * 60 + parseInt(tempDuration[1]);
        } else {
            newArr[i].duration = parseInt(tempDuration[0] * 60);
        }
    }

    return newArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    let newArr = moviesArray.slice();
    let avgArr = [];

    if (moviesArray.length === 0) {
        return null;
    } else if (moviesArray.length === 1) {
        avgArr = moviesArray;
    } else {
        newArr.sort((a, b) => a.year - b.year);
        for (let i = 0; i < newArr.length; i++) {
            const checkYear = newArr[i].year;
            let checkScore = 0;
            let scoreCount = 0;
            for (let j = i; j < newArr.length; j++) {
                if (newArr[j].year !== checkYear) {
                    avgArr.push({
                        year: checkYear,
                        score: checkScore / scoreCount,
                    });
                    i = j - 1;
                    break;
                } else {
                    checkScore += newArr[j].score;
                    scoreCount++;
                }
            }
        }
    }

    avgArr.sort((a, b) => a.score - b.score);
    let highScore = avgArr[0].score;
    let bestYear = avgArr[0].year;
    for (let i = 0; i < avgArr.length; i++) {
        if (avgArr[i].score > highScore) {
            highScore = avgArr[i].score;
            bestYear = avgArr[i].year;
        }
    }

    return `The best year was ${bestYear} with an average score of ${highScore}`;
}