namespace Graphics
{
    export class Canvas
    {
        private _canvas:HTMLCanvasElement;
        private _context: CanvasRenderingContext2D;
        constructor()
        {
            let body = document.body;
            this._canvas = document.createElement("canvas");
            this._canvas.width = body.offsetWidth;
            this._canvas.height = body.offsetHeight;
            this._context = this._canvas.getContext("2d");
            document.body.insertBefore(this._canvas, document.body.childNodes[0]);
        }

        GetWidth():number
        {
            return this._canvas.width;
        } 
        
        GetHeight():number
        {
            return this._canvas.height;
        }

        GetContext(): CanvasRenderingContext2D
        {
            return this._context;
        }

        Clear():void
        {   
            if (noClear== false)
             this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }     
}