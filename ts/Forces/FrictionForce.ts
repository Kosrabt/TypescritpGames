///<reference path='../Interfaces/IForce.ts'/>
namespace Force
{
    export class FrictionForce implements Force.IForce
    {
        static mu : number = -0.1;
        Attract(item:Force.IForceable, progress:number) {
            
        }        
    }
}