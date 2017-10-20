namespace D2
{
    export class Vector
    {
        x: number;
        y: number;

        constructor(x:number=0,y:number=0)
        {
            this.x = x;
            this.y = y;
        }

        negative():Vector {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        add(v:Vector|number):Vector 
        {
            if (v instanceof Vector) {
                this.x += v.x;
                this.y += v.y;
            } else {
                this.x += v;
                this.y += v;
            }
            return this;
        }

        subtract(v:Vector|number): Vector
        {
            if (v instanceof Vector) {
                this.x -= v.x;
                this.y -= v.y;
            } else {
                this.x -= v;
                this.y -= v;
            }
            return this;
        }
        multiply(v:Vector|number):Vector  {
            if (v instanceof Vector) {
                this.x *= v.x;
                this.y *= v.y;
            } else {
                this.x *= v;
                this.y *= v;
            }
            return this;
        }
        divide(v:Vector|number):Vector  {
            if (v instanceof Vector) {
                if(v.x != 0) this.x /= v.x;
                if(v.y != 0) this.y /= v.y;
            } else {
                if(v != 0) {
                    this.x /= v;
                    this.y /= v;
                }
            }
            return this;
        }
        equals(v:Vector):boolean  {
            return this.x == v.x && this.y == v.y;
        }
        dot(v:Vector):number  {
            return this.x * v.x + this.y * v.y;
        }
        cross(v:Vector):number  {
            return this.x * v.y - this.y * v.x
        }
        length():number  {
            return Math.sqrt(this.dot(this));
        }
        normalize():Vector  {
            return this.divide(this.length());
        }
        min(v:Vector):number  {
            return Math.min(this.x, this.y);
        }
        max():number {
            return Math.max(this.x, this.y);
        }
        toAngles():number {
            return -Math.atan2(-this.y, this.x);
        }
        angleTo(a:Vector):number {
            return Math.acos(this.dot(a) / (this.length() * a.length()));
        }
        toArray(n:number):number[] {
            return [this.x, this.y].slice(0, n || 2);
        }
        clone():Vector {
            return new Vector(this.x, this.y);
        }
        set(x:number, y:number):Vector {
            this.x = x; this.y = y;
            return this;
        }

        static Empty():D2.Vector
        {
            return new D2.Vector(0,0);
        }

    }
}