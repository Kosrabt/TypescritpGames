///<reference path='../Forces/BaseForce.ts'/>
///<reference path='../Vector.ts'/>

namespace Force
{
    export class TossForce extends Force.BaseForce
    {
        _origin:Force.IForceable;    
             
        
        constructor(origin:Force.IForceable)
        {        
            super();   
            this._origin = origin
        }

        Force(item:Force.IForceable):D2.Vector
        {           
            var pointVector = this._origin.position.clone().subtract(item.position);     
            var normaizedVector =pointVector.clone().normalize();
            var len = pointVector.length();

            if (len == 0) 
            {
                return D2.Vector.Empty();
            }
            return normaizedVector.multiply(1*len);
        }     
    }
}