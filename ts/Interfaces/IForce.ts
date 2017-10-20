///<reference path='IForceable.ts'/>
namespace Force
{   
    export interface IForce
    {
        Attract(item:Force.IForceable, progress:number);
    }
}