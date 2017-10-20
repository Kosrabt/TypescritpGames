///<reference path="Game.ts"/>

var game = new Game();
game.Start();

let random = (min, max) => Math.random()*(max-min)+min;
let randomVector = (min,max) => new D2.Vector(random(min,max), random(min,max));
let mass = () => random(-100,-100);

var attractors:GameObjects.IGameObject[] = [];
var suns:GameObjects.IGameObject[] = [];
var noClear = true;

var center = new D2.Vector(500,500);
var noPlanets = 100;
var angleStep = 2*Math.PI / noPlanets;
var radius = 400;

for (var i = 0; i < noPlanets; i++) {    

        var angle = angleStep* i;
        var angleVector = new D2.Vector(Math.cos(angle), Math.sin(angle)).multiply(radius);
        var positionVector = center.clone().add(angleVector);

        attractors.push(game.AddItem(new GameObjects.Planet(mass(), positionVector, D2.Vector.Empty())));    
}

