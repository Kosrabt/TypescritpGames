///<reference path='../Interfaces/IForce.ts'/>
namespace Force
{
    export class CompositeForce implements Force.IForce
    {
        private forces:IForce[];

        constructor(newForces:IForce[])
        {
            this.forces = [];
            if (newForces)
            {
                this.forces = newForces;
            }
        }

        Attract(item:Force.IForceable, progress:number) {
           this.forces.forEach(element => {
               element.Attract(item, progress);
           });
        }

        AddForce(force:IForce):CompositeForce
        {
            this.forces.push(force);
            return this;
        }
    }
}