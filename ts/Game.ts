
///<reference path='Canvas.ts'/>
///<reference path='Asteroid.ts'/>
///<reference path='Planet.ts'/>
///<reference path='Item.ts'/>
///<reference path='Forces/GravForce.ts'/>
///<reference path='Interfaces/IGameObject.ts'/>
///<reference path='Mouse.ts'/>
///<reference path='Event.ts'/>
///<reference path='Forces/TossForce.ts'/>

class Game
{

    items: GameObjects.IGameObject[]; 
    
    private itemId: number =0;
    private canvas:Graphics.Canvas;  
    private _lastTimeStamp;
    private _running: boolean =  false;
    private _mouse:Interaction.Mouse;
    private _self: Game;

    constructor()
    {
        this._self = this;
        this.canvas = new Graphics.Canvas();
        this.items = [];      
        this._mouse = new Interaction.Mouse();
        this._mouse.OnMouseUp().on((vectors:D2.Vector[])=>this._self.ShootNewItem(vectors));
    }   

    private updateFrame(timeSpan:number):void
    {
        this.items.forEach(element => {
            element.Update(1);
        });        
    }

    private drawFrame(timeSpan:number):void
    {
        this.items.forEach(element => {
            element.Draw();
        });        
    }

    private CalculateDiffTimestamp(timestamp:number):number
    {
        if (!this._lastTimeStamp) this._lastTimeStamp /timestamp;
        let diff= timestamp-this._lastTimeStamp;
        this._lastTimeStamp / timestamp;
        return diff;
    }

    private Run(timeSpan:number): void
    {
        let progress = this.CalculateDiffTimestamp(timeSpan);        
        this.canvas.Clear();       
        
        if (this._running)        
        {
            this.updateFrame(progress);
        }
        this.drawFrame(progress);
        this.Animate();
    }

    private Animate(): void
    {        
        let that = this;
        window.requestAnimationFrame(function(ts:number){that.Run(ts);});             
    }

    Start():void
    {
        this._running = true;
        this.Animate();      
    }

    Stop():void
    {
        this._running= false; 
    }

    AddItem(item: GameObjects.IGameObject):GameObjects.IGameObject
    {   
        item.canvas = this.canvas; 
        item.id = this.itemId++;    
        this.items.push(item);
        return item;
    }

    ShootNewItem(vectors:D2.Vector[]):void
    {
        let item = new GameObjects.Asteroid(1 , vectors[0], vectors[1].negative().divide(50));      
        item.OutDate().on((obj:GameObjects.Item)=>this._self.RemoveItem(obj))
        this.AddAttractor(item);
        this.AddItem(item);
    }

    RemoveItem(obj:GameObjects.Item)
    {
        this.items = this.items.filter((x)=>x.id!=obj.id);
    }

    AddAttractor(item:GameObjects.Item)
    {
      attractors.forEach(attractor => {   
          if ((attractor instanceof GameObjects.Planet))
              {
            item.compositeForce.AddForce(new Force.GravForce(attractor));
           

            attractor.compositeForce.AddForce(new Force.GravForce(item));
          
              }
        });
        attractors.push(item);    
        
        
    }
}

