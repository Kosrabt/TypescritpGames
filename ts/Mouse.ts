namespace Interaction
{
    export class Mouse
    {
        _lastPosition: D2.Vector;

        private readonly onMouseUp = new Events.LiteEvent<D2.Vector[]>();

        public OnMouseUp() { return this.onMouseUp.expose(); }

        constructor()
        {
            var that = this;
            document.body.onmousedown = (e:MouseEvent) => that.MouseDown(e);
            document.body.onmouseup = (e:MouseEvent) => that.MouseUp(e);
        }

        MouseDown(ev: MouseEvent): any
        {
            this._lastPosition= new D2.Vector(ev.clientX, ev.clientY); 
        }
       
        MouseUp(ev: MouseEvent): any
        {
            var diff = new D2.Vector(ev.clientX, ev.clientY).subtract(this._lastPosition); 
         
            this.onMouseUp.trigger([this._lastPosition,diff]);
            
        }
    }
}