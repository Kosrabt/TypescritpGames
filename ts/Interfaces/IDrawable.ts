
///<reference path='../Canvas.ts'/>

namespace Graphics
{   
    export interface IDrawable
    {
        canvas:Graphics.Canvas;
        Draw();
    }
}