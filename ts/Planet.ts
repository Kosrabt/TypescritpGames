///<reference path='Vector.ts'/>
///<reference path='Item.ts'/>

namespace GameObjects
{
    export class Planet extends GameObjects.Item
    {

        private _width = 10;
        private _height = 10;
        

        constructor(mass:number, position:D2.Vector = D2.Vector.Empty(), velocity:D2.Vector = D2.Vector.Empty())
        {
            super(mass, position,velocity);          
        }

        Update(progression: number): void
        {

       }        

        Draw(): void {
            var ctx = this.canvas.GetContext();
          /*  var color = Math.round(this.map_range(this.mass,-10,10,0,255));
            ctx.fillStyle = 'hsl('+color+', 100%, 50%)';
            */
            ctx.fillStyle = "black";
            ctx.fillRect(this.position.x - (this._width/2), this.position.y - (this._height/2), this._width, this._height);    
        }

        map_range(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }
    }
}