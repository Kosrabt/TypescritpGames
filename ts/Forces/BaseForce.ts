///<reference path='../Interfaces/IForce.ts'/>
///<reference path='../Vector.ts'/>

namespace Force
{
    export class BaseForce implements Force.IForce
    {
        
        Attract(item:Force.IForceable, progress:number) 
        {           
            var acceleration = this.Force(item).divide(item.mass);
            var velocityVector = acceleration.multiply(progress/1000)
            item.velocity.add(velocityVector);        
        }       
        
        protected Force(item:Force.IForceable): D2.Vector 
        {
            return D2.Vector.Empty();
        }
    }
}