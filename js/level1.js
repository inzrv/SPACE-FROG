import { Platform } from './platform.js';
import {BackObject} from './backObject.js';

const platformImg = new Image();
const s_platformImg = new Image();
const backgroundImg = new Image();
const moonImg = new Image();

platformImg.src = './img/platform.png';
s_platformImg.src = './img/small_platform.png';
backgroundImg.src = './img/background.png';
moonImg.src = './img/moon.png';

 const win_distance = 3400;

//исходное положение фона
const back_start = [
    new BackObject( -100, 0, backgroundImg), 
    new BackObject(0, 0, moonImg)
]

 //исходное положение платформ
const p_start = 
[new Platform(0, 400, platformImg), 
new Platform(200, 400, platformImg),
new Platform(400, 400, platformImg),
new Platform(650, 300, platformImg),
new Platform(900, 400, platformImg), 
new Platform(1300, 400, platformImg),
new Platform(1500, 400, platformImg), 
new Platform(1825, 450, s_platformImg),
new Platform(2000, 400, platformImg),   
new Platform(2250, 350, s_platformImg),
new Platform(2350, 300, s_platformImg),
new Platform(2450, 250, s_platformImg),
new Platform(2550, 200, platformImg),
new Platform(2750, 400, platformImg),
new Platform(2875, 350, platformImg),
new Platform(3200, 400, platformImg),
new Platform(3400, 400, platformImg),
new Platform(3600, 400, platformImg)];

export {p_start, back_start, win_distance};
