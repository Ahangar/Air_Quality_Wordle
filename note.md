Creating a wordle with aerosol words as 
https://www.youtube.com/watch?v=PNGgQzw6PQg&list=WL&index=85&t=541s&ab_channel=CoderCoder

## Pre scripts
run "npm install -g yo"
and "npm install -g generator-gulp-sass-boilerplate"
to get the yoemen
to install any files template you want type "yo temp-name"
in this case "yo gulp-sass-boilerplate"
you might get an ps1 error run this in that case "Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass"
check yeoman for more generators: https://yeoman.io/

***in the index.html you can use ".classname*5" to create 5 lines of class names

consider geekforgeeks for js functions
for javascript, just search for the commands from places likke flavio

for deploying website Cloudflare
also codepen for animation
run gulp to run the thing

for browserify and gulp use: https://www.youtube.com/watch?v=78_iyqT-qT8&ab_channel=MaximilianSchmitt

## Gameplay
6 tries to gues a 5 letter word
typing will show the letters

## Making a guess
detect any keypress:
x if a letter:
    x update letters
    x update tile markup
x if backspace:
    x delete last letter
    x update tile markup based on letters
    - don't run update if letter lenght is 4
Enter will submit guess and show letters with 3 cols (datastate):
- green: right letter right place
- yellow: right letter bad position
- grey: wrong letter

Guesses must be real word, "in word list".

Hard Mode: present or correct letters must be used in the subsequent letters
When submitting:
- Tiles flip and background col changes
Guesses are saved in local storage
## Design
5x6 tiles
virtual keyboard


## Interactions

When typing a letter:
- border the tiles changes to light grey
- 