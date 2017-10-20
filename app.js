var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Graphics;
(function (Graphics) {
    var Canvas = (function () {
        function Canvas() {
            var body = document.body;
            this._canvas = document.createElement("canvas");
            this._canvas.width = body.offsetWidth;
            this._canvas.height = body.offsetHeight;
            this._context = this._canvas.getContext("2d");
            document.body.insertBefore(this._canvas, document.body.childNodes[0]);
        }
        Canvas.prototype.GetWidth = function () {
            return this._canvas.width;
        };
        Canvas.prototype.GetHeight = function () {
            return this._canvas.height;
        };
        Canvas.prototype.GetContext = function () {
            return this._context;
        };
        Canvas.prototype.Clear = function () {
            if (noClear == false)
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        };
        return Canvas;
    }());
    Graphics.Canvas = Canvas;
})(Graphics || (Graphics = {}));
var D2;
(function (D2) {
    var Vector = (function () {
        function Vector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector.prototype.negative = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vector.prototype.add = function (v) {
            if (v instanceof Vector) {
                this.x += v.x;
                this.y += v.y;
            }
            else {
                this.x += v;
                this.y += v;
            }
            return this;
        };
        Vector.prototype.subtract = function (v) {
            if (v instanceof Vector) {
                this.x -= v.x;
                this.y -= v.y;
            }
            else {
                this.x -= v;
                this.y -= v;
            }
            return this;
        };
        Vector.prototype.multiply = function (v) {
            if (v instanceof Vector) {
                this.x *= v.x;
                this.y *= v.y;
            }
            else {
                this.x *= v;
                this.y *= v;
            }
            return this;
        };
        Vector.prototype.divide = function (v) {
            if (v instanceof Vector) {
                if (v.x != 0)
                    this.x /= v.x;
                if (v.y != 0)
                    this.y /= v.y;
            }
            else {
                if (v != 0) {
                    this.x /= v;
                    this.y /= v;
                }
            }
            return this;
        };
        Vector.prototype.equals = function (v) {
            return this.x == v.x && this.y == v.y;
        };
        Vector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        Vector.prototype.cross = function (v) {
            return this.x * v.y - this.y * v.x;
        };
        Vector.prototype.length = function () {
            return Math.sqrt(this.dot(this));
        };
        Vector.prototype.normalize = function () {
            return this.divide(this.length());
        };
        Vector.prototype.min = function (v) {
            return Math.min(this.x, this.y);
        };
        Vector.prototype.max = function () {
            return Math.max(this.x, this.y);
        };
        Vector.prototype.toAngles = function () {
            return -Math.atan2(-this.y, this.x);
        };
        Vector.prototype.angleTo = function (a) {
            return Math.acos(this.dot(a) / (this.length() * a.length()));
        };
        Vector.prototype.toArray = function (n) {
            return [this.x, this.y].slice(0, n || 2);
        };
        Vector.prototype.clone = function () {
            return new Vector(this.x, this.y);
        };
        Vector.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vector.Empty = function () {
            return new D2.Vector(0, 0);
        };
        return Vector;
    }());
    D2.Vector = Vector;
})(D2 || (D2 = {}));
var Force;
(function (Force) {
    var CompositeForce = (function () {
        function CompositeForce(newForces) {
            this.forces = [];
            if (newForces) {
                this.forces = newForces;
            }
        }
        CompositeForce.prototype.Attract = function (item, progress) {
            this.forces.forEach(function (element) {
                element.Attract(item, progress);
            });
        };
        CompositeForce.prototype.AddForce = function (force) {
            this.forces.push(force);
            return this;
        };
        return CompositeForce;
    }());
    Force.CompositeForce = CompositeForce;
})(Force || (Force = {}));
var GameObjects;
(function (GameObjects) {
    var Item = (function () {
        function Item(mass, position, velocity) {
            if (position === void 0) { position = D2.Vector.Empty(); }
            if (velocity === void 0) { velocity = D2.Vector.Empty(); }
            this.onOutDate = new Events.LiteEvent();
            this.compositeForce = new Force.CompositeForce([]);
            this.position = position;
            this.velocity = velocity;
            this.mass = mass;
        }
        Item.prototype.OutDate = function () { return this.onOutDate.expose(); };
        Item.prototype.Update = function (progression) {
            this.compositeForce.Attract(this, progression);
            this.position.add(this.velocity.multiply(progression));
            if (Math.abs(this.position.max()) > 1000) {
                this.onOutDate.trigger(this);
            }
        };
        Item.prototype.Draw = function () {
        };
        return Item;
    }());
    GameObjects.Item = Item;
})(GameObjects || (GameObjects = {}));
var GameObjects;
(function (GameObjects) {
    var Asteroid = (function (_super) {
        __extends(Asteroid, _super);
        function Asteroid(mass, position, velocity) {
            if (position === void 0) { position = D2.Vector.Empty(); }
            if (velocity === void 0) { velocity = D2.Vector.Empty(); }
            var _this = _super.call(this, mass, position, velocity) || this;
            _this._width = 4;
            _this._height = 4;
            return _this;
        }
        Asteroid.prototype.Draw = function () {
            var ctx = this.canvas.GetContext();
            var angle = 360 / (2 * Math.PI) * this.velocity.toAngles();
            ctx.fillStyle = "hsl(" + angle + ", 100%, 50%)";
            ctx.fillRect(this.position.x - (this._width / 2), this.position.y - (this._height / 2), this._width, this._height);
        };
        return Asteroid;
    }(GameObjects.Item));
    GameObjects.Asteroid = Asteroid;
})(GameObjects || (GameObjects = {}));
var GameObjects;
(function (GameObjects) {
    var Planet = (function (_super) {
        __extends(Planet, _super);
        function Planet(mass, position, velocity) {
            if (position === void 0) { position = D2.Vector.Empty(); }
            if (velocity === void 0) { velocity = D2.Vector.Empty(); }
            var _this = _super.call(this, mass, position, velocity) || this;
            _this._width = 10;
            _this._height = 10;
            return _this;
        }
        Planet.prototype.Update = function (progression) {
        };
        Planet.prototype.Draw = function () {
            var ctx = this.canvas.GetContext();
            ctx.fillStyle = "black";
            ctx.fillRect(this.position.x - (this._width / 2), this.position.y - (this._height / 2), this._width, this._height);
        };
        Planet.prototype.map_range = function (value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        };
        return Planet;
    }(GameObjects.Item));
    GameObjects.Planet = Planet;
})(GameObjects || (GameObjects = {}));
var Force;
(function (Force) {
    var BaseForce = (function () {
        function BaseForce() {
        }
        BaseForce.prototype.Attract = function (item, progress) {
            var acceleration = this.Force(item).divide(item.mass);
            var velocityVector = acceleration.multiply(progress / 1000);
            item.velocity.add(velocityVector);
        };
        BaseForce.prototype.Force = function (item) {
            return D2.Vector.Empty();
        };
        return BaseForce;
    }());
    Force.BaseForce = BaseForce;
})(Force || (Force = {}));
var Force;
(function (Force) {
    var GravForce = (function (_super) {
        __extends(GravForce, _super);
        function GravForce(origin) {
            var _this = _super.call(this) || this;
            _this._origin = origin;
            return _this;
        }
        GravForce.prototype.Force = function (item) {
            var pointVector = this._origin.position.clone().subtract(item.position);
            var normaizedVector = pointVector.clone().normalize();
            var len = pointVector.length();
            if (len == 0) {
                return D2.Vector.Empty();
            }
            return normaizedVector.multiply(2000 * item.mass * this._origin.mass / (len * len));
        };
        return GravForce;
    }(Force.BaseForce));
    Force.GravForce = GravForce;
})(Force || (Force = {}));
var Interaction;
(function (Interaction) {
    var Mouse = (function () {
        function Mouse() {
            this.onMouseUp = new Events.LiteEvent();
            var that = this;
            document.body.onmousedown = function (e) { return that.MouseDown(e); };
            document.body.onmouseup = function (e) { return that.MouseUp(e); };
        }
        Mouse.prototype.OnMouseUp = function () { return this.onMouseUp.expose(); };
        Mouse.prototype.MouseDown = function (ev) {
            this._lastPosition = new D2.Vector(ev.clientX, ev.clientY);
        };
        Mouse.prototype.MouseUp = function (ev) {
            var diff = new D2.Vector(ev.clientX, ev.clientY).subtract(this._lastPosition);
            this.onMouseUp.trigger([this._lastPosition, diff]);
        };
        return Mouse;
    }());
    Interaction.Mouse = Mouse;
})(Interaction || (Interaction = {}));
var Events;
(function (Events) {
    var LiteEvent = (function () {
        function LiteEvent() {
            this.handlers = [];
        }
        LiteEvent.prototype.on = function (handler) {
            this.handlers.push(handler);
        };
        LiteEvent.prototype.off = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        LiteEvent.prototype.trigger = function (data) {
            this.handlers.slice(0).forEach(function (h) { return h(data); });
        };
        LiteEvent.prototype.expose = function () {
            return this;
        };
        return LiteEvent;
    }());
    Events.LiteEvent = LiteEvent;
})(Events || (Events = {}));
var Force;
(function (Force) {
    var TossForce = (function (_super) {
        __extends(TossForce, _super);
        function TossForce(origin) {
            var _this = _super.call(this) || this;
            _this._origin = origin;
            return _this;
        }
        TossForce.prototype.Force = function (item) {
            var pointVector = this._origin.position.clone().subtract(item.position);
            var normaizedVector = pointVector.clone().normalize();
            var len = pointVector.length();
            if (len == 0) {
                return D2.Vector.Empty();
            }
            return normaizedVector.multiply(1 * len);
        };
        return TossForce;
    }(Force.BaseForce));
    Force.TossForce = TossForce;
})(Force || (Force = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.itemId = 0;
        this._running = false;
        this._self = this;
        this.canvas = new Graphics.Canvas();
        this.items = [];
        this._mouse = new Interaction.Mouse();
        this._mouse.OnMouseUp().on(function (vectors) { return _this._self.ShootNewItem(vectors); });
    }
    Game.prototype.updateFrame = function (timeSpan) {
        this.items.forEach(function (element) {
            element.Update(1);
        });
    };
    Game.prototype.drawFrame = function (timeSpan) {
        this.items.forEach(function (element) {
            element.Draw();
        });
    };
    Game.prototype.CalculateDiffTimestamp = function (timestamp) {
        if (!this._lastTimeStamp)
            this._lastTimeStamp / timestamp;
        var diff = timestamp - this._lastTimeStamp;
        this._lastTimeStamp / timestamp;
        return diff;
    };
    Game.prototype.Run = function (timeSpan) {
        var progress = this.CalculateDiffTimestamp(timeSpan);
        this.canvas.Clear();
        if (this._running) {
            this.updateFrame(progress);
        }
        this.drawFrame(progress);
        this.Animate();
    };
    Game.prototype.Animate = function () {
        var that = this;
        window.requestAnimationFrame(function (ts) { that.Run(ts); });
    };
    Game.prototype.Start = function () {
        this._running = true;
        this.Animate();
    };
    Game.prototype.Stop = function () {
        this._running = false;
    };
    Game.prototype.AddItem = function (item) {
        item.canvas = this.canvas;
        item.id = this.itemId++;
        this.items.push(item);
        return item;
    };
    Game.prototype.ShootNewItem = function (vectors) {
        var _this = this;
        var item = new GameObjects.Asteroid(1, vectors[0], vectors[1].negative().divide(50));
        item.OutDate().on(function (obj) { return _this._self.RemoveItem(obj); });
        this.AddAttractor(item);
        this.AddItem(item);
    };
    Game.prototype.RemoveItem = function (obj) {
        this.items = this.items.filter(function (x) { return x.id != obj.id; });
    };
    Game.prototype.AddAttractor = function (item) {
        attractors.forEach(function (attractor) {
            if ((attractor instanceof GameObjects.Planet)) {
                item.compositeForce.AddForce(new Force.GravForce(attractor));
                attractor.compositeForce.AddForce(new Force.GravForce(item));
            }
        });
        attractors.push(item);
    };
    return Game;
}());
var game = new Game();
game.Start();
var random = function (min, max) { return Math.random() * (max - min) + min; };
var randomVector = function (min, max) { return new D2.Vector(random(min, max), random(min, max)); };
var mass = function () { return random(-100, -100); };
var attractors = [];
var suns = [];
var noClear = true;
var center = new D2.Vector(500, 500);
var noPlanets = 100;
var angleStep = 2 * Math.PI / noPlanets;
var radius = 400;
for (var i = 0; i < noPlanets; i++) {
    var angle = angleStep * i;
    var angleVector = new D2.Vector(Math.cos(angle), Math.sin(angle)).multiply(radius);
    var positionVector = center.clone().add(angleVector);
    attractors.push(game.AddItem(new GameObjects.Planet(mass(), positionVector, D2.Vector.Empty())));
}
var Force;
(function (Force) {
    var FrictionForce = (function () {
        function FrictionForce() {
        }
        FrictionForce.prototype.Attract = function (item, progress) {
        };
        FrictionForce.mu = -0.1;
        return FrictionForce;
    }());
    Force.FrictionForce = FrictionForce;
})(Force || (Force = {}));
//# sourceMappingURL=app.js.map