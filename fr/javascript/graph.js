(function () {
    var Directions;
    (function (Directions) {
        Directions[Directions["up"] = 0] = "up";
        Directions[Directions["down"] = 1] = "down";
        Directions[Directions["left"] = 2] = "left";
        Directions[Directions["right"] = 3] = "right";
    })(Directions || (Directions = {}));
    var Graph = /** @class */ (function () {
        function Graph() {
            var _this = this;
            this.handleSubmit = function (e) {
                e.preventDefault();
                _this.equation = e.target.elements.function.value;
                try {
                    _this.calculate(0);
                }
                catch (err) {
                    alert("Equation invalid\n\n".concat(err));
                    return false;
                }
                _this.plot();
            };
            this.handleResize = function () {
                var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
                _this.canvas.width = innerWidth;
                _this.canvas.height = innerHeight - 80;
                _this.orientation.x = innerWidth / 2;
                _this.orientation.y = (innerHeight - 80) / 2;
                _this.plot();
            };
            this.handleMouseDown = function (_a) {
                var offsetX = _a.offsetX, offsetY = _a.offsetY;
                _this.mouseStart = {
                    x: offsetX,
                    y: offsetY
                };
                _this.canvas.addEventListener("mouseup", _this.handleMouseUp);
                _this.canvas.addEventListener("mousemove", _this.handleMouseMove);
            };
            this.handleMouseUp = function () {
                _this.canvas.removeEventListener("mouseup", _this.handleMouseUp);
                _this.canvas.removeEventListener("mousemove", _this.handleMouseMove);
            };
            this.handleMouseMove = function (e) {
                var _a = _this.mouseStart, startX = _a.x, startY = _a.y;
                var offsetX = e.offsetX, offsetY = e.offsetY;
                _this.orientation.x = _this.orientation.x + (offsetX - startX);
                _this.orientation.y = _this.orientation.y + (offsetY - startY);
                _this.mouseStart = {
                    x: offsetX,
                    y: offsetY
                };
                _this.plot();
            };
            this.handleScroll = function (e) {
                var wheelDeltaY = e.wheelDeltaY, offsetX = e.offsetX, offsetY = e.offsetY;
                var dX = (offsetX - _this.canvas.width / 2) / _this.canvas.width;
                var dY = (offsetY - _this.canvas.height / 2) / _this.canvas.height;
                var zoomPanFactor = 100;
                if (wheelDeltaY > 0) {
                    _this.orientation.zoom = +(_this.orientation.zoom *
                        (1 + _this.zoomPercentage)).toFixed(4);
                    _this.orientation.x = Math.round(_this.orientation.x - dX * zoomPanFactor);
                    _this.orientation.y = Math.round(_this.orientation.y - dY * zoomPanFactor);
                }
                else {
                    _this.orientation.zoom = +(_this.orientation.zoom /
                        (1 + _this.zoomPercentage)).toFixed(4);
                    _this.orientation.x = Math.round(_this.orientation.x + dX * zoomPanFactor);
                    _this.orientation.y = Math.round(_this.orientation.y + dY * zoomPanFactor);
                }
                _this.plot();
            };
            this.plotGrid = function () {
                _this.calculateBreakpoint();
                _this.plotGridSegment(Directions.up);
                _this.plotGridSegment(Directions.down);
                _this.plotGridSegment(Directions.left);
                _this.plotGridSegment(Directions.right);
            };
            this.canvas = document.querySelector(".canvas");
            this.form = document.querySelector(".form");
            this.input = document.querySelector(".form__input");
            this.c = this.canvas.getContext("2d");
            this.orientation = {
                zoom: 1,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2
            };
            this.mouseStart = {
                x: null,
                y: null
            };
            this.equation = "Math.sin(x / 30) * 100";
            this.data = [];
            this.precision = 1; // num of pixels traveled horizontally before calculating another coordinate
            this.zoomPercentage = 0.05; // what percent one scroll event will zoom in/out
            this.sigFigs = 3; // significant figures of equation output
            this.gridSpacing = 0.01; // gridSpacing * zoom = number of pixels per grid square
            this.maxGridCells = 3; // the max number of grid cells before increasing the grid spacing factor
            this.addEventListeners();
            this.handleResize();
        }
        Graph.prototype.addEventListeners = function () {
            window.addEventListener("resize", this.handleResize);
            this.form.addEventListener("submit", this.handleSubmit);
            this.canvas.addEventListener("mousedown", this.handleMouseDown);
            window.addEventListener("mousewheel", this.handleScroll);
        };
        Graph.prototype.calculate = function (x) {
            var equation = this.equation.replace(/x/gm, x);
            return eval(equation);
        };
        Graph.prototype.calculateSigFigs = function () {
            this.sigFigs = this.orientation.zoom.toFixed(0).length + 1;
        };
        Graph.prototype.setData = function () {
            var data = [];
            var x = 0;
            while (x < this.canvas.width + this.precision) {
                var _x = x;
                // horizontal pan
                _x -= this.orientation.x;
                // horizontal zoom
                _x /= this.orientation.zoom;
                var y = this.calculate(_x.toFixed(this.sigFigs));
                // flip y coordinate because canvas paints \ instead of  /
                y *= -1;
                // vertical zoom
                y *= this.orientation.zoom;
                // vertical pan
                y += this.orientation.y;
                data.push([x, y]);
                x += this.precision;
            }
            this.data = data;
        };
        Graph.prototype.plotData = function () {
            var _this = this;
            if (!this.data || !this.data.length)
                return;
            this.c.beginPath();
            this.c.moveTo(this.data[0][0], this.data[0][1]);
            this.c.strokeStyle = "rgba(100, 0, 139, 0.7)";
            this.data.forEach(function (_a) {
                var x = _a[0], y = _a[1];
                return _this.c.lineTo(x, y);
            });
            this.c.stroke();
        };
        Graph.prototype.plotAxes = function () {
            var _a = this.orientation, x = _a.x, y = _a.y;
            var _b = this.canvas, width = _b.width, height = _b.height;
            this.c.strokeStyle = "#000";
            this.c.lineWidth = 2;
            // x right
            if (x <= width) {
                this.c.beginPath();
                this.c.moveTo(x, y);
                this.c.lineTo(width, y);
                this.c.stroke();
            }
            // x left
            if (x >= 0) {
                this.c.beginPath();
                this.c.moveTo(x, y);
                this.c.lineTo(0, y);
                this.c.stroke();
            }
            // y up
            if (y <= height) {
                this.c.beginPath();
                this.c.moveTo(x, y);
                this.c.lineTo(x, height);
                this.c.stroke();
            }
            // y down
            if (y >= 0) {
                this.c.beginPath();
                this.c.moveTo(x, y);
                this.c.lineTo(x, 0);
                this.c.stroke();
            }
        };
        Graph.prototype.plotGridSegment = function (direction) {
            var _a = this, gridSpacing = _a.gridSpacing, _b = _a.orientation, x = _b.x, y = _b.y, zoom = _b.zoom, _c = _a.canvas, width = _c.width, height = _c.height;
            var pt = direction === Directions.up || direction === Directions.down ? y : x;
            var label = 0;
            var index = 0;
            var setCondition = function (point) {
                if (direction === Directions.down)
                    return point < height;
                if (direction === Directions.up)
                    return point > 0;
                if (direction === Directions.left)
                    return point > 0;
                if (direction === Directions.right)
                    return point < width;
                return false;
            };
            var condition = setCondition(pt);
            while (condition) {
                this.c.strokeStyle =
                    index % 5 === 0 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)";
                this.c.lineWidth = 1;
                this.c.font = "bold 11px monospace";
                // add grid line
                if (direction === Directions.down || direction === Directions.up) {
                    this.c.textAlign = "right";
                    this.c.beginPath();
                    this.c.moveTo(0, pt);
                    this.c.lineTo(width, pt);
                    this.c.stroke();
                }
                else if (direction === Directions.left || direction === Directions.right) {
                    this.c.textAlign = "center";
                    this.c.beginPath();
                    this.c.moveTo(pt, 0);
                    this.c.lineTo(pt, height);
                    this.c.stroke();
                }
                // add label
                if (label !== 0 && index % 5 === 0 && index < 1000) {
                    var bg = new Array(label.toString().length + 2).join("█");
                    if (direction === Directions.down || direction === Directions.up) {
                        this.c.fillStyle = "lightblue";
                        this.c.fillText(bg, x - 2, pt + 5);
                        this.c.fillStyle = "black";
                        this.c.fillText(label.toString(), x - 6, pt + 3);
                    }
                    else if (direction === Directions.left || direction === Directions.right) {
                        this.c.fillStyle = "lightblue";
                        this.c.fillText("█", pt, y + 11);
                        this.c.fillStyle = "black";
                        this.c.fillText(label.toString(), pt, y + 11);
                    }
                }
                if (index % 5 === 0)
                    label += (direction === Directions.right || direction === Directions.up) ? gridSpacing : -gridSpacing;
                // we are dividing here instead of at the gridSpacing variable so
                // that the labels are more round numbers
                if (direction === Directions.down)
                    pt += (gridSpacing / 5) * zoom;
                else if (direction === Directions.up)
                    pt -= (gridSpacing / 5) * zoom;
                else if (direction === Directions.left)
                    pt -= (gridSpacing / 5) * zoom;
                else if (direction === Directions.right)
                    pt += (gridSpacing / 5) * zoom;
                else
                    throw new Error('Invalid direction specified, this will cause an infinite loop');
                condition = setCondition(pt);
                index++;
            }
        };
        Graph.prototype.calculateBreakpoint = function () {
            var _a = this, maxGridCells = _a.maxGridCells, _b = _a.canvas, width = _b.width, height = _b.height, zoom = _a.orientation.zoom;
            var size = Math.max(width, height) / zoom;
            var gridSpacing = 0.025;
            var breakpoints = [
                0.05,
                0.1,
                0.25,
                0.5,
                1,
                2,
                5,
                10,
                25,
                50,
                100,
                250,
                500,
                1000,
                2500,
                10000,
                25000,
                50000,
                100000
            ];
            var i = 0;
            while (breakpoints[i] &&
                breakpoints[i] < size / (maxGridCells + 1)) {
                gridSpacing = breakpoints[i];
                i++;
            }
            this.gridSpacing = gridSpacing;
        };
        Graph.prototype.plot = function () {
            this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.calculateSigFigs();
            this.setData();
            this.plotAxes();
            this.plotGrid();
            this.plotData();
        };
        return Graph;
    }());
    var graph = new Graph();
    graph.plot();
})();
