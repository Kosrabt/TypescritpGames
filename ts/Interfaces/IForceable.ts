///<reference path='IPosition.ts'/>
///<reference path='IVelocity.ts'/>
///<reference path='../Forces/CompositeForce.ts'/>

namespace Force
{
    export interface IForceable extends Force.IPosition, Force.IVelocity
    {
        mass:number;
        compositeForce: Force.CompositeForce;
    }
}