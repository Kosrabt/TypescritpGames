///<reference path='IForceable.ts'/>
///<reference path='IDrawable.ts'/>
///<reference path='../Vector.ts'/>
namespace GameObjects
{
    export interface IGameObject extends Force.IForceable, Graphics.IDrawable
    {      
        OutDate(); 

        id: number;
        canvas : Graphics.Canvas;
        
        Update(progression: number): void; 
        Draw(): void;


    }
}