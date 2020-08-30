/*
 * This file is part of CanvasClock
 *
 * CanvasClock is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CanvasClock is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CanvasClock.  If not, see <https://www.gnu.org/licenses/>.
 */
var canvas;
var centerX;
var centerY;
var ctx;
var height;
var timer;
var width;

function body_onload() {

  canvas = document.getElementById('mainCanvas');
  ctx = canvas.getContext('2d');
  height = canvas.height;
  width = canvas.width;
  centerX = width / 2;
  centerY = height / 2;
  
  drawClock();
  timer = setInterval(drawClock, 50);
  
}

function drawClock() {
  ctx.clearRect(0, 0, width, height);
  drawFace();
  drawHands();
}

function drawFace() {

  var i;

  ctx.beginPath();
  ctx.arc(centerX, centerY , ((centerX + centerY) / 2) * 0.95, 0, Math.PI * 2, false);

  for (i = 0; i < 360; i++) {
    if ((i % 90) == 0) {
      ctx.moveTo(centerX + (centerX * 0.95) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.95) * (Math.cos(i * (Math.PI / 180))));
      ctx.lineTo(centerX + (centerX * 0.8) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.8) * (Math.cos(i * (Math.PI / 180))));
    } else if ((i % 30) == 0) {
      ctx.moveTo(centerX + (centerX * 0.95) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.95) * (Math.cos(i * (Math.PI / 180))));
      ctx.lineTo(centerX + (centerX * 0.85) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.85) * (Math.cos(i * (Math.PI / 180))));
    } else if ((i % 6) == 0) {
      ctx.moveTo(centerX + (centerX * 0.95) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.95) * (Math.cos(i * (Math.PI / 180))));
      ctx.lineTo(centerX + (centerX * 0.9) * (Math.sin(i * (Math.PI / 180))), centerY + (centerY * 0.9) * (Math.cos(i * (Math.PI / 180))));
    }
  }
  ctx.stroke();

}

function drawHands() {

  var now = new Date();
  var second = now.getSeconds() * 1000 + now.getMilliseconds();
  var minute = now.getMinutes() * 60 * 1000 + second;
  var hour = now.getHours() * 60 * 60 * 1000 + minute;
  
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + (centerX * 0.5) * (Math.sin((360 / (12 * 60 * 60 * 1000)) * hour * (Math.PI / 180))), centerY - (centerY * 0.5) * (Math.cos((360 / (12 * 60 * 60 * 1000)) * hour * (Math.PI / 180))));
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + (centerX * 0.7) * (Math.sin((360 / (60 * 60 * 1000)) * minute * (Math.PI / 180))), centerY - (centerY * 0.7) * (Math.cos((360 / (60 * 60 * 1000)) * minute * (Math.PI / 180))));
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + (centerX * 0.9) * (Math.sin((360 / (60 * 1000)) * second * (Math.PI / 180))), centerY - (centerY * 0.9) * (Math.cos((360 / (60 * 1000)) * second * (Math.PI / 180))));
  ctx.stroke();
}