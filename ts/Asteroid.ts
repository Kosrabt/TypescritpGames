///<reference path='Interfaces/IForceable.ts'/>
///<reference path='Interfaces/IDrawable.ts'/>
///<reference path='Interfaces/IGameObject.ts'/>
///<reference path='Canvas.ts'/>
///<reference path='Forces/CompositeForce.ts'/>
///<reference path='Vector.ts'/>
///<reference path='Item.ts'/>

namespace GameObjects
{
    export class Asteroid extends GameObjects.Item
    {

        private _width = 4;
        private _height = 4;
        

        constructor(mass:number, position:D2.Vector = D2.Vector.Empty(), velocity:D2.Vector = D2.Vector.Empty())
        {
            super(mass, position,velocity);          
        }

        Draw(): void {
            var ctx = this.canvas.GetContext();
            var angle = 360/(2*Math.PI)*this.velocity.toAngles();
            ctx.fillStyle = "hsl("+angle+", 100%, 50%)";
            ctx.fillRect(this.position.x - (this._width/2), this.position.y - (this._height/2), this._width, this._height);
        }
    }
}