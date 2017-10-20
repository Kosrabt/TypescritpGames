///<reference path='Interfaces/IForceable.ts'/>
///<reference path='Interfaces/IDrawable.ts'/>
///<reference path='Interfaces/IGameObject.ts'/>
///<reference path='Canvas.ts'/>
///<reference path='Forces/CompositeForce.ts'/>
///<reference path='Vector.ts'/>

namespace GameObjects
{
    export class Item implements GameObjects.IGameObject
    {
        id: number;

        private readonly onOutDate = new Events.LiteEvent< GameObjects.IGameObject>();
        public OutDate() { return this.onOutDate.expose(); }

        position: D2.Vector;
        velocity: D2.Vector;      

        canvas : Graphics.Canvas;
        compositeForce : Force.CompositeForce;
        mass: number;

        constructor(mass:number, position: D2.Vector=  D2.Vector.Empty(), velocity: D2.Vector = D2.Vector.Empty())
        {
            this.compositeForce = new Force.CompositeForce([]);         
            this.position = position;
            this.velocity= velocity;  
            this.mass = mass;
        }

        Update(progression: number): void
        {
            this.compositeForce.Attract(this, progression);
            this.position.add(this.velocity.multiply(progression));         
            if (Math.abs(this.position.max())>1000)
            {
                this.onOutDate.trigger(this);
            }   
        }

        Draw(): void {          
        }
    }
}