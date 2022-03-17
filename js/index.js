function getImage(sourse) {
    const image = new Image();
    image.src = sourse;
    return image;
}

const winImg = getImage('./img/win.png'); 
const shipImg = getImage('./img/ship.png');
const tutorImg = getImage('./img/tutor.png');

const music = new Audio();
music.src = "./sound/music.mp3";
let music_on = false;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');  
canvas.width = 1024;
canvas.height = 576; 

import {Player} from './player.js';

import {Platform} from './platform.js';

import {BackObject} from './backObject.js';

const keys = {
   right: {
       pressed: false
   },
   left: {
       pressed: false
   }
}

const gravity = 1.5; //гравитация в игре
let distance; //переменная для хранения пройденной дистанции
let win_check; //переменная для проверки прохождения уровня
let tutor_check; //переменная для корректного отображения инструкции 
let player;
let backObjects = [];
let platforms = [];

//исходное положение платформ
import {p_start, back_start, win_distance} from './level1.js';


// создает уровень в начале или после смерти
function initialization() { 
    player = new Player(shipImg, canvas);
    backObjects = [];
    for (let i = 0; i < back_start.length; i++) {
        backObjects.push(new BackObject(back_start[i].pos.x, 
            back_start[i].pos.y, back_start[i].image));
      }
    platforms = [];
    for (let i = 0; i < p_start.length; i++) {
      platforms.push(new Platform(p_start[i].pos.x, 
        p_start[i].pos.y, p_start[i].image));  
    }
    tutor_check = false; 
    win_check = false;
    distance = 0;
}

initialization(); 
processing();

function processing() {
    requestAnimationFrame(processing);

    //сначала рисуем фон
    backObjects.forEach((backObject) => {
      backObject.draw(ctx);
    });

    //игрок должен быть перед платформами
    platforms.forEach((platform) => {
       platform.draw(ctx);
    });

    //если прошли уровень, то рисуем поздравление
    if (win_check) {
        ctx.drawImage(winImg, 384, 100);  
    }
    
    //пока не ушли далеко от старта, показываем информацию
    if (tutor_check === false) {
        ctx.drawImage(tutorImg, 150, 125);
    }

    //меняем текущее состояние игрока с учетом его скорости и гравитации, далее рисуем
    player.update(ctx, gravity, canvas.height);

    //длина пройденной дистанции
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(player.pos.x + distance - 100 , 10, 70);

    //обработка перемещений игрока и платформ
    if (keys.right.pressed && player.pos.x < 600) {
        player.velocity.x = player.speed;
    }
    else {
        if ((keys.left.pressed && player.pos.x > 300) || 
            (keys.left.pressed && distance === 0 && player.pos.x > 0)) {
            player.velocity.x = - player.speed;
        }
        else{
           player.velocity.x = 0;
           if (keys.right.pressed) {
               distance += player.speed;
               platforms.forEach(platform => {
                 platform.pos.x -= player.speed;
                });
               backObjects.forEach(backObject => {
                 backObject.pos.x -= player.speed / 5;
               })
           }
           else {
               if (keys.left.pressed) {
                   distance -= 5;
                   platforms.forEach(platform => {
                       platform.pos.x += player.speed;
                    });
                   backObjects.forEach(backObject => {
                      backObject.pos.x += player.speed / 5;
                    })
               }
           }
        }
    }

    //проверка столкновения с платформой
    platforms.forEach((platform) => {
       if (collision(player, platform)) {
           player.velocity.y = 0;
       }
   })

   //если ушли далеко от старта, то не показываем туториал
   if (distance + player.pos.x  >= 500) {
       tutor_check = true;
   }

   //выигрыш
   if (distance + player.pos.x >= win_distance) {
       win_check = true;
   }

   //проишрыш
   if (player.pos.y > canvas.height) {
     win_check = false;
     initialization();
   }

}

window.addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'm':
            if (!music_on) {
                music_on = true;
                music.play();
            }
            else {
                music_on = false;
                music.pause();
                music.currentTime = 0.0;
            }
            break;
        case 'a':
            keys.left.pressed = true;
            break;
       case 'd':
           keys.right.pressed = true;
           break;
       case 'w':
          if (player.velocity.y == 0) {
              player.velocity.y -= player.jump;
          }
          break;
       case 's':
           break;
        case 'r':
          initialization();
    }
})

window.addEventListener('keyup', ({key}) => {
   switch(key) {
      case 'd':
           keys.right.pressed = false; 
           break;
       case 'a':
           keys.left.pressed = false;
           break;
   }
})

//проверка столкновения игрока и платформы
function collision(player, platform) {
    return (player.pos.y + player.height <= platform.pos.y &&
        player.pos.y + player.height + player.velocity.y >= platform.pos.y &&
        player.pos.x + player.width >= platform.pos.x &&
        player.pos.x <= platform.pos.x + platform.width);
}